import React, { useState } from 'react';
import { MonitoringRule, Action, Answer, Condition } from '../../types';
import './QuickStartWizard.css';

interface QuickStartWizardProps {
  onClose: () => void;
  onComplete: (rule: MonitoringRule, actions: Action[]) => void;
  editMode?: boolean;
  existingRule?: MonitoringRule;
  existingActions?: Action[];
  initialStep?: number;
}

type RuleType = 'quality' | 'compliance' | 'adherence' | null;

export const QuickStartWizard: React.FC<QuickStartWizardProps> = ({
  onClose,
  onComplete,
  editMode = false,
  existingRule,
  existingActions = [],
  initialStep = 1
}) => {
  const [step, setStep] = useState(initialStep);
  const [ruleType, setRuleType] = useState<RuleType>(editMode && existingRule ? existingRule.type : null);

  // Step 2: Configure monitoring
  const [ruleName, setRuleName] = useState(editMode && existingRule ? existingRule.name : '');
  const [question, setQuestion] = useState(editMode && existingRule?.monitoring.question ? existingRule.monitoring.question : '');
  const [answers, setAnswers] = useState<Answer[]>(
    editMode && existingRule?.monitoring.answers
      ? existingRule.monitoring.answers
      : [
          { text: 'Excellent', score: 100 },
          { text: 'Good', score: 75 },
          { text: 'Fair', score: 50 },
          { text: 'Poor', score: 0 }
        ]
  );
  const [guardrail, setGuardrail] = useState(editMode && existingRule?.monitoring.guardrail ? existingRule.monitoring.guardrail : '');
  const [guidanceDescription, setGuidanceDescription] = useState(editMode && existingRule?.monitoring.guidanceDescription ? existingRule.monitoring.guidanceDescription : '');

  // Step 3: Choose actions - determine from existing actions
  const getInitialActionStates = () => {
    if (!editMode || existingActions.length === 0) {
      return {
        enableCoaching: true,
        enableNotification: true,
        enableEscalation: false,
        notificationRecipient: 'Supervisor',
        thresholdLower: 0,
        thresholdHigher: 50
      };
    }

    const coaching = existingActions.find(a => a.type === 'coaching');
    const notification = existingActions.find(a => a.type === 'notification');
    const escalation = existingActions.find(a => a.type === 'escalation');

    return {
      enableCoaching: !!coaching,
      enableNotification: !!notification,
      enableEscalation: !!escalation,
      notificationRecipient: notification?.config.recipients?.[0] || 'Supervisor',
      thresholdLower: notification?.config.threshold?.lowerScore || 0,
      thresholdHigher: notification?.config.threshold?.higherScore || 50
    };
  };

  const initialStates = getInitialActionStates();
  const [enableCoaching, setEnableCoaching] = useState(initialStates.enableCoaching);
  const [enableNotification, setEnableNotification] = useState(initialStates.enableNotification);
  const [enableEscalation, setEnableEscalation] = useState(initialStates.enableEscalation);
  const [notificationRecipient, setNotificationRecipient] = useState(initialStates.notificationRecipient);
  const [thresholdLower, setThresholdLower] = useState(initialStates.thresholdLower);
  const [thresholdHigher, setThresholdHigher] = useState(initialStates.thresholdHigher);

  // Step 4: Set conditions
  const [conditions, setConditions] = useState<Condition[]>(
    editMode && existingRule?.conditions && existingRule.conditions.length > 0
      ? existingRule.conditions
      : [{ lhs: 'Workstream', operator: 'equals', rhs: 'VIP chat' }]
  );

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (!ruleType) return;

    const ruleId = editMode && existingRule ? existingRule.id : `rule-${Date.now()}`;
    const actions: Action[] = [];

    // Create or update monitoring rule
    const rule: MonitoringRule = {
      id: ruleId,
      name: ruleName || 'New Rule',
      type: ruleType,
      enabled: editMode && existingRule ? existingRule.enabled : true,
      outOfBox: editMode && existingRule ? existingRule.outOfBox : undefined,
      monitoring: {},
      actionIds: [],
      conditions: conditions
    };

    // Configure monitoring based on type
    if (ruleType === 'quality') {
      rule.monitoring.question = question;
      rule.monitoring.answers = answers;
    } else if (ruleType === 'compliance') {
      rule.monitoring.guardrail = guardrail;
    } else if (ruleType === 'adherence') {
      rule.monitoring.guidanceDescription = guidanceDescription;
      rule.monitoring.guidanceSource = 'MCS';
    }

    // Create or update actions
    if (enableCoaching) {
      const existingCoaching = editMode ? existingActions.find(a => a.type === 'coaching') : null;
      const coachingAction: Action = {
        id: existingCoaching?.id || `${ruleId}-coaching`,
        name: `${rule.name} - Coaching`,
        type: 'coaching',
        enabled: existingCoaching?.enabled ?? true,
        config: {
          message: existingCoaching?.config.message || 'Provide real-time guidance to the agent'
        },
        linkedRuleIds: [ruleId]
      };
      actions.push(coachingAction);
      rule.actionIds.push(coachingAction.id);
    }

    if (enableNotification) {
      const existingNotification = editMode ? existingActions.find(a => a.type === 'notification') : null;
      const notificationAction: Action = {
        id: existingNotification?.id || `${ruleId}-notification`,
        name: `${rule.name} - Notification`,
        type: 'notification',
        enabled: existingNotification?.enabled ?? true,
        config: {
          threshold: {
            lowerScore: thresholdLower,
            higherScore: thresholdHigher,
            severity: 'critical'
          },
          recipients: [notificationRecipient]
        },
        linkedRuleIds: [ruleId]
      };
      actions.push(notificationAction);
      rule.actionIds.push(notificationAction.id);
    }

    if (enableEscalation) {
      const existingEscalation = editMode ? existingActions.find(a => a.type === 'escalation') : null;
      const escalationAction: Action = {
        id: existingEscalation?.id || `${ruleId}-escalation`,
        name: `${rule.name} - Escalation`,
        type: 'escalation',
        enabled: existingEscalation?.enabled ?? true,
        config: {
          escalationPath: existingEscalation?.config.escalationPath || ['Team Lead', 'Manager']
        },
        linkedRuleIds: [ruleId]
      };
      actions.push(escalationAction);
      rule.actionIds.push(escalationAction.id);
    }

    onComplete(rule, actions);
  };

  const addCondition = () => {
    setConditions([...conditions, { lhs: 'Workstream', operator: 'equals', rhs: 'All' }]);
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const canProceed = () => {
    if (step === 1) return ruleType !== null;
    if (step === 2) {
      if (ruleType === 'quality') return ruleName && question;
      if (ruleType === 'compliance') return ruleName && guardrail;
      if (ruleType === 'adherence') return ruleName && guidanceDescription;
    }
    if (step === 3) return enableCoaching || enableNotification || enableEscalation;
    return true;
  };

  return (
    <>
      <div className="wizard-overlay" onClick={onClose} />
      <div className="wizard-modal">
        <div className="wizard-header">
          <h2 className="wizard-title">
            {editMode ? 'Edit Monitoring Rule' : 'Quick Start: Create Monitoring Rule'}
          </h2>
          <button className="wizard-close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="wizard-progress">
          <span className="wizard-step-info">Step {step} of 4</span>
          <div className="wizard-progress-bar">
            <div className="wizard-progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>

        <div className="wizard-content">
          {step === 1 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">
                {editMode ? 'Rule Type' : 'What do you want to monitor?'}
              </h3>

              <div
                className={`wizard-option ${ruleType === 'quality' ? 'selected' : ''} ${editMode ? 'disabled' : ''}`}
                onClick={() => !editMode && setRuleType('quality')}
              >
                <div className="wizard-option-radio">
                  <span className={`radio-circle ${ruleType === 'quality' ? 'selected' : ''}`} />
                </div>
                <div className="wizard-option-content">
                  <h4 className="wizard-option-title">Quality criteria</h4>
                  <p className="wizard-option-description">
                    Monitor conversation quality (empathy, safety, etc.)
                  </p>
                </div>
              </div>

              <div
                className={`wizard-option ${ruleType === 'compliance' ? 'selected' : ''} ${editMode ? 'disabled' : ''}`}
                onClick={() => !editMode && setRuleType('compliance')}
              >
                <div className="wizard-option-radio">
                  <span className={`radio-circle ${ruleType === 'compliance' ? 'selected' : ''}`} />
                </div>
                <div className="wizard-option-content">
                  <h4 className="wizard-option-title">Compliance guardrail</h4>
                  <p className="wizard-option-description">
                    Enforce policies (no financial advice, etc.)
                  </p>
                </div>
              </div>

              <div
                className={`wizard-option ${ruleType === 'adherence' ? 'selected' : ''} ${editMode ? 'disabled' : ''}`}
                onClick={() => !editMode && setRuleType('adherence')}
              >
                <div className="wizard-option-radio">
                  <span className={`radio-circle ${ruleType === 'adherence' ? 'selected' : ''}`} />
                </div>
                <div className="wizard-option-content">
                  <h4 className="wizard-option-title">Adherence guidance</h4>
                  <p className="wizard-option-description">
                    Provide step-by-step CSR assistance (from MCS)
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Configure your monitoring</h3>

              <div className="wizard-form-group">
                <label className="wizard-label">Rule Name</label>
                <input
                  type="text"
                  className="wizard-input"
                  placeholder="Enter rule name"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                />
              </div>

              {ruleType === 'quality' && (
                <>
                  <div className="wizard-form-group">
                    <label className="wizard-label">Question</label>
                    <textarea
                      className="wizard-textarea"
                      placeholder="Enter the question to evaluate"
                      rows={3}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  <div className="wizard-form-group">
                    <label className="wizard-label">Answer Options</label>
                    {answers.map((answer, idx) => (
                      <div key={idx} className="wizard-answer-row">
                        <input
                          type="text"
                          className="wizard-input"
                          value={answer.text}
                          onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[idx].text = e.target.value;
                            setAnswers(newAnswers);
                          }}
                        />
                        <input
                          type="number"
                          className="wizard-score-input"
                          min="0"
                          max="100"
                          value={answer.score}
                          onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[idx].score = parseInt(e.target.value) || 0;
                            setAnswers(newAnswers);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {ruleType === 'compliance' && (
                <div className="wizard-form-group">
                  <label className="wizard-label">Guardrail Description</label>
                  <textarea
                    className="wizard-textarea"
                    placeholder="Describe the compliance rule"
                    rows={4}
                    value={guardrail}
                    onChange={(e) => setGuardrail(e.target.value)}
                  />
                </div>
              )}

              {ruleType === 'adherence' && (
                <>
                  <div className="wizard-form-group">
                    <label className="wizard-label">Guidance Description</label>
                    <textarea
                      className="wizard-textarea"
                      placeholder="Describe the guidance to provide"
                      rows={4}
                      value={guidanceDescription}
                      onChange={(e) => setGuidanceDescription(e.target.value)}
                    />
                  </div>
                  <div className="wizard-mcs-badge">
                    <span>✓ Connected to MCS</span>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Choose actions</h3>

              <div className="wizard-checkbox-group">
                <label className="wizard-checkbox-label">
                  <input
                    type="checkbox"
                    className="wizard-checkbox"
                    checked={enableCoaching}
                    onChange={(e) => setEnableCoaching(e.target.checked)}
                  />
                  <div className="wizard-checkbox-content">
                    <h4 className="wizard-checkbox-title">Real-time coaching</h4>
                    <p className="wizard-checkbox-description">Nudge CSR during the conversation</p>
                  </div>
                </label>

                <label className="wizard-checkbox-label">
                  <input
                    type="checkbox"
                    className="wizard-checkbox"
                    checked={enableNotification}
                    onChange={(e) => setEnableNotification(e.target.checked)}
                  />
                  <div className="wizard-checkbox-content">
                    <h4 className="wizard-checkbox-title">Notify supervisor</h4>
                    <p className="wizard-checkbox-description">Alert when threshold is breached</p>
                  </div>
                </label>

                {enableNotification && (
                  <div className="wizard-nested-config">
                    <div className="wizard-form-group">
                      <label className="wizard-label">Threshold Range (0-100)</label>
                      <div className="wizard-threshold-inputs">
                        <input
                          type="number"
                          className="wizard-input"
                          min="0"
                          max="100"
                          value={thresholdLower}
                          onChange={(e) => setThresholdLower(parseInt(e.target.value) || 0)}
                        />
                        <span>to</span>
                        <input
                          type="number"
                          className="wizard-input"
                          min="0"
                          max="100"
                          value={thresholdHigher}
                          onChange={(e) => setThresholdHigher(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="wizard-form-group">
                      <label className="wizard-label">Notify Who</label>
                      <input
                        type="text"
                        className="wizard-input"
                        placeholder="e.g., Supervisor, Team Lead"
                        value={notificationRecipient}
                        onChange={(e) => setNotificationRecipient(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <label className="wizard-checkbox-label">
                  <input
                    type="checkbox"
                    className="wizard-checkbox"
                    checked={enableEscalation}
                    onChange={(e) => setEnableEscalation(e.target.checked)}
                  />
                  <div className="wizard-checkbox-content">
                    <h4 className="wizard-checkbox-title">Escalate to manager</h4>
                    <p className="wizard-checkbox-description">For critical issues</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Set conditions</h3>
              <p className="wizard-step-description">Define when this rule should apply</p>

              {conditions.map((condition, idx) => (
                <div key={idx} className="wizard-condition-row">
                  <select
                    className="wizard-select"
                    value={condition.lhs}
                    onChange={(e) => updateCondition(idx, 'lhs', e.target.value)}
                  >
                    <option value="Workstream">Workstream</option>
                    <option value="Queue">Queue</option>
                    <option value="LOB">LOB</option>
                    <option value="Channel">Channel</option>
                  </select>
                  <select
                    className="wizard-select"
                    value={condition.operator}
                    onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                  >
                    <option value="equals">equals</option>
                    <option value="not equals">not equals</option>
                    <option value="contains">contains</option>
                  </select>
                  <input
                    type="text"
                    className="wizard-input"
                    placeholder="Value"
                    value={condition.rhs}
                    onChange={(e) => updateCondition(idx, 'rhs', e.target.value)}
                  />
                  {conditions.length > 1 && (
                    <button
                      className="wizard-remove-button"
                      onClick={() => removeCondition(idx)}
                      aria-label="Remove condition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button className="wizard-add-condition-button" onClick={addCondition}>
                + Add Condition
              </button>

              <div className="wizard-review-section">
                <h4 className="wizard-review-title">Review & Create</h4>
                <div className="wizard-review-item">
                  <span className="wizard-review-label">Type:</span>
                  <span className="wizard-review-value">
                    {ruleType ? ruleType.charAt(0).toUpperCase() + ruleType.slice(1) : ''}
                  </span>
                </div>
                <div className="wizard-review-item">
                  <span className="wizard-review-label">Name:</span>
                  <span className="wizard-review-value">{ruleName || 'New Rule'}</span>
                </div>
                <div className="wizard-review-item">
                  <span className="wizard-review-label">Actions:</span>
                  <span className="wizard-review-value">
                    {[
                      enableCoaching && 'Coaching',
                      enableNotification && 'Notification',
                      enableEscalation && 'Escalation'
                    ].filter(Boolean).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="wizard-footer">
          <button className="wizard-button secondary" onClick={step === 1 ? onClose : handleBack}>
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 4 ? (
            <button
              className="wizard-button primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next Step →
            </button>
          ) : (
            <button
              className="wizard-button primary"
              onClick={handleComplete}
              disabled={!canProceed()}
            >
              {editMode ? 'Save Changes' : 'Create Rule'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
