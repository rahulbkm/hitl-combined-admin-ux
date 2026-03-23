import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Add20Regular,
  ArrowClockwise20Regular,
  Search20Regular,
  ArrowSort20Regular
} from '@fluentui/react-icons';
import './Pages.css';

interface ChannelData {
  id: string;
  name: string;
  channelProfile: string;
  routingProfile: string;
  owner: string;
  createdOn: string;
}

const channelsData: ChannelData[] = [
  { id: '1', name: 'Contact center chat channel', channelProfile: 'Default Chat Profile', routingProfile: 'Standard Routing', owner: 'Aurora365 User6', createdOn: '9/10/2025 1:30 PM' },
  { id: '2', name: 'swatichat2', channelProfile: 'Custom Profile', routingProfile: 'Priority Routing', owner: 'Aurora365 User6', createdOn: '8/14/2025 4:44 PM' },
  { id: '3', name: 'QEA Chat Channel', channelProfile: 'QEA Profile', routingProfile: 'Test Routing', owner: 'Aurora365 User6', createdOn: '8/19/2025 6:28 PM' },
  { id: '4', name: 'swatiIntentTest', channelProfile: 'Intent Profile', routingProfile: 'Smart Routing', owner: 'Aurora365 User6', createdOn: '8/1/2025 12:32 PM' },
  { id: '5', name: 'TestChat', channelProfile: 'Test Profile', routingProfile: 'Standard Routing', owner: 'Aurora365 User6', createdOn: '8/5/2025 1:32 PM' },
  { id: '6', name: 'chat101', channelProfile: 'Basic Profile', routingProfile: 'Round Robin', owner: 'Aurora365 User6', createdOn: '8/7/2025 5:00 PM' },
  { id: '7', name: 'Chat Channel', channelProfile: 'Default Chat Profile', routingProfile: 'Standard Routing', owner: 'Aurora365 User6', createdOn: '1/22/2025 12:23 AM' },
  { id: '8', name: 'Copilot-Deflection', channelProfile: 'Copilot Profile', routingProfile: 'AI Routing', owner: 'Aurora365 User6', createdOn: '10/10/2025 1:59 AM' },
  { id: '9', name: 'CIA-M-Deflection', channelProfile: 'CIA Profile', routingProfile: 'Advanced Routing', owner: 'Aurora365 User6', createdOn: '10/10/2025 1:01 AM' },
  { id: '10', name: 'CIA-M-PN-LetsChat', channelProfile: 'PN Profile', routingProfile: 'Priority Routing', owner: 'Aurora365 User6', createdOn: '11/19/2025 11:19 AM' },
  { id: '11', name: 'ClemChat', channelProfile: 'Clem Profile', routingProfile: 'Standard Routing', owner: 'Aurora365 User6', createdOn: '11/27/2025 3:20 AM' }
];

const ChatChannels: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = channelsData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button className="toolbar-btn"><Add20Regular /> Add chat channel</button>
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
        <h1>Chat channels</h1>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th><div className="th-inner">Channel Name <ArrowSort20Regular style={{width:12,height:12,color:'#605e5c'}} /></div></th>
              <th>Channel profile</th>
              <th>Routing profile</th>
              <th>Owner</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(channel => (
              <tr key={channel.id}>
                <td><Link to={`/chat-channels/${channel.id}`} className="table-link">{channel.name}</Link></td>
                <td>{channel.channelProfile}</td>
                <td>{channel.routingProfile}</td>
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

export default ChatChannels;
