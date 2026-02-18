import React from 'react';
import {
  ArrowUp20Regular,
  Target20Regular,
  CheckmarkCircle20Regular,
  Warning20Regular
} from '@fluentui/react-icons';
import './Sections.css';

interface MonitoringInsightsProps {
  rulesCount: number;
  actionsCount: number;
}

export const MonitoringInsights: React.FC<MonitoringInsightsProps> = ({
  rulesCount,
  actionsCount
}) => {
  return (
    <div className="section-view">
      <div className="section-header">
        <div className="section-header-content">
          <h2 className="section-title">Performance & Analytics</h2>
          <p className="section-description">
            Monitor the effectiveness of your rules and actions (Coming soon with real data)
          </p>
        </div>
      </div>

      <div className="section-content">
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">
              <Target20Regular />
            </div>
            <div className="insight-content">
              <h3 className="insight-value">{rulesCount}</h3>
              <p className="insight-label">Active Rules</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">
              <CheckmarkCircle20Regular />
            </div>
            <div className="insight-content">
              <h3 className="insight-value">{actionsCount}</h3>
              <p className="insight-label">Configured Actions</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">
              <ArrowUp20Regular />
            </div>
            <div className="insight-content">
              <h3 className="insight-value">--</h3>
              <p className="insight-label">Triggers This Week</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">
              <Warning20Regular />
            </div>
            <div className="insight-content">
              <h3 className="insight-value">--</h3>
              <p className="insight-label">Critical Alerts</p>
            </div>
          </div>
        </div>

        <div className="placeholder-section">
          <div className="placeholder-content">
            <h3 className="placeholder-title">Analytics Dashboard Coming Soon</h3>
            <p className="placeholder-text">
              View detailed analytics including:
            </p>
            <ul className="placeholder-list">
              <li>Rule trigger frequency and trends</li>
              <li>Action effectiveness metrics</li>
              <li>Response time analysis</li>
              <li>Quality score improvements</li>
              <li>Optimization recommendations</li>
            </ul>
            <p className="placeholder-note">
              Connect your data sources to see real-time insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
