import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPages.css';

const ChannelEdit: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [windowSize, setWindowSize] = useState('default');
  const [channelConfigExpanded, setChannelConfigExpanded] = useState(true);
  const [selectedChannelProfile, setSelectedChannelProfile] = useState('');
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedRoutingProfile, setSelectedRoutingProfile] = useState('');
  const [showRoutingProfileCreation, setShowRoutingProfileCreation] = useState(false);
  const [newRoutingProfileName, setNewRoutingProfileName] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(true);

  return (
    <div className="channel-edit-page">
      <div className="page-header-bar">
        <div className="header-bar-left">
          <button className="back-button" onClick={() => navigate('/chat-channels')}>
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
        <h1 className="edit-title">Editing Live Chat Widget</h1>
        <p className="edit-subtitle">Title: Let's Chat!</p>
      </div>

      <div className="edit-content-layout">
        <aside className="edit-sidebar">
          <nav className="edit-tabs">
            <div className="menu-group">
              <button
                className="menu-group-header"
                onClick={() => setChannelConfigExpanded(!channelConfigExpanded)}
              >
                <svg
                  className={`chevron ${channelConfigExpanded ? 'expanded' : ''}`}
                  width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                >
                  <path d="M9 4L6 7 3 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Channel configuration</span>
              </button>
              {channelConfigExpanded && (
                <div className="menu-group-items">
                  <button className={`edit-tab nested ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General Configuration</button>
                  <button className={`edit-tab nested ${activeTab === 'color' ? 'active' : ''}`} onClick={() => setActiveTab('color')}>Color Settings</button>
                  <button className={`edit-tab nested ${activeTab === 'header' ? 'active' : ''}`} onClick={() => setActiveTab('header')}>Header</button>
                  <button className={`edit-tab nested ${activeTab === 'widget' ? 'active' : ''}`} onClick={() => setActiveTab('widget')}>Chat widget</button>
                </div>
              )}
            </div>
            <button className={`edit-tab ${activeTab === 'channelProfile' ? 'active' : ''}`} onClick={() => setActiveTab('channelProfile')}>Channel profile</button>
            <button className={`edit-tab ${activeTab === 'routingProfile' ? 'active' : ''}`} onClick={() => setActiveTab('routingProfile')}>Routing profile</button>
          </nav>
        </aside>

        <div className="edit-main-area">
          {activeTab === 'general' && (
            <div className="form-section">
              <h2 className="section-label">General Configuration</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Channel details</h3>
                <div className="form-group">
                  <label className="form-label">Name <span className="required">*</span></label>
                  <input type="text" className="form-input" defaultValue="Contact center chat channel" />
                </div>
                <div className="form-group">
                  <label className="form-label">Language <span className="required">*</span></label>
                  <select className="form-select">
                    <option>English - United States</option>
                    <option>Spanish - Spain</option>
                    <option>French - France</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Type <span className="required">*</span></label>
                  <select className="form-select" disabled><option>Messaging</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Channel <span className="required">*</span></label>
                  <select className="form-select" disabled><option>Chat</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Workstream</label>
                  <a href="#" className="form-link">Contact center live chat workstream</a>
                </div>
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">Window Size and Position</h3>
                <div className="form-group">
                  <label className="form-label">Window Size <span className="required">*</span></label>
                  <div className="radio-group">
                    {['default', 'compact', 'custom'].map(v => (
                      <label key={v} className="radio-label">
                        <input type="radio" name="windowSize" value={v} checked={windowSize === v} onChange={e => setWindowSize(e.target.value)} />
                        <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Width</label><input type="text" className="form-input" defaultValue="360" /></div>
                  <div className="form-group"><label className="form-label">Height</label><input type="text" className="form-input" defaultValue="560" /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Position <span className="required">*</span></label>
                  <select className="form-select">
                    <option>Bottom right</option>
                    <option>Bottom left</option>
                    <option>Top right</option>
                    <option>Top left</option>
                  </select>
                </div>
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">Distance From Corners</h3>
                <div className="form-group">
                  <label className="form-label">Window Position <span className="required">*</span></label>
                  <div className="slider-group">
                    <span className="slider-label">Amount (px)</span>
                    <input type="range" className="slider" min="0" max="100" defaultValue="20" />
                    <span className="slider-value">20</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'color' || activeTab === 'header' || activeTab === 'widget') && (
            <div className="form-section">
              <h2 className="section-label">{activeTab === 'color' ? 'Color Settings' : activeTab === 'header' ? 'Header' : 'Chat widget'}</h2>
              <p className="placeholder-text">Configuration options will appear here.</p>
            </div>
          )}

          {activeTab === 'channelProfile' && (
            <div className="form-section">
              <h2 className="section-label">Channel profile</h2>
              <div className="help-text-box">
                <svg className="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="7" stroke="#0078d4" strokeWidth="1.5" fill="none" />
                  <path d="M8 11.5v-4M8 5.5v-.5" stroke="#0078d4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="help-text-content">
                  <p><strong>About Channel Profiles</strong></p>
                  <p>Channel profiles define the experience for customer service representatives and customers during chat interactions. Customize visual appearance, behavior settings, language preferences, and feature availability.</p>
                  <p>Apply profiles at different levels of granularity. Assign a default profile to the entire channel, or override settings at the queue level.</p>
                </div>
              </div>
              <div className="form-group-section">
                <div className="form-group">
                  <label className="form-label">Select Channel Profile <span className="required">*</span></label>
                  <select
                    className="form-select"
                    value={selectedChannelProfile}
                    onChange={e => {
                      if (e.target.value === 'create-new') {
                        setShowProfileCreation(true);
                        setSelectedChannelProfile('');
                      } else {
                        setSelectedChannelProfile(e.target.value);
                        setShowProfileCreation(false);
                      }
                    }}
                  >
                    <option value="">-- Select a profile --</option>
                    <option value="default-profile">Default Chat Profile</option>
                    <option value="premium-support">Premium Support Profile</option>
                    <option value="basic-support">Basic Support Profile</option>
                    <option value="technical-support">Technical Support Profile</option>
                    <option value="create-new">+ Create New Channel Profile</option>
                  </select>
                </div>
                {showProfileCreation && (
                  <div className="profile-creation-box">
                    <h3 className="subsection-title">Create New Channel Profile</h3>
                    <div className="form-group">
                      <label className="form-label">Profile Name <span className="required">*</span></label>
                      <input type="text" className="form-input" placeholder="Enter profile name" value={newProfileName} onChange={e => setNewProfileName(e.target.value)} />
                    </div>
                    <div className="button-group">
                      <button className="primary-button" onClick={() => { if (newProfileName.trim()) { setSelectedChannelProfile('new-profile'); setShowProfileCreation(false); setNewProfileName(''); } }}>Create Profile</button>
                      <button className="secondary-button" onClick={() => { setShowProfileCreation(false); setNewProfileName(''); }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              {selectedChannelProfile && !showProfileCreation && (
                <div className="configuration-summary">
                  <h3 className="subsection-title">Profile Configuration Summary</h3>
                  <div className="summary-grid-cards">
                    {[
                      { title: 'General Settings', items: ['Profile Name: ' + (selectedChannelProfile === 'default-profile' ? 'Default Chat Profile' : 'Selected Profile'), 'Language: English - United States', 'Timezone: (GMT-08:00) Pacific Time'] },
                      { title: 'Visual Appearance', items: ['Theme: Light Mode', 'Primary Color: #0078d4', 'Widget Position: Bottom Right'] },
                      { title: 'Features Enabled', items: ['✓ File Attachments', '✓ Emojis', '✓ Screen Sharing', '✓ Voice & Video Calling'] },
                      { title: 'CSR Experience', items: ['Max Chats: 5 concurrent', 'Auto Accept: Disabled', 'Sentiment Analysis: Enabled'] },
                      { title: 'Customer Experience', items: ['Wait Time Display: Enabled', 'Queue Position: Visible', 'Pre-chat Survey: Enabled'] },
                      { title: 'Automation & AI', items: ['Chatbot Integration: Enabled', 'Smart Suggestions: Enabled', 'Knowledge Base: Integrated'] }
                    ].map(card => (
                      <div key={card.title} className="summary-card">
                        <div className="summary-card-header"><h4>{card.title}</h4></div>
                        <ul className="summary-list">{card.items.map(item => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  <div className="summary-actions">
                    <button className="secondary-button">Edit Profile Configuration</button>
                    <button className="secondary-button">Duplicate Profile</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'routingProfile' && (
            <div className="form-section">
              <h2 className="section-label">Routing profile</h2>
              <div className="help-text-box">
                <svg className="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="7" stroke="#0078d4" strokeWidth="1.5" fill="none" />
                  <path d="M8 11.5v-4M8 5.5v-.5" stroke="#0078d4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="help-text-content">
                  <p><strong>About Routing Profiles</strong></p>
                  <p>Routing profiles determine how incoming conversations are distributed to customer service representatives. Configure routing rules, prioritization logic, capacity management, and skill-based assignment.</p>
                </div>
              </div>
              <div className="form-group-section">
                <div className="form-group">
                  <label className="form-label">Select Routing Profile <span className="required">*</span></label>
                  <select
                    className="form-select"
                    value={selectedRoutingProfile}
                    onChange={e => {
                      if (e.target.value === 'create-new') {
                        setShowRoutingProfileCreation(true);
                        setSelectedRoutingProfile('');
                      } else {
                        setSelectedRoutingProfile(e.target.value);
                        setShowRoutingProfileCreation(false);
                      }
                    }}
                  >
                    <option value="">-- Select a profile --</option>
                    <option value="standard-routing">Standard Routing Profile</option>
                    <option value="priority-routing">Priority Routing Profile</option>
                    <option value="skill-based">Skill-Based Routing Profile</option>
                    <option value="round-robin">Round Robin Routing Profile</option>
                    <option value="create-new">+ Create New Routing Profile</option>
                  </select>
                </div>
                {showRoutingProfileCreation && (
                  <div className="profile-creation-box">
                    <h3 className="subsection-title">Create New Routing Profile</h3>
                    <div className="form-group">
                      <label className="form-label">Profile Name <span className="required">*</span></label>
                      <input type="text" className="form-input" placeholder="Enter profile name" value={newRoutingProfileName} onChange={e => setNewRoutingProfileName(e.target.value)} />
                    </div>
                    <div className="button-group">
                      <button className="primary-button" onClick={() => { if (newRoutingProfileName.trim()) { setSelectedRoutingProfile('standard-routing'); setShowRoutingProfileCreation(false); setNewRoutingProfileName(''); } }}>Create Profile</button>
                      <button className="secondary-button" onClick={() => { setShowRoutingProfileCreation(false); setNewRoutingProfileName(''); }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              {selectedRoutingProfile && !showRoutingProfileCreation && (
                <div className="configuration-summary">
                  <h3 className="subsection-title">Profile Configuration Summary</h3>
                  <div className="summary-grid-cards">
                    {[
                      { title: 'General Settings', items: ['Profile Name: ' + (selectedRoutingProfile === 'standard-routing' ? 'Standard Routing Profile' : 'Selected Profile'), 'Routing Method: Skills-based with overflow', 'Status: Active'] },
                      { title: 'Distribution Rules', items: ['Assignment: Skills-based matching', 'Fallback: Round-robin distribution', 'Max Wait Time: 120 seconds'] },
                      { title: 'Capacity Management', items: ['Max Conversations: 5 per agent', 'Reserve Capacity: 20%', 'Load Balancing: Enabled'] },
                      { title: 'Skills & Matching', items: ['✓ Language Skills', '✓ Product Knowledge', '✓ Technical Expertise'] }
                    ].map(card => (
                      <div key={card.title} className="summary-card">
                        <div className="summary-card-header"><h4>{card.title}</h4></div>
                        <ul className="summary-list">{card.items.map(item => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  <div className="summary-actions">
                    <button className="secondary-button">Edit Profile Configuration</button>
                    <button className="secondary-button">Duplicate Profile</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showVisualizer && (
          <div className="visualizer-panel">
            <div className="visualizer-header">
              <h3 className="visualizer-title">Configuration Flow</h3>
              <button className="visualizer-close" onClick={() => setShowVisualizer(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="visualizer-content">
              <div className="flow-diagram">
                <div className="flow-node start-node">
                  <div className="node-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" fill="#107c10" /><path d="M10 8l6 4-6 4z" fill="white" /></svg></div>
                  <div className="node-content"><div className="node-title">Start</div><div className="node-subtitle">Chat Initiated</div></div>
                </div>
                <div className="flow-connector"></div>
                <div className={`flow-node ${activeTab.startsWith('general') || activeTab === 'color' || activeTab === 'header' || activeTab === 'widget' ? 'active' : 'configured'}`}>
                  <div className="node-content">
                    <div className="node-title">Channel Configuration</div>
                    <div className="node-subtitle">{windowSize === 'default' ? 'Default Layout' : windowSize === 'compact' ? 'Compact Layout' : 'Custom Layout'}</div>
                    <div className="node-details"><span className="detail-badge">General Settings</span></div>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className={`flow-node ${activeTab === 'channelProfile' ? 'active' : selectedChannelProfile ? 'configured' : 'pending'}`}>
                  <div className="node-content">
                    <div className="node-title">Channel Profile</div>
                    <div className="node-subtitle">{selectedChannelProfile ? 'Configured' : 'Not configured'}</div>
                  </div>
                </div>
                <div className="flow-connector"></div>
                <div className={`flow-node ${activeTab === 'routingProfile' ? 'active' : selectedRoutingProfile ? 'configured' : 'pending'}`}>
                  <div className="node-content">
                    <div className="node-title">Routing Profile</div>
                    <div className="node-subtitle">{selectedRoutingProfile ? 'Configured' : 'Not configured'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelEdit;
