import React from 'react';
import { Delete20Regular } from '@fluentui/react-icons';
import { MonitoringRule } from '../../types';
import './Shared.css';

interface RuleCardProps {
  rule: MonitoringRule;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule, onToggle, onEdit, onDelete }) => {
  const getTypeBadgeClass = () => {
    switch (rule.type) {
      case 'quality': return 'rule-type-badge quality';
      case 'compliance': return 'rule-type-badge compliance';
      case 'adherence': return 'rule-type-badge adherence';
      default: return 'rule-type-badge';
    }
  };

  const getDescription = () => {
    if (rule.type === 'quality' && rule.monitoring.question) {
      return rule.monitoring.question;
    }
    if (rule.type === 'compliance' && rule.monitoring.guardrail) {
      return rule.monitoring.guardrail;
    }
    if (rule.type === 'adherence' && rule.monitoring.guidanceDescription) {
      return rule.monitoring.guidanceDescription;
    }
    return '';
  };

  return (
    <div className="rule-card">
      <div className="rule-card-header">
        <div className="rule-card-header-content">
          <div className="rule-title-row">
            <h3 className="rule-title">{rule.name}</h3>
            {rule.outOfBox && <span className="out-of-box-tag">Out-of-box</span>}
          </div>
          <div className="rule-meta">
            <span className={getTypeBadgeClass()}>
              {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
            </span>
            <span className="rule-actions-count">
              {rule.actionIds.length} {rule.actionIds.length === 1 ? 'action' : 'actions'} linked
            </span>
          </div>
        </div>
        <div className="rule-card-header-actions">
          <button className="delete-button" onClick={onDelete} aria-label="Delete rule">
            <Delete20Regular />
          </button>
          <button className="edit-button" onClick={onEdit}>
            Edit
          </button>
          <button
            className={`toggle-switch ${rule.enabled ? 'checked' : ''}`}
            onClick={onToggle}
            role="switch"
            aria-checked={rule.enabled}
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </div>

      {getDescription() && (
        <div className="rule-card-body">
          <p className="rule-description">{getDescription()}</p>
        </div>
      )}

      {rule.type === 'adherence' && rule.monitoring.guidanceSource && (
        <div className="rule-card-footer">
          <span className="mcs-badge">Connected to MCS</span>
        </div>
      )}
    </div>
  );
};
