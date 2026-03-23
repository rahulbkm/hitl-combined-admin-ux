import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditPages.css';

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

const VoiceChannelEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('channelDetails');
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [channelDetailsExpanded, setChannelDetailsExpanded] = useState(true);
  const [phoneNumber] = useState('+1 (555) 123-4567');
  const [region] = useState('US East');
  const [isTollFree] = useState(true);
  const [canMakeCalls] = useState(true);
  const [canReceiveCalls] = useState(true);
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [additionalLanguages, setAdditionalLanguages] = useState<string[]>([]);
  const [operatingHoursEnabled, setOperatingHoursEnabled] = useState(false);
  const [operatingHours, setOperatingHours] = useState('24/7');
  const [recordingMode, setRecordingMode] = useState('none');
  const [autoStart, setAutoStart] = useState(false);
  const [allowCSRPauseResume, setAllowCSRPauseResume] = useState(false);
  const [allowAutoHoldPauseResume, setAllowAutoHoldPauseResume] = useState(false);
  const [showTranscriptByDefault, setShowTranscriptByDefault] = useState(false);
  const [selectedConversationProfile, setSelectedConversationProfile] = useState('');
  const [selectedAIAgent, setSelectedAIAgent] = useState('');
  const [useComplexCondition, setUseComplexCondition] = useState(false);
  const [showEllipsisMenu, setShowEllipsisMenu] = useState(false);
  const [conditions, setConditions] = useState([
    { id: '1', variable: '', value: '', profile: '' }
  ]);
  const [selectedEngagementProfile, setSelectedEngagementProfile] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(true);

  const isChannelDetailsComplete = !!(phoneNumber && region);
  const isEngagementProfileComplete = selectedEngagementProfile !== '';
  const selectedProfileConfig = engagementProfileConfigs[selectedEngagementProfile];

  return (
    <div className="voice-channel-edit-page">
      <div className="page-header-bar">
        <div className="header-bar-left">
          <button className="back-button" onClick={() => navigate('/voice-channels')}>
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
        <h1 className="edit-title">Voice Channel Setup</h1>
        <p className="edit-subtitle">Channel ID: {id}</p>
      </div>

      <div className="edit-content-layout">
        <aside className="edit-sidebar">
          <nav className="edit-tabs">
            <div className="menu-group">
              <button className="menu-group-header" onClick={() => setChannelDetailsExpanded(!channelDetailsExpanded)}>
                <svg className={`chevron ${channelDetailsExpanded ? 'expanded' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M9 4L6 7 3 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Channel details</span>
              </button>
              {channelDetailsExpanded && (
                <div className="menu-group-items">
                  {[{ key: 'general', label: 'General' }, { key: 'language', label: 'Language' }, { key: 'behavior', label: 'Behavior' }].map(t => (
                    <button key={t.key} className={`edit-tab nested ${activeSubTab === t.key ? 'active' : ''}`} onClick={() => { setActiveTab('channelDetails'); setActiveSubTab(t.key); }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className={`edit-tab ${activeTab === 'conversationProfile' ? 'active' : ''}`} onClick={() => setActiveTab('conversationProfile')}>Conversation profile</button>
            <button className={`edit-tab ${activeTab === 'engagementProfile' ? 'active' : ''}`} onClick={() => setActiveTab('engagementProfile')}>Engagement profile</button>
          </nav>
        </aside>

        <div className="edit-main-area">
          {activeTab === 'channelDetails' && activeSubTab === 'general' && (
            <div className="form-section">
              <h2 className="section-label">General</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Phone number configuration</h3>
                <div className="phone-number-display-card">
                  <div className="phone-number-details">
                    <div className="phone-detail-row"><span className="detail-label">Phone number:</span><span className="detail-value">{phoneNumber}</span></div>
                    <div className="phone-detail-row"><span className="detail-label">Region:</span><span className="detail-value">{region}</span></div>
                    <div className="phone-detail-row"><span className="detail-label">Toll-free:</span><span className="detail-value">{isTollFree ? 'Yes' : 'No'}</span></div>
                    <div className="phone-detail-row">
                      <span className="detail-label">Call capabilities:</span>
                      <span className="detail-value">{canMakeCalls && canReceiveCalls ? 'Can make and receive calls' : canMakeCalls ? 'Can make calls only' : 'Can receive calls only'}</span>
                    </div>
                  </div>
                  <button className="change-number-button">Change number</button>
                </div>
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">Representative call quality survey</h3>
                <p className="form-help-text">Ask CSR to provide call quality feedback at the end of a call <a href="#" className="inline-link">here</a></p>
              </div>
            </div>
          )}

          {activeTab === 'channelDetails' && activeSubTab === 'language' && (
            <div className="form-section">
              <h2 className="section-label">Language</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Language settings</h3>
                <div className="form-group">
                  <label className="form-label">Primary language <span className="required">*</span></label>
                  <select className="form-select" value={primaryLanguage} onChange={e => setPrimaryLanguage(e.target.value)}>
                    {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <p className="form-help-text">Select the primary language for this voice channel</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Additional languages</label>
                  <div className="additional-languages-container">
                    {additionalLanguages.map((lang, i) => (
                      <div key={i} className="language-chip">
                        <span>{lang}</span>
                        <button className="remove-chip-button" onClick={() => setAdditionalLanguages(additionalLanguages.filter((_, idx) => idx !== i))}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="add-language-button" onClick={() => { const l = prompt('Enter language name:'); if (l && !additionalLanguages.includes(l)) setAdditionalLanguages([...additionalLanguages, l]); }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    Add language
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'channelDetails' && activeSubTab === 'behavior' && (
            <div className="form-section">
              <h2 className="section-label">Behavior</h2>
              <div className="form-group-section">
                <h3 className="subsection-title">Channel operating hours</h3>
                <div className="form-group">
                  <label className="toggle-label">
                    <input type="checkbox" className="toggle-checkbox" checked={operatingHoursEnabled} onChange={e => setOperatingHoursEnabled(e.target.checked)} />
                    <span className="toggle-switch"></span>
                    <span className="toggle-text">Enable operating hours</span>
                  </label>
                  <p className="form-help-text">Restrict when this voice channel is available</p>
                </div>
                {operatingHoursEnabled && (
                  <div className="form-group">
                    <label className="form-label">Operating hours</label>
                    <select className="form-select" value={operatingHours} onChange={e => setOperatingHours(e.target.value)}>
                      <option value="24/7">24/7 - Always available</option>
                      <option value="business-hours">Business hours (9 AM - 5 PM)</option>
                      <option value="extended-hours">Extended hours (7 AM - 9 PM)</option>
                      <option value="custom">Custom schedule</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="form-group-section">
                <h3 className="subsection-title">Recording and transcription</h3>
                <div className="form-group">
                  <label className="form-label">Recording mode</label>
                  <select className="form-select" value={recordingMode} onChange={e => setRecordingMode(e.target.value)}>
                    <option value="none">None</option>
                    <option value="transcription">Transcription</option>
                    <option value="transcription-and-recording">Transcription and recording</option>
                  </select>
                </div>
                {recordingMode !== 'none' && (
                  <>
                    {[
                      { checked: autoStart, onChange: setAutoStart, label: 'Automatically start', help: 'Start recording automatically when call begins' },
                      { checked: allowCSRPauseResume, onChange: setAllowCSRPauseResume, label: 'Allow CSR to pause and resume', help: 'Enable representatives to control recording' },
                      { checked: allowAutoHoldPauseResume, onChange: setAllowAutoHoldPauseResume, label: 'Allow automatic pause and resume during hold', help: 'Automatically pause recording when on hold' },
                      { checked: showTranscriptByDefault, onChange: setShowTranscriptByDefault, label: 'Show transcript by default', help: 'Display transcript panel automatically' }
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
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'conversationProfile' && (
            <div className="form-section">
              <h2 className="section-label">Conversation Profile</h2>
              <div style={{ background: 'white', border: '1px solid #edebe9', borderRadius: 4, padding: 24, marginBottom: 24 }}>
                <h3 className="card-title">Conversation profile configuration</h3>
                <div className="form-group">
                  <label className="form-label">Conversation profile</label>

                  {!useComplexCondition ? (
                    <div className="profile-select-row">
                      <select
                        className="form-select"
                        value={selectedConversationProfile}
                        onChange={e => { setSelectedConversationProfile(e.target.value); if (e.target.value) setSelectedAIAgent('agent1'); }}
                      >
                        <option value="">Select a conversation profile</option>
                        <option value="flow1">Standard Customer Service Profile</option>
                        <option value="flow2">Sales Inquiry Profile</option>
                        <option value="flow3">Technical Support Profile</option>
                        <option value="flow4">VIP Customer Profile</option>
                        <option value="flow5">After-Hours Profile</option>
                      </select>
                      <div className="ellipsis-menu-container">
                        <button
                          className="ellipsis-button"
                          onClick={() => setShowEllipsisMenu(v => !v)}
                          title="More options"
                        >
                          •••
                        </button>
                        {showEllipsisMenu && (
                          <>
                            <div className="ellipsis-backdrop" onClick={() => setShowEllipsisMenu(false)} />
                            <div className="ellipsis-dropdown">
                              <button
                                className="ellipsis-option"
                                onClick={() => { setUseComplexCondition(true); setShowEllipsisMenu(false); }}
                              >
                                Author complex conditions
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="complex-condition-editor">
                      <button
                        className="back-to-simple-button"
                        onClick={() => setUseComplexCondition(false)}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to simple selection
                      </button>

                      <div className="cond-rules-header">
                        <span className="cond-rules-title">Rules</span>
                        <button
                          className="cond-add-rule-btn"
                          onClick={() => setConditions(prev => [...prev, { id: String(Date.now()), variable: '', value: '', profile: '' }])}
                          title="Add rule"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      <div className="cond-rules-list">
                        {conditions.map((cond, idx) => (
                          <div key={cond.id} className="cond-rule-item">
                            <div className="cond-rule-header">
                              <span className="cond-rule-label">Rule {idx + 1}</span>
                              {conditions.length > 1 && (
                                <button
                                  className="cond-delete-rule-btn"
                                  onClick={() => {
                                    const next = conditions.filter(c => c.id !== cond.id);
                                    setConditions(next);
                                    const firstProfile = next.find(c => c.profile)?.profile || '';
                                    setSelectedConversationProfile(firstProfile);
                                    if (firstProfile) setSelectedAIAgent('agent1');
                                  }}
                                  title="Delete rule"
                                >
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 4h10M5 4V2h4v2M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.2A1 1 0 004.8 12h4.4a1 1 0 001-.8L11 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              )}
                            </div>
                            <div className="cond-sentence">
                              <span className="cond-text">if</span>

                              <div className="cond-chip-wrap">
                                <select
                                  className={`cond-chip-select${cond.variable ? ' has-value' : ''}`}
                                  value={cond.variable}
                                  onChange={e => setConditions(prev => prev.map(c => c.id === cond.id ? { ...c, variable: e.target.value } : c))}
                                >
                                  <option value="">select variable</option>
                                  <option value="customer_type">Customer type</option>
                                  <option value="region">Region</option>
                                  <option value="language">Language</option>
                                  <option value="queue">Queue name</option>
                                  <option value="channel">Channel</option>
                                  <option value="lob">Line of business</option>
                                </select>
                                {cond.variable && (
                                  <button className="cond-clear-btn" onClick={() => setConditions(prev => prev.map(c => c.id === cond.id ? { ...c, variable: '' } : c))} title="Clear">×</button>
                                )}
                              </div>

                              <span className="cond-text">is</span>

                              <input
                                className="cond-inline-input"
                                type="text"
                                value={cond.value}
                                onChange={e => setConditions(prev => prev.map(c => c.id === cond.id ? { ...c, value: e.target.value } : c))}
                                placeholder="enter value"
                              />

                              <span className="cond-text">, then the conversation profile should be</span>

                              <div className="cond-chip-wrap">
                                <select
                                  className={`cond-chip-select${cond.profile ? ' has-value' : ''}`}
                                  value={cond.profile}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setConditions(prev => prev.map(c => c.id === cond.id ? { ...c, profile: val } : c));
                                    if (val) { setSelectedConversationProfile(val); setSelectedAIAgent('agent1'); }
                                  }}
                                >
                                  <option value="">select profile</option>
                                  <option value="flow1">Standard Customer Service Profile</option>
                                  <option value="flow2">Sales Inquiry Profile</option>
                                  <option value="flow3">Technical Support Profile</option>
                                  <option value="flow4">VIP Customer Profile</option>
                                  <option value="flow5">After-Hours Profile</option>
                                </select>
                                {cond.profile && (
                                  <button className="cond-clear-btn" onClick={() => setConditions(prev => prev.map(c => c.id === cond.id ? { ...c, profile: '' } : c))} title="Clear">×</button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="form-help-text">Conversation profiles define how incoming calls are handled, including AI agent interaction, call routing rules, queue assignments, and customer greetings.</p>
                </div>
                {selectedConversationProfile && (
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '2px solid #edebe9' }}>
                    <div className="conversation-profile-subsection">
                      <h3 className="card-title">AI agent</h3>
                      <div className="form-group">
                        <label className="form-label">Select AI agent</label>
                        <select className="form-select" value={selectedAIAgent} onChange={e => setSelectedAIAgent(e.target.value)}>
                          <option value="">Select an agent</option>
                          <option value="agent1">Customer Support Agent</option>
                          <option value="agent2">Sales Assistant</option>
                          <option value="agent3">Technical Support Agent</option>
                          <option value="agent4">Billing Agent</option>
                        </select>
                      </div>
                      <a href="#" className="external-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 2H8v2h3.59L6 9.59 7.41 11 13 5.41V9h2V2z" /><path d="M12 12H4V4h4V2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h-2v4z" /></svg>
                        Add or modify AI agents in Copilot Studio
                      </a>
                    </div>
                    <div className="conversation-profile-subsection">
                      <h3 className="card-title">Work classification rules</h3>
                      <div className="rulesets-list">
                        {['General Customer Inquiries Ruleset', 'Technical Support Ruleset', 'Sales and Billing Ruleset', 'VIP Customer Ruleset'].map(name => (
                          <a key={name} href="#" className="ruleset-link">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2h10v2H3V2zm0 4h10v2H3V6zm0 4h7v2H3v-2z" /></svg>
                            {name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="conversation-profile-subsection">
                      <h3 className="card-title">Route-to-queue ruleset</h3>
                      <a href="#" className="ruleset-link" style={{ marginBottom: 12 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 2l-8 6v8l8-6V2z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                        Default Queue Routing Ruleset
                      </a>
                      <div className="form-group" style={{ marginTop: 12 }}>
                        <label className="form-label">Rule-hit policy</label>
                        <select className="form-select" defaultValue="hit-all">
                          <option value="hit-all">Hit All - Execute all matching rules</option>
                          <option value="hit-first">Hit First - Execute only the first matching rule</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'engagementProfile' && (
            <div className="form-section">
              <h2 className="section-label">Engagement Profile</h2>
              <p className="engagement-profile-help">
                Engagement profiles define how agents and customers interact during conversations. Select an engagement profile to configure the agent experience for this voice channel.
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
                        <div className="summary-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showVisualizer && (
          <div className="visualizer-panel">
            <div className="visualizer-header">
              <h3 className="visualizer-title">Voice Channel Flow</h3>
              <button className="visualizer-close" onClick={() => setShowVisualizer(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="visualizer-content">
              <div className="flow-diagram">

                {/* 1. Start */}
                <div className="flow-node start-node">
                  <div className="node-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" fill="#107c10" />
                      <path d="M10 8l6 4-6 4z" fill="white" />
                    </svg>
                  </div>
                  <div className="node-content">
                    <div className="node-title">Start</div>
                    <div className="node-subtitle">Incoming call</div>
                  </div>
                </div>
                <div className="flow-connector"></div>

                {/* 2. Channel Details */}
                <div className={`flow-node ${isChannelDetailsComplete ? 'completed' : 'pending'}`}>
                  <div className="node-content">
                    <div className="node-title">Channel Details</div>
                    <div className="node-subtitle">{isChannelDetailsComplete ? phoneNumber : 'Not configured'}</div>
                    {isEngagementProfileComplete && (
                      <div className="node-details">
                        <span className="detail-badge">{engagementProfiles.find(p => p.id === selectedEngagementProfile)?.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Steps 3–6 appear only after a conversation profile is selected */}
                {selectedConversationProfile && (
                  <>
                    <div className="flow-connector"></div>

                    {/* 3. AI Agent */}
                    <div className={`flow-node ${selectedAIAgent ? 'completed' : 'pending'}`}>
                      <div className="node-content">
                        <div className="node-title">AI Agent</div>
                        <div className="node-subtitle">
                          {selectedAIAgent === 'agent1' ? 'Customer Support Agent'
                            : selectedAIAgent === 'agent2' ? 'Sales Assistant'
                            : selectedAIAgent === 'agent3' ? 'Technical Support Agent'
                            : selectedAIAgent === 'agent4' ? 'Billing Agent'
                            : 'Not configured'}
                        </div>
                      </div>
                    </div>
                    <div className="flow-connector"></div>

                    {/* 4. Work Classification */}
                    <div className="flow-node completed">
                      <div className="node-content">
                        <div className="node-title">Work Classification</div>
                        <div className="node-subtitle">Rules configured</div>
                        <div className="node-details">
                          <span className="detail-badge">4 Rulesets</span>
                        </div>
                      </div>
                    </div>
                    <div className="flow-connector"></div>

                    {/* 5. Route to Queue */}
                    <div className="flow-node completed">
                      <div className="node-content">
                        <div className="node-title">Route to Queue</div>
                        <div className="node-subtitle">Default Queue Routing</div>
                        <div className="node-details">
                          <span className="detail-badge">Hit All Policy</span>
                        </div>
                      </div>
                    </div>

                    {/* 6. Queues (split) */}
                    <div className="queue-split">
                      <div className="split-connector"></div>
                      <div className="split-branches">
                        <div className="branch-line"></div>
                        <div className="branch-line"></div>
                        <div className="branch-line"></div>
                      </div>
                    </div>
                    <div className="queue-nodes-container">
                      <div className="flow-node queue-node">
                        <div className="node-content">
                          <div className="node-title">Support Queue</div>
                          <div className="node-subtitle">General support</div>
                        </div>
                      </div>
                      <div className="flow-node queue-node">
                        <div className="node-content">
                          <div className="node-title">Sales Queue</div>
                          <div className="node-subtitle">Sales inquiries</div>
                        </div>
                      </div>
                      <div className="flow-node queue-node">
                        <div className="node-content">
                          <div className="node-title">Technical Queue</div>
                          <div className="node-subtitle">Technical issues</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChannelEdit;
