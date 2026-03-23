import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const profileNames: { [key: string]: string } = {
  'flow1': 'Standard Customer Service Profile',
  'flow2': 'Sales Inquiry Profile',
  'flow3': 'Technical Support Profile',
  'flow4': 'VIP Customer Profile',
  'flow5': 'After-Hours Profile',
  'flow6': 'Emergency Response Profile',
  'flow7': 'Billing Inquiry Profile',
  'flow8': 'Multilingual Support Profile'
};

const ConversationProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAIAgent, setSelectedAIAgent] = useState('agent1');
  const [showVisualizer, setShowVisualizer] = useState(true);

  const profileName = id ? profileNames[id] || 'Unknown Profile' : 'Unknown Profile';

  return (
    <div className="voice-channel-edit-page">
      <div className="page-header-bar">
        <div className="header-bar-left">
          <button className="back-button" onClick={() => navigate('/conversation-profiles')}>
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
          <button className="visualizer-toggle-button" onClick={() => setShowVisualizer(!showVisualizer)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            {showVisualizer ? 'Hide' : 'Show'} Visualizer
          </button>
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
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'aiAgent', label: 'AI agent' },
              { key: 'workClassification', label: 'Work classification rules' },
              { key: 'routeToQueue', label: 'Route-to-queue ruleset' },
              { key: 'greetings', label: 'Greetings messages' }
            ].map(tab => (
              <button key={tab.key} className={`edit-tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="edit-main-area">
          {activeTab === 'overview' && (
            <div className="form-section">
              <h2 className="section-label">Overview</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Profile information</h3>
                <div className="form-group">
                  <label className="form-label">Profile name <span className="required">*</span></label>
                  <input type="text" className="form-input" value={profileName} readOnly />
                  <p className="form-help-text">The name of this conversation profile</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={3} defaultValue="This conversation profile defines how incoming calls are handled, including AI agent interaction, call routing rules, queue assignments, and customer greetings." style={{ height: 'auto' }} />
                  <p className="form-help-text">Describe the purpose and use case for this profile</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" defaultValue="active">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                  <p className="form-help-text">Set the status of this conversation profile</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'aiAgent' && (
            <div className="form-section">
              <h2 className="section-label">AI Agent</h2>
              <div className="conversation-profile-subsection">
                <h3 className="card-title">AI agent configuration</h3>
                <div className="form-group">
                  <label className="form-label">Select AI agent</label>
                  <select className="form-select" value={selectedAIAgent} onChange={e => setSelectedAIAgent(e.target.value)}>
                    <option value="">Select an agent</option>
                    <option value="agent1">Customer Support Agent</option>
                    <option value="agent2">Sales Assistant</option>
                    <option value="agent3">Technical Support Agent</option>
                    <option value="agent4">Billing Agent</option>
                  </select>
                  <p className="form-help-text">Choose the AI agent that will handle initial customer interactions.</p>
                </div>
                <div className="form-group">
                  <a href="#" className="external-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M14 2H8v2h3.59L6 9.59 7.41 11 13 5.41V9h2V2z" />
                      <path d="M12 12H4V4h4V2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h-2v4z" />
                    </svg>
                    Add or modify AI agents in Copilot Studio
                  </a>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                    <span>Enable AI agent handoff</span>
                  </label>
                  <p className="form-help-text">Allow the AI agent to transfer calls to human agents when needed</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Handoff confidence threshold</label>
                  <select className="form-select" defaultValue="medium">
                    <option value="low">Low - Transfer more calls to agents</option>
                    <option value="medium">Medium - Balanced approach</option>
                    <option value="high">High - AI handles more interactions</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workClassification' && (
            <div className="form-section">
              <h2 className="section-label">Work Classification Rules</h2>
              <div className="conversation-profile-subsection">
                <h3 className="card-title">Classification rulesets</h3>
                <p className="form-help-text">Configure rules to classify and categorize incoming calls.</p>
                <div className="rulesets-list">
                  {['General Customer Inquiries Ruleset', 'Technical Support Ruleset', 'Sales and Billing Ruleset', 'VIP Customer Ruleset', 'Emergency Escalation Ruleset'].map(name => (
                    <a key={name} href="#" className="ruleset-link">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2h10v2H3V2zm0 4h10v2H3V6zm0 4h7v2H3v-2z" /></svg>
                      {name}
                    </a>
                  ))}
                </div>
                <button className="add-language-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  Add new ruleset
                </button>
              </div>
            </div>
          )}

          {activeTab === 'routeToQueue' && (
            <div className="form-section">
              <h2 className="section-label">Route-to-Queue Ruleset</h2>
              <div className="conversation-profile-subsection">
                <h3 className="card-title">Queue routing configuration</h3>
                <div className="form-group">
                  <a href="#" className="ruleset-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 2l-8 6v8l8-6V2z" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    Default Queue Routing Ruleset
                  </a>
                  <p className="form-help-text">Define how calls are routed to different queues based on classification, priority, and availability</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Rule-hit policy</label>
                  <select className="form-select" defaultValue="hit-all">
                    <option value="hit-all">Hit All - Execute all matching rules</option>
                    <option value="hit-first">Hit First - Execute only the first matching rule</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Overflow handling</label>
                  <select className="form-select" defaultValue="wait">
                    <option value="wait">Wait in queue</option>
                    <option value="callback">Offer callback</option>
                    <option value="voicemail">Send to voicemail</option>
                    <option value="overflow-queue">Route to overflow queue</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Priority routing</label>
                  <select className="form-select" defaultValue="fifo">
                    <option value="fifo">First In, First Out (FIFO)</option>
                    <option value="priority">Priority-based routing</option>
                    <option value="skills">Skills-based routing</option>
                    <option value="round-robin">Round robin</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'greetings' && (
            <div className="form-section">
              <h2 className="section-label">Greetings Messages</h2>
              <div className="conversation-profile-subsection">
                <h3 className="card-title">Greeting configuration</h3>
                <p className="form-help-text">Configure greeting messages that customers hear when they call.</p>
                <div className="greetings-list">
                  {[
                    { trigger: 'Welcome message', msg: '"Thank you for calling our customer support. Your call is important to us. Please hold while we connect you to the next available representative."' },
                    { trigger: 'Holiday message', msg: '"Our offices are currently closed for the holiday. We will be back on [date]. For urgent matters, please visit our website."' },
                    { trigger: 'After-hours message', msg: '"Thank you for calling. Our business hours are Monday through Friday, 9 AM to 5 PM. Please leave a message."' }
                  ].map(item => (
                    <div key={item.trigger} className="greeting-item">
                      <div className="greeting-header">
                        <span className="greeting-trigger">{item.trigger}</span>
                        <button className="edit-greeting-button">Edit</button>
                      </div>
                      <div className="greeting-message">{item.msg}</div>
                    </div>
                  ))}
                  <button className="add-greeting-button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    Add greeting message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showVisualizer && (
          <div className="visualizer-panel">
            <div className="visualizer-header">
              <h3 className="visualizer-title">Conversation Profile</h3>
              <button className="visualizer-close" onClick={() => setShowVisualizer(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="visualizer-content">
              <div className="flow-diagram">
                <div className="flow-node start-node">
                  <div className="node-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="#107c10" /><path d="M10 8l6 4-6 4z" fill="white" /></svg></div>
                  <div className="node-content"><div className="node-title">Start</div><div className="node-subtitle">Incoming call</div></div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-node completed">
                  <div className="node-content"><div className="node-title">Greeting Message</div><div className="node-subtitle">Welcome message played</div></div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-node completed">
                  <div className="node-content">
                    <div className="node-title">AI Agent</div>
                    <div className="node-subtitle">{selectedAIAgent === 'agent1' ? 'Customer Support Agent' : selectedAIAgent === 'agent2' ? 'Sales Assistant' : selectedAIAgent === 'agent3' ? 'Technical Support Agent' : selectedAIAgent === 'agent4' ? 'Billing Agent' : 'No agent selected'}</div>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-node completed">
                  <div className="node-content"><div className="node-title">Work Classification</div><div className="node-subtitle">Rules configured</div><div className="node-details"><span className="detail-badge">5 Rulesets</span></div></div>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-node completed">
                  <div className="node-content"><div className="node-title">Route to Queue</div><div className="node-subtitle">Default Queue Routing</div></div>
                </div>
                <div className="queue-split">
                  <div className="split-connector"></div>
                  <div className="split-branches">
                    <div className="branch-line"></div>
                    <div className="branch-line"></div>
                    <div className="branch-line"></div>
                  </div>
                </div>
                <div className="queue-nodes-container">
                  {['Support Queue', 'Sales Queue', 'Technical Queue'].map(q => (
                    <div key={q} className="flow-node queue-node">
                      <div className="node-content"><div className="node-title">{q}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationProfileEdit;
