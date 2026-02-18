import React from 'react';
import { Delete20Regular } from '@fluentui/react-icons';
import { Action } from '../../types';
import './Shared.css';

interface ActionCardProps {
  action: Action;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({ action, onToggle, onEdit, onDelete }) => {
  const getTypeBadgeClass = () => {
    switch (action.type) {
      case 'notification': return 'action-type-badge notification';
      case 'coaching': return 'action-type-badge coaching';
      case 'escalation': return 'action-type-badge escalation';
      default: return 'action-type-badge';
    }
  };

  const getSeverityBadge = () => {
    if (action.config.threshold) {
      const severity = action.config.threshold.severity;
      return (
        <span className={`severity-badge ${severity}`}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
      );
    }
    return null;
  };

  const getThresholdDisplay = () => {
    if (action.config.threshold) {
      const { lowerScore, higherScore } = action.config.threshold;
      return `Threshold: ${lowerScore}-${higherScore}`;
    }
    return '';
  };

  const getRecipientsDisplay = () => {
    if (action.config.recipients && action.config.recipients.length > 0) {
      return `Recipients: ${action.config.recipients.join(', ')}`;
    }
    return '';
  };

  return (
    <div className="action-card">
      <div className="action-card-header">
        <div className="action-card-header-content">
          <div className="action-title-row">
            <h3 className="action-title">{action.name}</h3>
          </div>
          <div className="action-meta">
            <span className={getTypeBadgeClass()}>
              {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
            </span>
            {getSeverityBadge()}
            <span className="action-rules-count">
              Used by {action.linkedRuleIds.length} {action.linkedRuleIds.length === 1 ? 'rule' : 'rules'}
            </span>
          </div>
        </div>
        <div className="action-card-header-actions">
          <button className="delete-button" onClick={onDelete} aria-label="Delete action">
            <Delete20Regular />
          </button>
          <button className="edit-button" onClick={onEdit}>
            Edit
          </button>
          <button
            className={`toggle-switch ${action.enabled ? 'checked' : ''}`}
            onClick={onToggle}
            role="switch"
            aria-checked={action.enabled}
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </div>

      <div className="action-card-body">
        {getThresholdDisplay() && <p className="action-detail">{getThresholdDisplay()}</p>}
        {getRecipientsDisplay() && <p className="action-detail">{getRecipientsDisplay()}</p>}
        {action.config.message && <p className="action-detail">Message: {action.config.message}</p>}
      </div>
    </div>
  );
};
