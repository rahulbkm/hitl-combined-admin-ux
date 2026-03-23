import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const profileNames: { [key: string]: string } = {
  'profile1': 'Standard Support Profile',
  'profile2': 'VIP Customer Profile',
  'profile3': 'Technical Support Profile',
  'profile4': 'Sales Team Profile',
  'profile5': 'After-Hours Profile',
  'profile6': 'Billing Support Profile'
};

interface AutomatedMessage {
  id: string;
  trigger: string;
  message: string;
}

interface OverflowRule {
  id: string;
  trigger: string;
  action: string;
}

interface TimeoutRule {
  id: string;
  triggerType: string;
  timeThreshold: string;
  actionType: string;
}

const EngagementProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('automatedMessages');
  const [consultExternalPhone, setConsultExternalPhone] = useState(false);
  const [consultExternalTeams, setConsultExternalTeams] = useState(false);
  const [transferExternalPhone, setTransferExternalPhone] = useState(false);
  const [useBridgedTransfer, setUseBridgedTransfer] = useState(false);
  const [transferExternalTeams, setTransferExternalTeams] = useState(false);
  const [automatedMessages, setAutomatedMessages] = useState<AutomatedMessage[]>([
    { id: '1', trigger: 'agent-assigned', message: 'You are now connected with {AgentName}. How can I help you today?' },
    { id: '2', trigger: 'average-wait-time', message: 'Your estimated wait time is {WaitTime} minutes. Thank you for your patience.' },
    { id: '3', trigger: 'conversation-transferred', message: "I'm transferring you to a specialist who can better assist with your request. Please hold." },
    { id: '4', trigger: 'agent-ended-conversation', message: 'Thank you for contacting us. Your conversation has been ended. Have a great day!' },
    { id: '5', trigger: 'customer-ended-conversation', message: 'The customer has ended the conversation.' },
    { id: '6', trigger: 'position-in-queue', message: 'You are currently number {QueuePosition} in the queue. We appreciate your patience.' }
  ]);
  const [assignmentMethod, setAssignmentMethod] = useState('round-robin');
  const [afterCallWorkSetting, setAfterCallWorkSetting] = useState('custom');
  const [overflowBeforeRules, setOverflowBeforeRules] = useState<OverflowRule[]>([{ id: '1', trigger: '', action: '' }]);
  const [overflowAfterRules, setOverflowAfterRules] = useState<OverflowRule[]>([{ id: '1', trigger: '', action: '' }]);
  const [notifyQueuePosition, setNotifyQueuePosition] = useState(false);
  const [notifyWaitTime, setNotifyWaitTime] = useState(false);
  const [timeoutRules, setTimeoutRules] = useState<TimeoutRule[]>([{ id: '1', triggerType: '', timeThreshold: '', actionType: '' }]);

  const profileName = id ? profileNames[id] || 'Unknown Profile' : 'Unknown Profile';

  const addAutomatedMessage = () => setAutomatedMessages([...automatedMessages, { id: Date.now().toString(), trigger: '', message: '' }]);
  const deleteAutomatedMessage = (msgId: string) => setAutomatedMessages(automatedMessages.filter(m => m.id !== msgId));
  const updateAutomatedMessage = (msgId: string, field: 'trigger' | 'message', value: string) =>
    setAutomatedMessages(automatedMessages.map(m => m.id === msgId ? { ...m, [field]: value } : m));

  const addOverflowBeforeRule = () => setOverflowBeforeRules([...overflowBeforeRules, { id: Date.now().toString(), trigger: '', action: '' }]);
  const deleteOverflowBeforeRule = (ruleId: string) => setOverflowBeforeRules(overflowBeforeRules.filter(r => r.id !== ruleId));
  const updateOverflowBeforeRule = (ruleId: string, field: 'trigger' | 'action', value: string) =>
    setOverflowBeforeRules(overflowBeforeRules.map(r => r.id === ruleId ? { ...r, [field]: value } : r));

  const addOverflowAfterRule = () => setOverflowAfterRules([...overflowAfterRules, { id: Date.now().toString(), trigger: '', action: '' }]);
  const deleteOverflowAfterRule = (ruleId: string) => setOverflowAfterRules(overflowAfterRules.filter(r => r.id !== ruleId));
  const updateOverflowAfterRule = (ruleId: string, field: 'trigger' | 'action', value: string) =>
    setOverflowAfterRules(overflowAfterRules.map(r => r.id === ruleId ? { ...r, [field]: value } : r));

  const addTimeoutRule = () => setTimeoutRules([...timeoutRules, { id: Date.now().toString(), triggerType: '', timeThreshold: '', actionType: '' }]);
  const deleteTimeoutRule = (ruleId: string) => setTimeoutRules(timeoutRules.filter(r => r.id !== ruleId));
  const updateTimeoutRule = (ruleId: string, field: keyof TimeoutRule, value: string) =>
    setTimeoutRules(timeoutRules.map(r => r.id === ruleId ? { ...r, [field]: value } : r));

  const tabs = [
    { key: 'automatedMessages', label: 'Automated messages' },
    { key: 'customerWaitTime', label: 'Customer wait time' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'workDistribution', label: 'Work distribution' },
    { key: 'assignmentMethod', label: 'Assignment method' },
    { key: 'afterCallWork', label: 'After call work' },
    { key: 'consultTransfer', label: 'Consult/Transfer' },
    { key: 'postCallSurvey', label: 'Post-call survey' },
    { key: 'sessionTemplate', label: 'Session template' },
    { key: 'overflowManagement', label: 'Overflow management' },
    { key: 'timeoutRules', label: 'Conversation timeout rules' }
  ];

  const renderDeleteButton = (onClick: () => void) => (
    <button className="delete-message-button" onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 2h4v1H6V2zM2 4h12v1H2V4zm2 1h8l-.5 9H4.5L4 5zm2 2v5h1V7H6zm3 0v5h1V7H9z" />
      </svg>
    </button>
  );

  return (
    <div className="voice-channel-edit-page">
      <div className="page-header-bar">
        <div className="header-bar-left">
          <button className="back-button" onClick={() => navigate('/engagement-profiles')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="save-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1zm-2 0v4H5V2h6zm1 11H4V3h1v4h6V3h1v10z" />
            </svg>
            Save and close
          </button>
        </div>
        <div className="header-bar-right">
          <a href="#" className="download-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 10l-4-4h2.5V2h3v4H12L8 10zm6 3v1H2v-1h12z" />
            </svg>
            Download configuration
          </a>
        </div>
      </div>

      <div className="page-header">
        <h1 className="edit-title">{profileName}</h1>
        <p className="edit-subtitle">Profile ID: {id}</p>
      </div>

      <div className="edit-content-layout">
        <aside className="edit-sidebar">
          <nav className="edit-tabs">
            {tabs.map(tab => (
              <button key={tab.key} className={`edit-tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="edit-main-area">
          {activeTab === 'automatedMessages' && (
            <div className="form-section">
              <h2 className="section-label">Automated Messages</h2>
              <p className="form-help-text" style={{ marginBottom: 16 }}>Configure automated messages sent to customers during different stages of their interaction.</p>
              <div className="automated-messages-list">
                {automatedMessages.map(msg => (
                  <div key={msg.id} className="automated-message-row">
                    <div className="message-trigger-dropdown">
                      <select className="form-select" value={msg.trigger} onChange={e => updateAutomatedMessage(msg.id, 'trigger', e.target.value)} style={{ maxWidth: 'none', width: '100%' }}>
                        <option value="">Select a trigger</option>
                        <option value="agent-assigned">Agent assigned</option>
                        <option value="average-wait-time">Average wait time notification</option>
                        <option value="conversation-transferred">Conversation transferred</option>
                        <option value="agent-ended-conversation">Agent ended conversation</option>
                        <option value="customer-ended-conversation">Customer ended conversation</option>
                        <option value="position-in-queue">Position in queue</option>
                      </select>
                    </div>
                    <div className="message-text-input">
                      <input type="text" className="form-input" value={msg.message} onChange={e => updateAutomatedMessage(msg.id, 'message', e.target.value)} placeholder="Enter message text" style={{ maxWidth: 'none', width: '100%' }} />
                    </div>
                    {renderDeleteButton(() => deleteAutomatedMessage(msg.id))}
                  </div>
                ))}
              </div>
              <button className="add-language-button" onClick={addAutomatedMessage} style={{ marginTop: 16 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                Add automated message
              </button>
            </div>
          )}

          {activeTab === 'customerWaitTime' && (
            <div className="form-section">
              <h2 className="section-label">Customer Wait Time</h2>
              <p className="form-help-text" style={{ marginBottom: 16 }}>Configure how customers are notified about their wait time and queue position.</p>
              <div className="form-group">
                <label className="toggle-label">
                  <input type="checkbox" className="toggle-checkbox" checked={notifyQueuePosition} onChange={e => setNotifyQueuePosition(e.target.checked)} />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Show queue position to customer</span>
                </label>
                <p className="form-help-text">Notify customers of their position in the queue</p>
              </div>
              <div className="form-group">
                <label className="toggle-label">
                  <input type="checkbox" className="toggle-checkbox" checked={notifyWaitTime} onChange={e => setNotifyWaitTime(e.target.checked)} />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Show estimated wait time to customer</span>
                </label>
                <p className="form-help-text">Notify customers of their estimated wait time</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="form-section">
              <h2 className="section-label">Notifications</h2>
              <p className="form-help-text" style={{ marginBottom: 16 }}>Configure notification templates for agents and supervisors.</p>
              <div className="form-group">
                <label className="form-label">Notification template</label>
                <select className="form-select">
                  <option value="">Select a template</option>
                  <option value="default">Default Notification Template</option>
                  <option value="priority">Priority Alert Template</option>
                  <option value="escalation">Escalation Template</option>
                </select>
                <p className="form-help-text">Choose the notification template for this profile</p>
              </div>
            </div>
          )}

          {activeTab === 'workDistribution' && (
            <div className="form-section">
              <h2 className="section-label">Work Distribution</h2>
              <div className="form-group">
                <label className="form-label">Skill matching algorithm</label>
                <select className="form-select" defaultValue="exact-match">
                  <option value="exact-match">Exact match</option>
                  <option value="nearest-match">Nearest match</option>
                  <option value="none">None</option>
                </select>
                <p className="form-help-text">Determines how work items are matched to agents based on skills</p>
              </div>
              <div className="form-group">
                <label className="form-label">Capacity profile</label>
                <select className="form-select" defaultValue="default">
                  <option value="default">Default capacity profile</option>
                  <option value="high-volume">High Volume Capacity Profile</option>
                  <option value="low-volume">Low Volume Capacity Profile</option>
                </select>
                <p className="form-help-text">Controls how work is distributed based on agent capacity</p>
              </div>
            </div>
          )}

          {activeTab === 'assignmentMethod' && (
            <div className="form-section">
              <h2 className="section-label">Assignment Method</h2>
              <div className="form-group">
                <label className="form-label">Assignment method</label>
                <select className="form-select" value={assignmentMethod} onChange={e => setAssignmentMethod(e.target.value)}>
                  <option value="round-robin">Round robin</option>
                  <option value="round-robin-affinity">Round robin with agent affinity</option>
                  <option value="highest-capacity">Highest capacity</option>
                  <option value="least-active">Least active</option>
                </select>
                <p className="form-help-text">Determines how conversations are assigned to available agents</p>
              </div>
              {assignmentMethod === 'round-robin-affinity' && (
                <div className="form-group">
                  <label className="form-label">Affinity expiry (hours)</label>
                  <input type="number" className="form-input" defaultValue="24" min="1" />
                  <p className="form-help-text">How long to maintain agent affinity for returning customers</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'afterCallWork' && (
            <div className="form-section">
              <h2 className="section-label">After Call Work</h2>
              <div className="form-group">
                <label className="form-label">After call work setting</label>
                <select className="form-select" value={afterCallWorkSetting} onChange={e => setAfterCallWorkSetting(e.target.value)}>
                  <option value="never-block">Never block</option>
                  <option value="custom">Custom time</option>
                  <option value="always-block">Always block</option>
                </select>
                <p className="form-help-text">Set how long agents are in after-call work status before receiving new conversations</p>
              </div>
              {afterCallWorkSetting === 'custom' && (
                <div className="form-group">
                  <label className="form-label">Duration (seconds)</label>
                  <input type="number" className="form-input" defaultValue="30" min="0" />
                </div>
              )}
            </div>
          )}

          {activeTab === 'consultTransfer' && (
            <div className="form-section">
              <h2 className="section-label">Consult/Transfer</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Consult options</h3>
                {[
                  { checked: consultExternalPhone, onChange: setConsultExternalPhone, label: 'Allow consult to external phone number', help: 'Enable agents to consult with external phone numbers' },
                  { checked: consultExternalTeams, onChange: setConsultExternalTeams, label: 'Allow consult to Microsoft Teams users', help: 'Enable agents to consult with Teams users' }
                ].map(item => (
                  <div key={item.label} className="form-group">
                    <label className="toggle-label">
                      <input type="checkbox" className="toggle-checkbox" checked={item.checked} onChange={e => item.onChange(e.target.checked)} />
                      <span className="toggle-switch"></span>
                      <span className="toggle-text">{item.label}</span>
                    </label>
                    <p className="form-help-text">{item.help}</p>
                  </div>
                ))}
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">Transfer options</h3>
                {[
                  { checked: transferExternalPhone, onChange: setTransferExternalPhone, label: 'Allow transfer to external phone number', help: 'Enable agents to transfer calls to external numbers' },
                  { checked: useBridgedTransfer, onChange: setUseBridgedTransfer, label: 'Use bridged transfer', help: 'Keep the original call connected while transferring' },
                  { checked: transferExternalTeams, onChange: setTransferExternalTeams, label: 'Allow transfer to Microsoft Teams users', help: 'Enable agents to transfer to Teams users' }
                ].map(item => (
                  <div key={item.label} className="form-group">
                    <label className="toggle-label">
                      <input type="checkbox" className="toggle-checkbox" checked={item.checked} onChange={e => item.onChange(e.target.checked)} />
                      <span className="toggle-switch"></span>
                      <span className="toggle-text">{item.label}</span>
                    </label>
                    <p className="form-help-text">{item.help}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'postCallSurvey' && (
            <div className="form-section">
              <h2 className="section-label">Post-Call Survey</h2>
              <div className="form-group">
                <label className="form-label">Survey bot</label>
                <select className="form-select" defaultValue="csat">
                  <option value="">No survey</option>
                  <option value="csat">Customer Satisfaction Survey Bot</option>
                  <option value="nps">Net Promoter Score (NPS) Bot</option>
                  <option value="detailed">Detailed Feedback Survey Bot</option>
                  <option value="quick-rating">Quick Rating Bot (1-5 stars)</option>
                </select>
                <p className="form-help-text">Select the survey bot to use after call completion</p>
              </div>
            </div>
          )}

          {activeTab === 'sessionTemplate' && (
            <div className="form-section">
              <h2 className="section-label">Session Template</h2>
              <div className="form-group">
                <label className="form-label">Session template</label>
                <select className="form-select" defaultValue="default">
                  <option value="default">Default Voice Session Template</option>
                  <option value="omnichannel">Omnichannel Session Template</option>
                  <option value="technical">Technical Support Session Template</option>
                  <option value="sales">Sales Session Template</option>
                  <option value="minimal">Minimal Session Template</option>
                  <option value="customer-service">Customer Service Session Template</option>
                </select>
                <p className="form-help-text">Select the session template that defines the agent workspace layout</p>
              </div>
            </div>
          )}

          {activeTab === 'overflowManagement' && (
            <div className="form-section">
              <h2 className="section-label">Overflow Management</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Pre-queue rules</h3>
                <p className="form-help-text" style={{ marginBottom: 12 }}>Rules that apply before the conversation enters the queue.</p>
                <div className="overflow-rules-list">
                  {overflowBeforeRules.map(rule => (
                    <div key={rule.id} className="overflow-rule-row">
                      <div className="overflow-trigger-action-row">
                        <div className="overflow-trigger-group">
                          <label className="form-label">Trigger</label>
                          <select className="form-select" value={rule.trigger} onChange={e => updateOverflowBeforeRule(rule.id, 'trigger', e.target.value)} style={{ maxWidth: 'none', width: '100%' }}>
                            <option value="">Select trigger</option>
                            <option value="queue-full">Queue is full</option>
                            <option value="wait-time">Wait time exceeds threshold</option>
                            <option value="outside-hours">Outside operating hours</option>
                          </select>
                        </div>
                        <div className="overflow-action-group">
                          <label className="form-label">Action</label>
                          <select className="form-select" value={rule.action} onChange={e => updateOverflowBeforeRule(rule.id, 'action', e.target.value)} style={{ maxWidth: 'none', width: '100%' }}>
                            <option value="">Select action</option>
                            <option value="route-to-queue">Route to another queue</option>
                            <option value="offer-callback">Offer callback</option>
                            <option value="voicemail">Send to voicemail</option>
                            <option value="end-conversation">End conversation</option>
                          </select>
                        </div>
                      </div>
                      <button className="delete-overflow-rule-button" onClick={() => deleteOverflowBeforeRule(rule.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h4v1H6V2zM2 4h12v1H2V4zm2 1h8l-.5 9H4.5L4 5zm2 2v5h1V7H6zm3 0v5h1V7H9z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="add-overflow-rule-button" onClick={addOverflowBeforeRule} style={{ marginTop: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  Add pre-queue rule
                </button>
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">In-queue rules</h3>
                <p className="form-help-text" style={{ marginBottom: 12 }}>Rules that apply while the conversation is waiting in the queue.</p>
                <div className="overflow-rules-list">
                  {overflowAfterRules.map(rule => (
                    <div key={rule.id} className="overflow-rule-row">
                      <div className="overflow-trigger-action-row">
                        <div className="overflow-trigger-group">
                          <label className="form-label">Trigger</label>
                          <select className="form-select" value={rule.trigger} onChange={e => updateOverflowAfterRule(rule.id, 'trigger', e.target.value)} style={{ maxWidth: 'none', width: '100%' }}>
                            <option value="">Select trigger</option>
                            <option value="wait-time">Wait time exceeds threshold</option>
                            <option value="no-agents">No agents available</option>
                          </select>
                        </div>
                        <div className="overflow-action-group">
                          <label className="form-label">Action</label>
                          <select className="form-select" value={rule.action} onChange={e => updateOverflowAfterRule(rule.id, 'action', e.target.value)} style={{ maxWidth: 'none', width: '100%' }}>
                            <option value="">Select action</option>
                            <option value="route-to-queue">Route to another queue</option>
                            <option value="offer-callback">Offer callback</option>
                            <option value="voicemail">Send to voicemail</option>
                          </select>
                        </div>
                      </div>
                      <button className="delete-overflow-rule-button" onClick={() => deleteOverflowAfterRule(rule.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h4v1H6V2zM2 4h12v1H2V4zm2 1h8l-.5 9H4.5L4 5zm2 2v5h1V7H6zm3 0v5h1V7H9z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="add-overflow-rule-button" onClick={addOverflowAfterRule} style={{ marginTop: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  Add in-queue rule
                </button>
              </div>
            </div>
          )}

          {activeTab === 'timeoutRules' && (
            <div className="form-section">
              <h2 className="section-label">Conversation Timeout Rules</h2>
              <p className="form-help-text" style={{ marginBottom: 16 }}>Define rules that trigger actions when conversations are inactive for a specified time.</p>
              <div className="timeout-rules-list">
                {timeoutRules.map((rule, idx) => (
                  <div key={rule.id} className="timeout-rule-card">
                    <div className="timeout-rule-header">
                      <h3 className="timeout-rule-title">Timeout Rule {idx + 1}</h3>
                      <button className="delete-timeout-rule-button" onClick={() => deleteTimeoutRule(rule.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h4v1H6V2zM2 4h12v1H2V4zm2 1h8l-.5 9H4.5L4 5zm2 2v5h1V7H6zm3 0v5h1V7H9z" /></svg>
                      </button>
                    </div>
                    <div className="timeout-trigger-row">
                      <div className="timeout-field-group">
                        <label className="form-label">Trigger type</label>
                        <select className="form-select" value={rule.triggerType} onChange={e => updateTimeoutRule(rule.id, 'triggerType', e.target.value)}>
                          <option value="">Select trigger type</option>
                          <option value="customer-inactive">Customer inactive</option>
                          <option value="agent-inactive">Agent inactive</option>
                          <option value="conversation-idle">Conversation idle</option>
                        </select>
                      </div>
                      <div className="timeout-field-group">
                        <label className="form-label">Time threshold (minutes)</label>
                        <input type="number" className="form-input" value={rule.timeThreshold} onChange={e => updateTimeoutRule(rule.id, 'timeThreshold', e.target.value)} placeholder="e.g., 15" style={{ maxWidth: 'none', width: '100%' }} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginTop: 16 }}>
                      <label className="form-label">Action</label>
                      <select className="form-select" value={rule.actionType} onChange={e => updateTimeoutRule(rule.id, 'actionType', e.target.value)}>
                        <option value="">Select action</option>
                        <option value="send-message">Send message</option>
                        <option value="end-conversation">End conversation</option>
                        <option value="escalate">Escalate to supervisor</option>
                        <option value="transfer-queue">Transfer to another queue</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <button className="add-timeout-rule-button" onClick={addTimeoutRule} style={{ marginTop: 16 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                Add timeout rule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementProfileEdit;
