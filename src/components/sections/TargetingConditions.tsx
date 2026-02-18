import React from 'react';
import { Add20Regular } from '@fluentui/react-icons';
import { MonitoringRule } from '../../types';
import './Sections.css';

interface TargetingConditionsProps {
  rules: MonitoringRule[];
  onEditConditions: (id: string) => void;
}

export const TargetingConditions: React.FC<TargetingConditionsProps> = ({
  rules,
  onEditConditions
}) => {
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'quality': return 'rule-type-badge quality';
      case 'compliance': return 'rule-type-badge compliance';
      case 'adherence': return 'rule-type-badge adherence';
      default: return 'rule-type-badge';
    }
  };

  return (
    <div className="section-view">
      <div className="section-header">
        <div className="section-header-content">
          <h2 className="section-title">When to Apply</h2>
          <p className="section-description">
            Define conditions that determine when each monitoring rule should be applied
          </p>
        </div>
      </div>

      <div className="section-content">
        {rules.length === 0 ? (
          <div className="empty-state">
            <p>No rules configured yet. Add rules in the Monitoring Setup section first.</p>
          </div>
        ) : (
          rules.map(rule => (
            <div key={rule.id} className="targeting-card">
              <div className="targeting-card-header">
                <div className="targeting-card-title-row">
                  <h3 className="targeting-card-title">{rule.name}</h3>
                  <span className={getTypeBadgeClass(rule.type)}>
                    {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                  </span>
                </div>
              </div>

              <div className="targeting-card-body">
                <h4 className="targeting-section-label">
                  Conditions ({rule.conditions.length})
                </h4>
                {rule.conditions.length === 0 ? (
                  <p className="no-conditions-text">No conditions set - applies to all conversations</p>
                ) : (
                  <ul className="conditions-list">
                    {rule.conditions.map((condition, idx) => (
                      <li key={idx} className="condition-item">
                        <span className="condition-text">
                          {condition.lhs} {condition.operator} "{condition.rhs}"
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  className="add-condition-button"
                  onClick={() => onEditConditions(rule.id)}
                >
                  <Add20Regular />
                  {rule.conditions.length === 0 ? 'Add Condition' : 'Edit Conditions'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
