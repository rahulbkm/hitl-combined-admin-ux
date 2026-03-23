import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EditPages.css';

const queueData: { [key: string]: { name: string; type: string; owner: string } } = {
  'q1': { name: 'General Support Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q2': { name: 'VIP Support Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q3': { name: 'Technical Support Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q4': { name: 'Sales Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q5': { name: 'Billing Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q6': { name: 'Chat Support Queue', type: 'Chat', owner: 'Aurora365 User6' },
  'q7': { name: 'Live Chat Queue', type: 'Chat', owner: 'Aurora365 User6' },
  'q8': { name: 'Case Management Queue', type: 'Record', owner: 'Aurora365 User6' },
  'q9': { name: 'Emergency Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q10': { name: 'After Hours Queue', type: 'Voice', owner: 'Aurora365 User6' },
  'q11': { name: 'Social Media Queue', type: 'Chat', owner: 'Aurora365 User6' },
  'q12': { name: 'Email Support Queue', type: 'Record', owner: 'Aurora365 User6' }
};

interface QueueUser {
  id: string;
  name: string;
  type: string;
  role: string;
  capacityProfile: string;
  capacity: number;
  businessUnit: string;
  date: string;
}

const queueUsers: QueueUser[] = [
  { id: 'u1', name: 'Lorenzo Russet', type: 'User', role: 'Representative, Supervisor', capacityProfile: 'Default voice outbound, ...', capacity: 1000, businessUnit: 'aurorabagenv3fe39', date: '11/15/2025' },
  { id: 'u2', name: 'Sarah Johnson', type: 'User', role: 'Representative', capacityProfile: 'Default voice outbound, ...', capacity: 800, businessUnit: 'aurorabagenv3fe39', date: '10/22/2025' },
  { id: 'u3', name: 'Michael Chen', type: 'User', role: 'Representative', capacityProfile: 'Default voice outbound, ...', capacity: 900, businessUnit: 'aurorabagenv3fe39', date: '11/01/2025' }
];

const engagementProfiles = [
  { id: 'profile1', name: 'Standard Support Profile' },
  { id: 'profile2', name: 'VIP Customer Profile' },
  { id: 'profile3', name: 'Technical Support Profile' },
  { id: 'profile4', name: 'Sales Team Profile' },
  { id: 'profile5', name: 'After-Hours Profile' },
  { id: 'profile6', name: 'Billing Support Profile' }
];

const engagementProfileConfigs: { [key: string]: any } = {
  'profile1': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Queue position and wait time notifications enabled', notifications: '5 notification templates assigned', workDistribution: 'Exact match skill algorithm, Default capacity profile', assignmentMethod: 'Round robin with agent affinity', afterCallWork: 'Custom time (30 seconds)', consultTransfer: 'External phone and Teams enabled', postCallSurvey: 'Customer Satisfaction Survey Bot', sessionTemplate: 'Default Voice Session Template', overflowManagement: '2 pre-queue rules, 3 in-queue rules configured', conversationTimeoutRules: '2 timeout rules configured' },
  'profile2': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Queue position notifications only', notifications: '5 notification templates with priority alerts', workDistribution: 'Exact match skill algorithm, High Volume Capacity Profile', assignmentMethod: 'Highest capacity', afterCallWork: 'Custom time (60 seconds)', consultTransfer: 'External phone and Teams enabled', postCallSurvey: 'Net Promoter Score (NPS) Bot', sessionTemplate: 'Omnichannel Session Template', overflowManagement: '1 pre-queue rule, 2 in-queue rules configured', conversationTimeoutRules: '3 timeout rules configured' },
  'profile3': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Wait time notifications only', notifications: '5 notification templates assigned', workDistribution: 'Nearest match skill algorithm, Default capacity profile', assignmentMethod: 'Least active', afterCallWork: 'Custom time (45 seconds)', consultTransfer: 'External phone and Teams enabled', postCallSurvey: 'Detailed Feedback Survey Bot', sessionTemplate: 'Technical Support Session Template', overflowManagement: '2 pre-queue rules, 2 in-queue rules configured', conversationTimeoutRules: '1 timeout rule configured' },
  'profile4': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Queue position and wait time notifications enabled', notifications: '5 notification templates assigned', workDistribution: 'Exact match skill algorithm, Default capacity profile', assignmentMethod: 'Round robin', afterCallWork: 'Custom time (30 seconds)', consultTransfer: 'External phone and Teams enabled', postCallSurvey: 'Quick Rating Bot (1-5 stars)', sessionTemplate: 'Sales Session Template', overflowManagement: '1 pre-queue rule, 1 in-queue rule configured', conversationTimeoutRules: '2 timeout rules configured' },
  'profile5': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Notifications disabled', notifications: '5 notification templates assigned', workDistribution: 'None skill matching, Low Volume Capacity Profile', assignmentMethod: 'Round robin', afterCallWork: 'Never block', consultTransfer: 'Transfer only - external phone enabled', postCallSurvey: 'No survey', sessionTemplate: 'Minimal Session Template', overflowManagement: '1 pre-queue rule configured', conversationTimeoutRules: 'No timeout rules' },
  'profile6': { automatedMessages: '6 message triggers configured', customerWaitTime: 'Queue position and wait time notifications enabled', notifications: '5 notification templates assigned', workDistribution: 'Exact match skill algorithm, Default capacity profile', assignmentMethod: 'Least active', afterCallWork: 'Custom time (30 seconds)', consultTransfer: 'External phone and Teams enabled', postCallSurvey: 'Customer Satisfaction Survey Bot', sessionTemplate: 'Customer Service Session Template', overflowManagement: '2 pre-queue rules, 2 in-queue rules configured', conversationTimeoutRules: '2 timeout rules configured' }
};

const QueueEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngagementProfile, setSelectedEngagementProfile] = useState('');

  const queue = id ? queueData[id] : null;
  const queueName = queue?.name || 'Unknown Queue';
  const queueType = queue?.type || 'Unknown';
  const queueOwner = queue?.owner || 'Unknown';

  const filteredUsers = queueUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedProfileConfig = engagementProfileConfigs[selectedEngagementProfile];

  return (
    <div className="queue-edit-page">
      <div className="refresh-bar">
        <button className="refresh-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.65 2.35A7.95 7.95 0 0 0 8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35z" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="queue-header">
        <div className="breadcrumb-container">
          <Link to="/queues" className="breadcrumb-link">Queues</Link>
          <svg className="breadcrumb-separator" width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
            <path d="M2 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="breadcrumb-current">Advanced queues</span>
        </div>
        <div className="queue-title-row">
          <h1 className="queue-title">{queueName}</h1>
          <button className="edit-link-button">Edit</button>
        </div>
        <div className="queue-metadata">
          <div className="metadata-item">
            <span className="metadata-label">Type</span>
            <span className="metadata-value">{queueType}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Owner</span>
            <span className="metadata-value">{queueOwner}</span>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="queue-section">
        <div className="section-header">
          <h2 className="section-title">Users</h2>
          <div className="section-actions">
            <div className="search-box-inline">
              <svg className="search-icon-inline" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.5 6.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.27 4.27a6 6 0 1 1 1.06-1.06l3.5 3.5-1.06 1.06-3.5-3.5z" />
              </svg>
              <input type="text" placeholder="Search" className="search-input-inline" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <button className="see-more-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="13" r="1.5" />
              </svg>
              See more
            </button>
            <button className="add-users-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add users
            </button>
          </div>
        </div>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th><div className="th-content-queue">Name <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 3l3 4H3l3-4z" /></svg></div></th>
                <th>Type</th>
                <th>Role</th>
                <th>Capacity profile</th>
                <th>Capacity</th>
                <th>Business unit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td><a href="#" className="user-link">{user.name}</a></td>
                  <td>{user.type}</td>
                  <td>{user.role}</td>
                  <td>{user.capacityProfile}</td>
                  <td>{user.capacity}</td>
                  <td>{user.businessUnit}</td>
                  <td>{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <span className="table-count">{filteredUsers.length} of {queueUsers.length}</span>
          </div>
        </div>
      </div>

      {/* Engagement Profile Section */}
      <div className="queue-section">
        <h2 className="section-title">Engagement profile</h2>
        <p className="engagement-profile-help">
          Engagement profiles define how agents and customers interact during conversations. This includes automated messages, notifications, work distribution rules, assignment methods, and post-interaction settings. Select an engagement profile to configure the agent experience for this queue.
        </p>
        <div className="form-group">
          <label className="form-label">Select engagement profile</label>
          <select className="form-select" value={selectedEngagementProfile} onChange={e => setSelectedEngagementProfile(e.target.value)}>
            <option value="">Choose an engagement profile</option>
            {engagementProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        {selectedEngagementProfile && selectedProfileConfig && (
          <div className="engagement-profile-summary">
            <div className="summary-header">
              <h3 className="summary-title">Configuration Summary</h3>
              <Link to={`/engagement-profiles/${selectedEngagementProfile}`} className="edit-profile-link">Edit</Link>
            </div>
            <div className="summary-grid">
              {Object.entries({
                'Automated messages': selectedProfileConfig.automatedMessages,
                'Customer wait time': selectedProfileConfig.customerWaitTime,
                'Notifications': selectedProfileConfig.notifications,
                'Work distribution': selectedProfileConfig.workDistribution,
                'Assignment method': selectedProfileConfig.assignmentMethod,
                'After call work': selectedProfileConfig.afterCallWork,
                'Consult/Transfer': selectedProfileConfig.consultTransfer,
                'Post-call survey': selectedProfileConfig.postCallSurvey,
                'Session template': selectedProfileConfig.sessionTemplate,
                'Overflow management': selectedProfileConfig.overflowManagement,
                'Conversation timeout rules': selectedProfileConfig.conversationTimeoutRules
              }).map(([label, value]) => (
                <div key={label} className="summary-item">
                  <div className="summary-label">{label}</div>
                  <div className="summary-value">{String(value)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Operation Hours Section */}
      <div className="queue-section">
        <div className="section-header-inline">
          <h2 className="section-title">Operation hours</h2>
          <span className="optional-badge">Optional</span>
        </div>
        <div className="operation-hours-content">
          <h3 className="operation-hours-title">Set your operation hours</h3>
          <p className="operation-hours-description">
            Choose the days and hours for this queue to be active. Any live chat messages routed to the queue during non-operating hours will be closed. If no operation hours are set, this queue will be active 24/7. <a href="#">Learn more</a>.
          </p>
          <button className="set-hours-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Set operation hours
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueueEdit;
