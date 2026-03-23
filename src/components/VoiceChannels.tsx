import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Add20Regular, ArrowClockwise20Regular, Search20Regular, ArrowSort20Regular } from '@fluentui/react-icons';
import './Pages.css';

interface VoiceChannelData {
  id: string;
  name: string;
  conversationProfile: string;
  owner: string;
  createdOn: string;
}

const voiceChannelsData: VoiceChannelData[] = [
  { id: 'v1', name: 'Customer Support Voice', conversationProfile: 'Standard Customer Service Profile', owner: 'Aurora365 User6', createdOn: '9/10/2025 1:30 PM' },
  { id: 'v2', name: 'Sales Voice Channel', conversationProfile: 'Sales Inquiry Profile', owner: 'Aurora365 User6', createdOn: '8/14/2025 4:44 PM' },
  { id: 'v3', name: 'Technical Support Voice', conversationProfile: 'Technical Support Profile', owner: 'Aurora365 User6', createdOn: '8/19/2025 6:28 PM' },
  { id: 'v4', name: 'Emergency Hotline', conversationProfile: 'Emergency Response Profile', owner: 'Aurora365 User6', createdOn: '8/1/2025 12:32 PM' },
  { id: 'v5', name: 'General Inquiries Voice', conversationProfile: 'Standard Customer Service Profile', owner: 'Aurora365 User6', createdOn: '8/5/2025 1:32 PM' },
  { id: 'v6', name: 'VIP Customer Line', conversationProfile: 'VIP Customer Profile', owner: 'Aurora365 User6', createdOn: '8/7/2025 5:00 PM' },
  { id: 'v7', name: 'Billing Support Voice', conversationProfile: 'Billing Inquiry Profile', owner: 'Aurora365 User6', createdOn: '1/22/2025 12:23 AM' },
  { id: 'v8', name: 'Product Inquiries Voice', conversationProfile: 'Sales Inquiry Profile', owner: 'Aurora365 User6', createdOn: '10/10/2025 1:59 AM' },
  { id: 'v9', name: 'After-Hours Support', conversationProfile: 'After-Hours Profile', owner: 'Aurora365 User6', createdOn: '10/10/2025 1:01 AM' },
  { id: 'v10', name: 'International Support Voice', conversationProfile: 'Multilingual Support Profile', owner: 'Aurora365 User6', createdOn: '11/19/2025 11:19 AM' }
];

const VoiceChannels: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = voiceChannelsData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button className="toolbar-btn"><Add20Regular /> Add voice channel</button>
          <button className="toolbar-btn"><ArrowClockwise20Regular /> Refresh</button>
        </div>
        <div className="page-toolbar-right">
          <div className="toolbar-search">
            <Search20Regular className="toolbar-search-icon" />
            <input
              type="text"
              placeholder="Search channels"
              className="toolbar-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="page-heading">
        <Link to="/channel-experiences" className="page-breadcrumb">Channels</Link>
        <h1>Voice channels</h1>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th><div className="th-inner">Channel Name <ArrowSort20Regular style={{width:12,height:12,color:'#605e5c'}} /></div></th>
              <th>Conversation profile</th>
              <th>Owner</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(channel => (
              <tr key={channel.id}>
                <td><Link to={`/voice-channels/${channel.id}`} className="table-link">{channel.name}</Link></td>
                <td>{channel.conversationProfile}</td>
                <td>{channel.owner}</td>
                <td>{channel.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoiceChannels;
