import React, { useState } from 'react';
import {
  Navigation20Regular,
  Home20Regular,
  Search20Regular,
  Rocket20Regular,
  Headset20Regular,
  People20Regular,
  Bot20Regular,
  ChannelShare20Regular,
  DocumentQueue20Regular,
  Directions20Regular,
  Stream20Regular,
  Wrench20Regular,
  PersonSettings20Regular,
  Circle20Regular,
  Pulse20Regular,
  PersonSupport20Regular,
  TabDesktopMultiple20Regular,
  TargetEdit20Regular,
  Lightbulb20Regular,
  Molecule20Regular,
  ArrowClockwiseDashes20Regular,
  LightbulbFilament20Regular,
  Calendar20Regular,
  Settings20Regular,
  Add20Regular,
  GridDots20Regular,
  QuestionCircle20Regular,
  ChatMultiple20Regular,
  Emoji20Regular,
  Info16Regular,
  Delete20Regular
} from '@fluentui/react-icons';
import './RealtimeQuality.css';

// Types
interface Answer {
  text: string;
  score: number;
}

interface Condition {
  lhs: string;
  operator: string;
  rhs: string;
}

interface NotificationThreshold {
  lowerScore: number;
  higherScore: number;
  notifyWho: string;
}

interface QualityCriteria {
  id: string;
  name: string;
  question: string;
  answers: Answer[];
  enabled: boolean;
  outOfBox?: boolean;
  condition: Condition;
  notifications: {
    critical: NotificationThreshold;
    warning: NotificationThreshold;
    normal: NotificationThreshold;
  };
}

interface ComplianceRule {
  name: string;
  description: string;
  enabled: boolean;
  conditions: string;
}

// Main Component
export const RealtimeQuality: React.FC = () => {
  const [activeTab, setActiveTab] = useState('conversation-quality');
  const [editingCriteriaId, setEditingCriteriaId] = useState<string | null>(null);
  const [editingCriteria, setEditingCriteria] = useState<QualityCriteria | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [qualityCriteria, setQualityCriteria] = useState<QualityCriteria[]>([
    {
      id: 'empathy',
      name: 'Empathy',
      question: 'Did the representative display empathy while responding to the customer\'s problem?',
      enabled: true,
      outOfBox: true,
      answers: [
        { text: 'Definitely empathetic', score: 100 },
        { text: 'Slightly empathetic', score: 50 },
        { text: 'Not empathetic', score: 0 }
      ],
      condition: {
        lhs: 'Workstream',
        operator: 'equals',
        rhs: 'VIP chat'
      },
      notifications: {
        critical: { lowerScore: 0, higherScore: 50, notifyWho: 'VIP queue' },
        warning: { lowerScore: 51, higherScore: 75, notifyWho: 'Team lead' },
        normal: { lowerScore: 76, higherScore: 100, notifyWho: '' }
      }
    },
    {
      id: 'acknowledgement',
      name: 'Acknowledgement',
      question: 'Did the representative acknowledge the customer\'s concern appropriately?',
      enabled: true,
      outOfBox: false,
      answers: [
        { text: 'Fully acknowledged', score: 100 },
        { text: 'Partially acknowledged', score: 60 },
        { text: 'Briefly acknowledged', score: 30 },
        { text: 'Not acknowledged', score: 0 }
      ],
      condition: {
        lhs: 'Queue',
        operator: 'equals',
        rhs: 'Support'
      },
      notifications: {
        critical: { lowerScore: 0, higherScore: 30, notifyWho: 'Supervisor' },
        warning: { lowerScore: 31, higherScore: 60, notifyWho: 'Team lead' },
        normal: { lowerScore: 61, higherScore: 100, notifyWho: '' }
      }
    }
  ]);

  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([
    {
      name: 'Competitor check',
      description: 'Monitors conversations for competitor mentions and ensures appropriate handling',
      enabled: true,
      conditions: 'Workstream, Queue, LOB'
    },
    {
      name: 'Financial advice',
      description: 'Ensures compliance with financial regulations when providing advice or recommendations',
      enabled: true,
      conditions: 'Workstream, Queue, LOB'
    },
    {
      name: 'Harmful content',
      description: 'Detects and prevents distribution of harmful or inappropriate content',
      enabled: true,
      conditions: 'Workstream, Queue, LOB'
    },
    {
      name: 'Language check',
      description: 'Validates appropriate language use and tone in customer communications',
      enabled: true,
      conditions: 'Workstream, Queue, LOB'
    }
  ]);

  const toggleCriteria = (id: string) => {
    setQualityCriteria(criteria =>
      criteria.map(c =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  const addNewCriteria = () => {
    const newId = `criteria-${Date.now()}`;
    const newCriteria: QualityCriteria = {
      id: newId,
      name: 'New Criteria',
      question: 'Enter your question here',
      enabled: true,
      outOfBox: false,
      answers: [
        { text: 'Answer 1', score: 100 },
        { text: 'Answer 2', score: 50 },
        { text: 'Answer 3', score: 0 }
      ],
      condition: {
        lhs: 'Workstream',
        operator: 'equals',
        rhs: 'VIP chat'
      },
      notifications: {
        critical: { lowerScore: 0, higherScore: 30, notifyWho: '' },
        warning: { lowerScore: 31, higherScore: 70, notifyWho: '' },
        normal: { lowerScore: 71, higherScore: 100, notifyWho: '' }
      }
    };
    setEditingCriteria(newCriteria);
    setEditingCriteriaId(newId);
    setIsCreatingNew(true);
  };

  const deleteCriteria = (id: string) => {
    setQualityCriteria(criteria => criteria.filter(c => c.id !== id));
  };

  const openEditPanel = (id: string) => {
    const criteria = qualityCriteria.find(c => c.id === id);
    if (criteria) {
      setEditingCriteriaId(id);
      setEditingCriteria(JSON.parse(JSON.stringify(criteria))); // Deep clone
      setIsCreatingNew(false);
    }
  };

  const closeEditPanel = () => {
    setEditingCriteriaId(null);
    setEditingCriteria(null);
    setIsCreatingNew(false);
  };

  const saveEditedCriteria = () => {
    if (editingCriteria) {
      if (isCreatingNew) {
        // Add new criteria to the list
        setQualityCriteria([...qualityCriteria, editingCriteria]);
      } else if (editingCriteriaId) {
        // Update existing criteria
        setQualityCriteria(criteria =>
          criteria.map(c =>
            c.id === editingCriteriaId ? editingCriteria : c
          )
        );
      }
      closeEditPanel();
    }
  };

  const updateEditingCriteria = (updates: Partial<QualityCriteria>) => {
    if (editingCriteria) {
      setEditingCriteria({ ...editingCriteria, ...updates });
    }
  };

  const updateEditingAnswer = (answerIndex: number, field: 'text' | 'score', value: string | number) => {
    if (editingCriteria) {
      const newAnswers = [...editingCriteria.answers];
      newAnswers[answerIndex] = {
        ...newAnswers[answerIndex],
        [field]: value
      };
      setEditingCriteria({ ...editingCriteria, answers: newAnswers });
    }
  };

  const addEditingAnswer = () => {
    if (editingCriteria) {
      setEditingCriteria({
        ...editingCriteria,
        answers: [...editingCriteria.answers, { text: 'New answer', score: 0 }]
      });
    }
  };

  const removeEditingAnswer = (answerIndex: number) => {
    if (editingCriteria && editingCriteria.answers.length > 1) {
      const newAnswers = editingCriteria.answers.filter((_, idx) => idx !== answerIndex);
      setEditingCriteria({ ...editingCriteria, answers: newAnswers });
    }
  };

  const updateEditingCondition = (field: keyof Condition, value: string) => {
    if (editingCriteria) {
      setEditingCriteria({
        ...editingCriteria,
        condition: { ...editingCriteria.condition, [field]: value }
      });
    }
  };

  const updateEditingNotification = (level: 'critical' | 'warning' | 'normal', field: keyof NotificationThreshold, value: string | number) => {
    if (editingCriteria) {
      setEditingCriteria({
        ...editingCriteria,
        notifications: {
          ...editingCriteria.notifications,
          [level]: {
            ...editingCriteria.notifications[level],
            [field]: value
          }
        }
      });
    }
  };

  const toggleComplianceRule = (index: number) => {
    setComplianceRules(rules =>
      rules.map((rule, i) =>
        i === index ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="realtime-quality">
      <SuiteHeader />

      <div className="main-container">
        <SideNavigation />

        <div className="content-area">
          <CommandBar />

          <div className="page-content">
            <Breadcrumb />

            <div className="page-header">
              <div className="page-title-row">
                <h1 className="page-title">Realtime conversation quality</h1>
                <span className="tag">AI Copilot</span>
              </div>

              <InfoBanner />
            </div>

            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

            <section className="quality-evaluation-section">
              <div className="section-header-with-action">
                <div>
                  <h2 className="section-title">Quality evaluation</h2>
                  <p className="section-description">
                    Manage the criteria for quality evaluation against which conversations will be evaluated, and their corresponding conditions
                  </p>
                </div>
                <button className="add-criteria-button" onClick={addNewCriteria}>
                  <Add20Regular />
                  Add new criteria
                </button>
              </div>

              {qualityCriteria.map((criteria, index) => (
                <CriteriaCard
                  key={criteria.id}
                  criteria={criteria}
                  index={index}
                  onToggle={() => toggleCriteria(criteria.id)}
                  onEdit={() => openEditPanel(criteria.id)}
                  onDelete={() => deleteCriteria(criteria.id)}
                />
              ))}
            </section>

            <section className="compliance-section">
              <h2 className="section-title">Compliance and guardrails</h2>
              <p className="section-description">
                Manage the compliance checks and guardrails for your organization, against which conversations will be evaluated in real-time
              </p>

              <ComplianceTable
                rules={complianceRules}
                onToggleRule={toggleComplianceRule}
              />
            </section>
          </div>
        </div>
      </div>

      {editingCriteria && (
        <EditCriteriaPanel
          criteria={editingCriteria}
          onClose={closeEditPanel}
          onSave={saveEditedCriteria}
          onUpdateName={(name) => updateEditingCriteria({ name })}
          onUpdateQuestion={(question) => updateEditingCriteria({ question })}
          onUpdateAnswer={updateEditingAnswer}
          onAddAnswer={addEditingAnswer}
          onRemoveAnswer={removeEditingAnswer}
          onUpdateCondition={updateEditingCondition}
          onUpdateNotification={updateEditingNotification}
        />
      )}
    </div>
  );
};

// Sub-components
const SuiteHeader: React.FC = () => (
  <div className="suite-header">
    <div className="suite-header-left">
      <button className="menu-button" aria-label="Menu">
        <GridDots20Regular />
      </button>
      <div className="app-title">
        <span className="app-name">Dynamics 365</span>
        <span className="divider">|</span>
        <span className="app-subtitle">Customer Service admin center</span>
      </div>
    </div>

    <div className="suite-header-right">
      <button className="icon-button" aria-label="Notifications">
        <Circle20Regular />
      </button>
      <button className="icon-button" aria-label="Add">
        <Add20Regular />
      </button>
      <button className="icon-button" aria-label="Settings">
        <Settings20Regular />
      </button>
      <button className="icon-button" aria-label="Help">
        <QuestionCircle20Regular />
      </button>
      <button className="icon-button" aria-label="Messages">
        <ChatMultiple20Regular />
      </button>
      <button className="icon-button" aria-label="Emoji">
        <Emoji20Regular />
      </button>
      <button className="avatar-button">
        <div className="avatar" />
      </button>
    </div>
  </div>
);

const SideNavigation: React.FC = () => {
  const getIcon = (item: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Home': <Home20Regular />,
      'Search admin settings': <Search20Regular />,
      'Guided channel setups': <Rocket20Regular />,
      'Overview': <Headset20Regular />,
      'User management': <People20Regular />,
      'Bots': <Bot20Regular />,
      'Channels': <ChannelShare20Regular />,
      'Queues': <DocumentQueue20Regular />,
      'Routing': <Directions20Regular />,
      'Workstreams': <Stream20Regular />,
      'Case settings': <Wrench20Regular />,
      'Customer settings': <PersonSettings20Regular />,
      'Quality management': <Circle20Regular />,
      'Conversation quality': <Pulse20Regular />,
      'Workspaces': <TabDesktopMultiple20Regular />,
      'Productivity': <TargetEdit20Regular />,
      'Knowledge': <Lightbulb20Regular />,
      'Collaboration': <Molecule20Regular />,
      'Insights': <LightbulbFilament20Regular />,
      'Calendar': <Calendar20Regular />,
      'Service scheduling': <Circle20Regular />,
      'Miscellaneous': <Settings20Regular />
    };
    return iconMap[item] || <Circle20Regular />;
  };

  const menuItems = [
    { section: 'Get started', items: ['Home', 'Search admin settings', 'Guided channel setups'] },
    { section: 'Customer Support', items: ['Overview', 'User management', 'Bots', 'Channels', 'Queues', 'Routing', 'Workstreams', 'Case settings', 'Customer settings', 'Quality management', 'Conversation quality'] },
    { section: 'Agent experience', items: ['Overview', 'Workspaces', 'Productivity', 'Knowledge', 'Collaboration'] },
    { section: 'Operations', items: ['Overview', 'Insights', 'Calendar', 'Service scheduling', 'Miscellaneous'] }
  ];

  return (
    <nav className="side-nav">
      <button className="nav-hamburger">
        <Navigation20Regular />
      </button>
      {menuItems.map((group, idx) => (
        <div key={idx} className="nav-group">
          <div className="nav-section-header">{group.section}</div>
          {group.items.map((item) => (
            <div
              key={item}
              className={`nav-item ${item === 'Conversation quality' ? 'active' : ''}`}
            >
              <span className="nav-icon">{getIcon(item)}</span>
              <span className="nav-label">{item}</span>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

const CommandBar: React.FC = () => (
  <div className="command-bar">
    <button className="command-button">Refresh</button>
    <button className="command-button">Export</button>
    <button className="command-button">Import</button>
  </div>
);

const Breadcrumb: React.FC = () => (
  <div className="breadcrumb">
    <a href="#" className="breadcrumb-link">Realtime conversation quality</a>
  </div>
);

const InfoBanner: React.FC = () => (
  <div className="info-banner">
    <Info16Regular className="info-icon" />
    <div className="info-text">
      <p>
        This feature is currently supported in a limited number of languages. See the{' '}
        <a href="#" className="link">full list of supported languages</a>. Copilot responses in
        unsupported languages have not been tested for language accuracy. Make sure AI-generated
        content is accurate and appropriate before using it. <a href="#" className="link">Read terms</a>.
      </p>
    </div>
  </div>
);

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => (
  <div className="tabs">
    <button
      className={`tab ${activeTab === 'conversation-quality' ? 'active' : ''}`}
      onClick={() => onTabChange('conversation-quality')}
    >
      Conversation Quality
    </button>
    <button
      className={`tab ${activeTab === 'adherence' ? 'active' : ''}`}
      onClick={() => onTabChange('adherence')}
    >
      Adherence
    </button>
    <button
      className={`tab ${activeTab === 'predicted-csat' ? 'active' : ''}`}
      onClick={() => onTabChange('predicted-csat')}
    >
      Predicted CSAT
    </button>
  </div>
);

interface CriteriaCardProps {
  criteria: QualityCriteria;
  index: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CriteriaCard: React.FC<CriteriaCardProps> = ({
  criteria,
  index,
  onToggle,
  onEdit,
  onDelete
}) => {
  const getCriticalNotificationInfo = () => {
    const critical = criteria.notifications.critical;
    const warning = criteria.notifications.warning;
    const normal = criteria.notifications.normal;

    const parts = [];
    if (critical.notifyWho) {
      parts.push(`Critical (${critical.lowerScore}-${critical.higherScore}): ${critical.notifyWho}`);
    }
    if (warning.notifyWho) {
      parts.push(`Warning (${warning.lowerScore}-${warning.higherScore}): ${warning.notifyWho}`);
    }
    if (normal.notifyWho) {
      parts.push(`Normal (${normal.lowerScore}-${normal.higherScore}): ${normal.notifyWho}`);
    }

    return parts.length > 0 ? parts.join(' | ') : 'No notifications configured';
  };

  return (
    <div className="quality-card">
      <div className="card-header">
        <div className="card-header-content">
          <div className="criteria-title-row">
            <h3>Criteria {index + 1}: {criteria.name}</h3>
            {criteria.outOfBox && <span className="out-of-box-tag">Out-of-box</span>}
          </div>
        </div>
        <div className="card-header-actions">
          <button className="delete-button" onClick={onDelete} aria-label="Delete criteria">
            <Delete20Regular />
          </button>
          <button className="edit-button" onClick={onEdit}>
            Edit
          </button>
          <ToggleSwitch checked={criteria.enabled} onChange={onToggle} />
        </div>
      </div>

      <div className="card-body">
        <div className="question-section">
          <h4 className="question-label">Question</h4>
          <p className="question-text">{criteria.question}</p>
        </div>

        <div className="card-body-grid">
          <div className="answers-section">
            <div className="answers-header">
              <h4 className="section-label">Answers</h4>
            </div>

            <div className="answers-list">
              {criteria.answers.map((answer, idx) => (
                <div key={idx} className="answer-row">
                  <span className="answer-text">{answer.text}</span>
                  <span className="answer-score">Score: {answer.score}/100</span>
                </div>
              ))}
            </div>
          </div>

          <div className="criteria-details-section">
            <div className="detail-item">
              <h4 className="section-label">Condition</h4>
              <p className="detail-text">
                {criteria.condition.lhs} {criteria.condition.operator} {criteria.condition.rhs}
              </p>
            </div>

            <div className="detail-item">
              <h4 className="section-label">Notifications</h4>
              <p className="detail-text">{getCriticalNotificationInfo()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EditCriteriaPanelProps {
  criteria: QualityCriteria;
  onClose: () => void;
  onSave: () => void;
  onUpdateName: (name: string) => void;
  onUpdateQuestion: (question: string) => void;
  onUpdateAnswer: (answerIndex: number, field: 'text' | 'score', value: string | number) => void;
  onAddAnswer: () => void;
  onRemoveAnswer: (answerIndex: number) => void;
  onUpdateCondition: (field: keyof Condition, value: string) => void;
  onUpdateNotification: (level: 'critical' | 'warning' | 'normal', field: keyof NotificationThreshold, value: string | number) => void;
}

const EditCriteriaPanel: React.FC<EditCriteriaPanelProps> = ({
  criteria,
  onClose,
  onSave,
  onUpdateName,
  onUpdateQuestion,
  onUpdateAnswer,
  onAddAnswer,
  onRemoveAnswer,
  onUpdateCondition,
  onUpdateNotification
}) => {
  const lhsOptions = ['Workstream', 'Queue', 'LOB', 'Channel'];
  const operatorOptions = ['equals', 'not equals', 'contains', 'does not contain'];
  const rhsOptions = ['VIP chat', 'Support', 'Sales', 'Premium'];

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />
      <div className="edit-panel">
        <div className="panel-header">
          <h2 className="panel-title">Edit Criteria: {criteria.name}</h2>
          <button className="panel-close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel-content">
          {/* Criteria Name Section */}
          <div className="panel-section">
            <h3 className="panel-section-title">Criteria Name</h3>
            <input
              type="text"
              className="panel-text-input"
              value={criteria.name}
              onChange={(e) => onUpdateName(e.target.value)}
            />
          </div>

          {/* Question Section */}
          <div className="panel-section">
            <h3 className="panel-section-title">Question</h3>
            <textarea
              className="panel-question-input"
              value={criteria.question}
              onChange={(e) => onUpdateQuestion(e.target.value)}
              rows={3}
            />
          </div>

          {/* Answers Section */}
          <div className="panel-section">
            <div className="panel-section-header">
              <h3 className="panel-section-title">Answers</h3>
              <button className="panel-add-button" onClick={onAddAnswer}>
                + Add answer
              </button>
            </div>
            <div className="panel-answers-list">
              {criteria.answers.map((answer, idx) => (
                <div key={idx} className="panel-answer-row">
                  <div className="panel-answer-content">
                    <label className="panel-label">Answer text</label>
                    <input
                      type="text"
                      className="panel-text-input"
                      value={answer.text}
                      onChange={(e) => onUpdateAnswer(idx, 'text', e.target.value)}
                    />
                  </div>
                  <div className="panel-score-content">
                    <label className="panel-label">Score</label>
                    <div className="panel-score-group">
                      <input
                        type="number"
                        className="panel-score-input"
                        value={answer.score}
                        min="0"
                        max="100"
                        onChange={(e) => onUpdateAnswer(idx, 'score', parseInt(e.target.value) || 0)}
                      />
                      <span className="panel-score-suffix">/100</span>
                    </div>
                  </div>
                  {criteria.answers.length > 1 && (
                    <button
                      className="panel-remove-button"
                      onClick={() => onRemoveAnswer(idx)}
                      aria-label="Remove answer"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conditions Section */}
          <div className="panel-section">
            <h3 className="panel-section-title">Conditions</h3>
            <p className="panel-section-description">Define when this criteria should apply</p>
            <div className="condition-builder">
              <select
                className="condition-select"
                value={criteria.condition.lhs}
                onChange={(e) => onUpdateCondition('lhs', e.target.value)}
              >
                {lhsOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                className="condition-select"
                value={criteria.condition.operator}
                onChange={(e) => onUpdateCondition('operator', e.target.value)}
              >
                {operatorOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                className="condition-select"
                value={criteria.condition.rhs}
                onChange={(e) => onUpdateCondition('rhs', e.target.value)}
              >
                {rhsOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="panel-section">
            <h3 className="panel-section-title">Notifications</h3>
            <p className="panel-section-description">Define notification thresholds and recipients</p>

            {/* Critical */}
            <div className="notification-level">
              <h4 className="notification-level-title critical">Critical</h4>
              <div className="notification-fields">
                <div className="notification-field">
                  <label className="panel-label">Lower score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.critical.lowerScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('critical', 'lowerScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Higher score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.critical.higherScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('critical', 'higherScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Notify who</label>
                  <input
                    type="text"
                    className="panel-text-input"
                    value={criteria.notifications.critical.notifyWho}
                    onChange={(e) => onUpdateNotification('critical', 'notifyWho', e.target.value)}
                    placeholder="e.g., VIP queue"
                  />
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="notification-level">
              <h4 className="notification-level-title warning">Warning</h4>
              <div className="notification-fields">
                <div className="notification-field">
                  <label className="panel-label">Lower score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.warning.lowerScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('warning', 'lowerScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Higher score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.warning.higherScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('warning', 'higherScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Notify who</label>
                  <input
                    type="text"
                    className="panel-text-input"
                    value={criteria.notifications.warning.notifyWho}
                    onChange={(e) => onUpdateNotification('warning', 'notifyWho', e.target.value)}
                    placeholder="e.g., Team lead"
                  />
                </div>
              </div>
            </div>

            {/* Normal */}
            <div className="notification-level">
              <h4 className="notification-level-title normal">Normal</h4>
              <div className="notification-fields">
                <div className="notification-field">
                  <label className="panel-label">Lower score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.normal.lowerScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('normal', 'lowerScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Higher score</label>
                  <input
                    type="number"
                    className="panel-number-input"
                    value={criteria.notifications.normal.higherScore}
                    min="0"
                    max="100"
                    onChange={(e) => onUpdateNotification('normal', 'higherScore', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="notification-field">
                  <label className="panel-label">Notify who</label>
                  <input
                    type="text"
                    className="panel-text-input"
                    value={criteria.notifications.normal.notifyWho}
                    onChange={(e) => onUpdateNotification('normal', 'notifyWho', e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-footer">
          <button className="panel-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="panel-button primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

interface ComplianceTableProps {
  rules: ComplianceRule[];
  onToggleRule: (index: number) => void;
}

const ComplianceTable: React.FC<ComplianceTableProps> = ({ rules, onToggleRule }) => (
  <div className="compliance-table-container">
    <div className="table-header">
      <h4 className="table-title">All compliance rules</h4>
      <button className="action-button">+ Add conditions</button>
    </div>

    <table className="compliance-table">
      <thead>
        <tr>
          <th>Compliance Name</th>
          <th>Compliance Description</th>
          <th>Status</th>
          <th>Conditions</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule, idx) => (
          <tr key={idx}>
            <td>
              <a href="#" className="link">{rule.name}</a>
            </td>
            <td>{rule.description}</td>
            <td>
              <ToggleSwitch checked={rule.enabled} onChange={() => onToggleRule(idx)} />
            </td>
            <td>
              <a href="#" className="link">{rule.conditions}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <button
    className={`toggle-switch ${checked ? 'checked' : ''}`}
    onClick={onChange}
    role="switch"
    aria-checked={checked}
  >
    <span className="toggle-thumb" />
  </button>
);

export default RealtimeQuality;
