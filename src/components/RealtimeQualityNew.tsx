import React, { useState, useEffect } from 'react';
import {
  Rocket20Regular,
  Info16Regular
} from '@fluentui/react-icons';
import { MonitoringRule, Action, migrateQualityCriteria, migrateComplianceRule } from '../types';
import { MonitoringSetup } from './sections/MonitoringSetup';
import { ResponseConfiguration } from './sections/ResponseConfiguration';
import { TargetingConditions } from './sections/TargetingConditions';
import { MonitoringInsights } from './sections/MonitoringInsights';
import { QuickStartWizard } from './wizard/QuickStartWizard';
import './RealtimeQuality.css';

// Legacy types for migration
interface LegacyAnswer {
  text: string;
  score: number;
}

interface LegacyCondition {
  lhs: string;
  operator: string;
  rhs: string;
}

interface LegacyNotificationThreshold {
  lowerScore: number;
  higherScore: number;
  notifyWho: string;
}

interface LegacyQualityCriteria {
  id: string;
  name: string;
  question: string;
  answers: LegacyAnswer[];
  enabled: boolean;
  outOfBox?: boolean;
  condition: LegacyCondition;
  notifications: {
    critical: LegacyNotificationThreshold;
    warning: LegacyNotificationThreshold;
    normal: LegacyNotificationThreshold;
  };
}

interface LegacyComplianceRule {
  name: string;
  description: string;
  enabled: boolean;
  conditions: string;
}

type SectionType = 'monitoring' | 'actions' | 'targeting' | 'insights';

export const RealtimeQuality: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('monitoring');
  const [showWizard, setShowWizard] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [wizardInitialStep, setWizardInitialStep] = useState(1);

  // New data structures
  const [rules, setRules] = useState<MonitoringRule[]>([]);
  const [actions, setActions] = useState<Action[]>([]);

  // Initialize with migrated data
  useEffect(() => {
    const legacyQuality: LegacyQualityCriteria[] = [
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
    ];

    const legacyCompliance: LegacyComplianceRule[] = [
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
      }
    ];

    // Migrate data
    const migratedRules: MonitoringRule[] = [];
    const migratedActions: Action[] = [];

    legacyQuality.forEach(legacy => {
      const { rule, actions: ruleActions } = migrateQualityCriteria(legacy);
      migratedRules.push(rule);
      migratedActions.push(...ruleActions);
    });

    legacyCompliance.forEach((legacy, idx) => {
      const rule = migrateComplianceRule(legacy, idx);
      migratedRules.push(rule);
    });

    setRules(migratedRules);
    setActions(migratedActions);
  }, []);

  // Rule operations
  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleEditRule = (id: string, fromSection?: SectionType) => {
    setEditingRuleId(id);

    // Set initial step based on which section the edit was triggered from
    if (fromSection === 'targeting') {
      setWizardInitialStep(4); // Jump to conditions step
    } else if (fromSection === 'monitoring') {
      setWizardInitialStep(2); // Jump to configure monitoring step
    } else {
      setWizardInitialStep(1); // Default to first step
    }

    setShowWizard(true);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    // Also remove this rule from action linkedRuleIds
    setActions(actions.map(a => ({
      ...a,
      linkedRuleIds: a.linkedRuleIds.filter(rId => rId !== id)
    })));
  };

  const handleAddNewRule = () => {
    setEditingRuleId(null);
    setWizardInitialStep(1); // Start from beginning for new rules
    setShowWizard(true);
  };

  // Action operations
  const handleToggleAction = (id: string) => {
    setActions(actions.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const handleEditAction = (id: string) => {
    // Find the action
    const action = actions.find(a => a.id === id);
    if (!action) return;

    // Find the first rule linked to this action
    const linkedRuleId = action.linkedRuleIds[0];
    if (!linkedRuleId) return;

    setEditingRuleId(linkedRuleId);
    setWizardInitialStep(3); // Jump to actions step
    setShowWizard(true);
  };

  const handleDeleteAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
    // Also remove this action from rule actionIds
    setRules(rules.map(r => ({
      ...r,
      actionIds: r.actionIds.filter(aId => aId !== id)
    })));
  };

  const handleAddNewAction = () => {
    // TODO: Implement action creation
    console.log('Add new action');
  };

  // Targeting operations
  const handleEditConditions = (id: string) => {
    setEditingRuleId(id);
    setWizardInitialStep(4); // Jump to conditions step
    setShowWizard(true);
  };

  // Wizard completion
  const handleWizardComplete = (rule: MonitoringRule, newActions: Action[]) => {
    if (editingRuleId) {
      // Update existing rule
      setRules(rules.map(r => r.id === editingRuleId ? rule : r));

      // Update or add actions
      const updatedActions = [...actions];
      newActions.forEach(newAction => {
        const existingIndex = updatedActions.findIndex(a => a.id === newAction.id);
        if (existingIndex >= 0) {
          updatedActions[existingIndex] = newAction;
        } else {
          updatedActions.push(newAction);
        }
      });

      // Remove actions that were part of the old rule but not in the new one
      const newActionIds = newActions.map(a => a.id);
      const oldRule = rules.find(r => r.id === editingRuleId);
      if (oldRule) {
        const removedActionIds = oldRule.actionIds.filter(id => !newActionIds.includes(id));
        removedActionIds.forEach(actionId => {
          const actionIndex = updatedActions.findIndex(a => a.id === actionId);
          if (actionIndex >= 0) {
            // Remove the rule from the action's linkedRuleIds
            updatedActions[actionIndex] = {
              ...updatedActions[actionIndex],
              linkedRuleIds: updatedActions[actionIndex].linkedRuleIds.filter(rid => rid !== editingRuleId)
            };

            // If action is no longer linked to any rules, remove it
            if (updatedActions[actionIndex].linkedRuleIds.length === 0) {
              updatedActions.splice(actionIndex, 1);
            }
          }
        });
      }

      setActions(updatedActions);
    } else {
      // Create new rule
      setRules([...rules, rule]);
      setActions([...actions, ...newActions]);
    }

    setShowWizard(false);
    setEditingRuleId(null);
    setWizardInitialStep(1);
    setActiveSection('monitoring');
  };

  const handleWizardClose = () => {
    setShowWizard(false);
    setEditingRuleId(null);
    setWizardInitialStep(1);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'monitoring':
        return (
          <MonitoringSetup
            rules={rules}
            onToggleRule={handleToggleRule}
            onEditRule={(id) => handleEditRule(id, 'monitoring')}
            onDeleteRule={handleDeleteRule}
            onAddNew={handleAddNewRule}
          />
        );
      case 'actions':
        return (
          <ResponseConfiguration
            actions={actions}
            onToggleAction={handleToggleAction}
            onEditAction={handleEditAction}
            onDeleteAction={handleDeleteAction}
            onAddNew={handleAddNewAction}
          />
        );
      case 'targeting':
        return (
          <TargetingConditions
            rules={rules}
            onEditConditions={handleEditConditions}
          />
        );
      case 'insights':
        return (
          <MonitoringInsights
            rulesCount={rules.filter(r => r.enabled).length}
            actionsCount={actions.filter(a => a.enabled).length}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CommandBar onQuickStart={() => setShowWizard(true)} />

      <div className="page-content">
        <Breadcrumb />

        <div className="page-header">
          <div className="page-title-row">
            <h1 className="page-title">Real-time Coaching</h1>
          </div>

          <InfoBanner />
        </div>

        <SectionNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="section-container">
          {renderSectionContent()}
        </div>
      </div>

      {showWizard && (
        <QuickStartWizard
          onClose={handleWizardClose}
          onComplete={handleWizardComplete}
          editMode={!!editingRuleId}
          existingRule={editingRuleId ? rules.find(r => r.id === editingRuleId) : undefined}
          existingActions={editingRuleId ? actions.filter(a => a.linkedRuleIds.includes(editingRuleId)) : []}
          initialStep={wizardInitialStep}
        />
      )}
    </>
  );
};

interface CommandBarProps {
  onQuickStart: () => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ onQuickStart }) => (
  <div className="command-bar">
    <div className="command-bar-left">
      <button className="command-button">Refresh</button>
      <button className="command-button">Export</button>
      <button className="command-button">Import</button>
    </div>
    <div className="command-bar-right">
      <button className="command-button primary" onClick={onQuickStart}>
        <Rocket20Regular />
        Quick Start
      </button>
    </div>
  </div>
);

const Breadcrumb: React.FC = () => (
  <div className="breadcrumb">
    <a href="#" className="breadcrumb-link">Real-time Coaching</a>
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

interface SectionNavigationProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  activeSection,
  onSectionChange
}) => (
  <div className="section-navigation">
    <button
      className={`section-nav-button ${activeSection === 'monitoring' ? 'active' : ''}`}
      onClick={() => onSectionChange('monitoring')}
    >
      Monitoring Setup
    </button>
    <button
      className={`section-nav-button ${activeSection === 'actions' ? 'active' : ''}`}
      onClick={() => onSectionChange('actions')}
    >
      Response Configuration
    </button>
    <button
      className={`section-nav-button ${activeSection === 'targeting' ? 'active' : ''}`}
      onClick={() => onSectionChange('targeting')}
    >
      Targeting & Conditions
    </button>
    <button
      className={`section-nav-button ${activeSection === 'insights' ? 'active' : ''}`}
      onClick={() => onSectionChange('insights')}
    >
      Monitoring & Insights
    </button>
  </div>
);

export default RealtimeQuality;
