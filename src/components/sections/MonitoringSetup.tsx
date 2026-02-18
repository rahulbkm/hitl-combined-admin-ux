import React, { useState } from 'react';
import { Add20Regular } from '@fluentui/react-icons';
import { MonitoringRule } from '../../types';
import { RuleCard } from '../shared/RuleCard';
import './Sections.css';

interface MonitoringSetupProps {
  rules: MonitoringRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (id: string) => void;
  onDeleteRule: (id: string) => void;
  onAddNew: () => void;
}

export const MonitoringSetup: React.FC<MonitoringSetupProps> = ({
  rules,
  onToggleRule,
  onEditRule,
  onDeleteRule,
  onAddNew
}) => {
  const [filterType, setFilterType] = useState<'all' | 'quality' | 'compliance' | 'adherence'>('all');

  const filteredRules = rules.filter(rule =>
    filterType === 'all' || rule.type === filterType
  );

  return (
    <div className="section-view">
      <div className="section-header">
        <div className="section-header-content">
          <h2 className="section-title">What to Monitor</h2>
          <p className="section-description">
            Define monitoring rules for quality criteria, compliance guardrails, and adherence guidance
          </p>
        </div>
        <button className="add-button" onClick={onAddNew}>
          <Add20Regular />
          Add Rule
        </button>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filterType === 'quality' ? 'active' : ''}`}
          onClick={() => setFilterType('quality')}
        >
          Quality
        </button>
        <button
          className={`filter-button ${filterType === 'compliance' ? 'active' : ''}`}
          onClick={() => setFilterType('compliance')}
        >
          Compliance
        </button>
        <button
          className={`filter-button ${filterType === 'adherence' ? 'active' : ''}`}
          onClick={() => setFilterType('adherence')}
        >
          Adherence
        </button>
      </div>

      <div className="section-content">
        {filteredRules.length === 0 ? (
          <div className="empty-state">
            <p>No {filterType === 'all' ? '' : filterType} rules found</p>
            <button className="add-button" onClick={onAddNew}>
              <Add20Regular />
              Add your first rule
            </button>
          </div>
        ) : (
          filteredRules.map(rule => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onToggle={() => onToggleRule(rule.id)}
              onEdit={() => onEditRule(rule.id)}
              onDelete={() => onDeleteRule(rule.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
