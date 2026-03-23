import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Add20Regular, ArrowClockwise20Regular, Search20Regular, ArrowSort20Regular } from '@fluentui/react-icons';
import './Pages.css';

interface EngagementProfileData {
  id: string;
  name: string;
  description: string;
  owner: string;
  createdOn: string;
  status: string;
}

const engagementProfilesData: EngagementProfileData[] = [
  { id: 'profile1', name: 'Standard Support Profile', description: 'Default engagement profile for general customer support interactions', owner: 'Aurora365 User6', createdOn: '8/10/2025 10:00 AM', status: 'Active' },
  { id: 'profile2', name: 'VIP Customer Profile', description: 'Premium engagement experience for VIP customers with priority handling', owner: 'Aurora365 User6', createdOn: '8/12/2025 2:30 PM', status: 'Active' },
  { id: 'profile3', name: 'Technical Support Profile', description: 'Specialized profile for technical support with skill-based routing', owner: 'Aurora365 User6', createdOn: '8/15/2025 9:15 AM', status: 'Active' },
  { id: 'profile4', name: 'Sales Team Profile', description: 'Engagement profile optimized for sales interactions and lead conversion', owner: 'Aurora365 User6', createdOn: '8/18/2025 11:45 AM', status: 'Active' },
  { id: 'profile5', name: 'After-Hours Profile', description: 'Limited engagement profile for after-hours support coverage', owner: 'Aurora365 User6', createdOn: '8/20/2025 4:20 PM', status: 'Active' },
  { id: 'profile6', name: 'Billing Support Profile', description: 'Engagement profile for billing and payment inquiries', owner: 'Aurora365 User6', createdOn: '8/25/2025 1:00 PM', status: 'Active' }
];

const EngagementProfiles: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = engagementProfilesData.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button className="toolbar-btn"><Add20Regular /> Add engagement profile</button>
          <button className="toolbar-btn"><ArrowClockwise20Regular /> Refresh</button>
        </div>
        <div className="page-toolbar-right">
          <div className="toolbar-search">
            <Search20Regular className="toolbar-search-icon" />
            <input
              type="text"
              placeholder="Search engagement profiles"
              className="toolbar-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="page-heading">
        <Link to="/channel-experiences" className="page-breadcrumb">Channel experiences</Link>
        <h1>Engagement profiles</h1>
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
                <td><Link to={`/engagement-profiles/${profile.id}`} className="table-link">{profile.name}</Link></td>
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

export default EngagementProfiles;
