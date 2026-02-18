import React, { useState } from 'react';
import { Add20Regular } from '@fluentui/react-icons';
import { Action } from '../../types';
import { ActionCard } from '../shared/ActionCard';
import './Sections.css';

interface ResponseConfigurationProps {
  actions: Action[];
  onToggleAction: (id: string) => void;
  onEditAction: (id: string) => void;
  onDeleteAction: (id: string) => void;
  onAddNew: () => void;
}

export const ResponseConfiguration: React.FC<ResponseConfigurationProps> = ({
  actions,
  onToggleAction,
  onEditAction,
  onDeleteAction,
  onAddNew
}) => {
  const [filterType, setFilterType] = useState<'all' | 'notification' | 'coaching' | 'escalation'>('all');

  const filteredActions = actions.filter(action =>
    filterType === 'all' || action.type === filterType
  );

  return (
    <div className="section-view">
      <div className="section-header">
        <div className="section-header-content">
          <h2 className="section-title">Actions & Responses</h2>
          <p className="section-description">
            Configure notifications, coaching messages, and escalation paths for your monitoring rules
          </p>
        </div>
        <button className="add-button" onClick={onAddNew}>
          <Add20Regular />
          Add Action
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
          className={`filter-button ${filterType === 'notification' ? 'active' : ''}`}
          onClick={() => setFilterType('notification')}
        >
          Notifications
        </button>
        <button
          className={`filter-button ${filterType === 'coaching' ? 'active' : ''}`}
          onClick={() => setFilterType('coaching')}
        >
          Coaching
        </button>
        <button
          className={`filter-button ${filterType === 'escalation' ? 'active' : ''}`}
          onClick={() => setFilterType('escalation')}
        >
          Escalations
        </button>
      </div>

      <div className="section-content">
        {filteredActions.length === 0 ? (
          <div className="empty-state">
            <p>No {filterType === 'all' ? '' : filterType} actions found</p>
            <button className="add-button" onClick={onAddNew}>
              <Add20Regular />
              Add your first action
            </button>
          </div>
        ) : (
          filteredActions.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onToggle={() => onToggleAction(action.id)}
              onEdit={() => onEditAction(action.id)}
              onDelete={() => onDeleteAction(action.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
