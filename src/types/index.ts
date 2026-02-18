// Unified data model for the Jobs-to-be-Done UX redesign

export interface Answer {
  text: string;
  score: number;
}

export interface Condition {
  lhs: string;    // Workstream, Queue, LOB, Channel
  operator: string;
  rhs: string;
}

// Unified Rule Structure
export interface MonitoringRule {
  id: string;
  name: string;
  type: 'quality' | 'compliance' | 'adherence';
  enabled: boolean;
  outOfBox?: boolean;

  // Monitoring definition
  monitoring: {
    question?: string;        // For quality
    answers?: Answer[];       // For quality
    guardrail?: string;       // For compliance
    guidanceSource?: string;  // For adherence (placeholder: "Connected to MCS")
    guidanceDescription?: string; // Brief description
  };

  // Linked actions (references to Action IDs)
  actionIds: string[];

  // Conditions
  conditions: Condition[];
}

// Action Configuration
export interface Action {
  id: string;
  name: string;
  type: 'notification' | 'coaching' | 'escalation';
  enabled: boolean;

  // Action configuration
  config: {
    threshold?: {
      lowerScore: number;
      higherScore: number;
      severity: 'critical' | 'warning' | 'normal';
    };
    recipients?: string[];     // For notifications
    message?: string;          // For coaching
    escalationPath?: string[]; // For escalations
  };

  // Which rules use this action
  linkedRuleIds: string[];
}

// Legacy types for migration
export interface LegacyQualityCriteria {
  id: string;
  name: string;
  question: string;
  answers: Answer[];
  enabled: boolean;
  outOfBox?: boolean;
  condition: Condition;
  notifications: {
    critical: { lowerScore: number; higherScore: number; notifyWho: string };
    warning: { lowerScore: number; higherScore: number; notifyWho: string };
    normal: { lowerScore: number; higherScore: number; notifyWho: string };
  };
}

export interface LegacyComplianceRule {
  name: string;
  description: string;
  enabled: boolean;
  conditions: string;
}

// Migration utilities
export function migrateQualityCriteria(legacy: LegacyQualityCriteria): {
  rule: MonitoringRule;
  actions: Action[];
} {
  const ruleId = legacy.id;
  const actions: Action[] = [];

  // Create actions from notifications
  if (legacy.notifications.critical.notifyWho) {
    actions.push({
      id: `${ruleId}-critical`,
      name: `${legacy.name} - Critical Alert`,
      type: 'notification',
      enabled: true,
      config: {
        threshold: {
          lowerScore: legacy.notifications.critical.lowerScore,
          higherScore: legacy.notifications.critical.higherScore,
          severity: 'critical'
        },
        recipients: [legacy.notifications.critical.notifyWho]
      },
      linkedRuleIds: [ruleId]
    });
  }

  if (legacy.notifications.warning.notifyWho) {
    actions.push({
      id: `${ruleId}-warning`,
      name: `${legacy.name} - Warning Alert`,
      type: 'notification',
      enabled: true,
      config: {
        threshold: {
          lowerScore: legacy.notifications.warning.lowerScore,
          higherScore: legacy.notifications.warning.higherScore,
          severity: 'warning'
        },
        recipients: [legacy.notifications.warning.notifyWho]
      },
      linkedRuleIds: [ruleId]
    });
  }

  if (legacy.notifications.normal.notifyWho) {
    actions.push({
      id: `${ruleId}-normal`,
      name: `${legacy.name} - Normal Alert`,
      type: 'notification',
      enabled: true,
      config: {
        threshold: {
          lowerScore: legacy.notifications.normal.lowerScore,
          higherScore: legacy.notifications.normal.higherScore,
          severity: 'normal'
        },
        recipients: [legacy.notifications.normal.notifyWho]
      },
      linkedRuleIds: [ruleId]
    });
  }

  const rule: MonitoringRule = {
    id: ruleId,
    name: legacy.name,
    type: 'quality',
    enabled: legacy.enabled,
    outOfBox: legacy.outOfBox,
    monitoring: {
      question: legacy.question,
      answers: legacy.answers
    },
    actionIds: actions.map(a => a.id),
    conditions: [legacy.condition]
  };

  return { rule, actions };
}

export function migrateComplianceRule(legacy: LegacyComplianceRule, index: number): MonitoringRule {
  const ruleId = `compliance-${index}`;

  return {
    id: ruleId,
    name: legacy.name,
    type: 'compliance',
    enabled: legacy.enabled,
    monitoring: {
      guardrail: legacy.description
    },
    actionIds: [],
    conditions: []
  };
}
