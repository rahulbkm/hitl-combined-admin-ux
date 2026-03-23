import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Add20Regular, ArrowClockwise20Regular, Search20Regular, ArrowSort20Regular } from '@fluentui/react-icons';
import './Pages.css';

interface ConversationProfileData {
  id: string;
  name: string;
  description: string;
  owner: string;
  createdOn: string;
  status: string;
}

const conversationProfilesData: ConversationProfileData[] = [
  { id: 'flow1', name: 'Standard Customer Service Profile', description: 'General customer support workflow with AI agent assistance and queue routing', owner: 'Aurora365 User6', createdOn: '8/15/2025 9:30 AM', status: 'Active' },
  { id: 'flow2', name: 'Sales Inquiry Profile', description: 'Sales-focused conversation profile with lead qualification and CRM integration', owner: 'Aurora365 User6', createdOn: '8/20/2025 2:15 PM', status: 'Active' },
  { id: 'flow3', name: 'Technical Support Profile', description: 'Technical troubleshooting workflow with skill-based routing and escalation', owner: 'Aurora365 User6', createdOn: '9/1/2025 11:00 AM', status: 'Active' },
  { id: 'flow4', name: 'VIP Customer Profile', description: 'Priority handling for VIP customers with dedicated agent routing', owner: 'Aurora365 User6', createdOn: '9/5/2025 3:45 PM', status: 'Active' },
  { id: 'flow5', name: 'After-Hours Profile', description: 'After-hours support profile with voicemail and callback options', owner: 'Aurora365 User6', createdOn: '9/10/2025 10:20 AM', status: 'Active' },
  { id: 'flow6', name: 'Emergency Response Profile', description: 'High-priority emergency profile with immediate escalation', owner: 'Aurora365 User6', createdOn: '8/25/2025 1:00 PM', status: 'Active' },
  { id: 'flow7', name: 'Billing Inquiry Profile', description: 'Billing and payment support with secure payment processing', owner: 'Aurora365 User6', createdOn: '9/12/2025 4:30 PM', status: 'Active' },
  { id: 'flow8', name: 'Multilingual Support Profile', description: 'Multi-language support profile with language detection and routing', owner: 'Aurora365 User6', createdOn: '8/28/2025 8:15 AM', status: 'Active' }
];

const ConversationProfiles: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = conversationProfilesData.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button className="toolbar-btn"><Add20Regular /> Add conversation profile</button>
          <button className="toolbar-btn"><ArrowClockwise20Regular /> Refresh</button>
        </div>
        <div className="page-toolbar-right">
          <div className="toolbar-search">
            <Search20Regular className="toolbar-search-icon" />
            <input
              type="text"
              placeholder="Search conversation profiles"
              className="toolbar-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="page-heading">
        <Link to="/channel-experiences" className="page-breadcrumb">Channel experiences</Link>
        <h1>Conversation profiles</h1>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th><div className="th-inner">Profile Name <ArrowSort20Regular style={{width:12,height:12,color:'#605e5c'}} /></div></th>
              <th>Description</th>
              <th>Status</th>
              <th>Owner</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(profile => (
              <tr key={profile.id}>
                <td><Link to={`/conversation-profiles/${profile.id}`} className="table-link">{profile.name}</Link></td>
                <td>{profile.description}</td>
                <td><span className="status-badge status-active">{profile.status}</span></td>
                <td>{profile.owner}</td>
                <td>{profile.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConversationProfiles;
