import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Add20Regular, ArrowClockwise20Regular, Search20Regular, ArrowSort20Regular } from '@fluentui/react-icons';
import './Pages.css';

interface QueueData {
  id: string;
  name: string;
  queuePriority: number;
  type: 'Voice' | 'Chat' | 'Record';
  owner: string;
  createdOn: string;
}

const queuesData: QueueData[] = [
  { id: 'q1', name: 'General Support Queue', queuePriority: 50, type: 'Voice', owner: 'Aurora365 User6', createdOn: '8/5/2025 9:00 AM' },
  { id: 'q2', name: 'VIP Support Queue', queuePriority: 100, type: 'Voice', owner: 'Aurora365 User6', createdOn: '8/10/2025 10:30 AM' },
  { id: 'q3', name: 'Technical Support Queue', queuePriority: 75, type: 'Voice', owner: 'Aurora365 User6', createdOn: '8/12/2025 2:15 PM' },
  { id: 'q4', name: 'Sales Queue', queuePriority: 80, type: 'Voice', owner: 'Aurora365 User6', createdOn: '8/15/2025 11:00 AM' },
  { id: 'q5', name: 'Billing Queue', queuePriority: 60, type: 'Voice', owner: 'Aurora365 User6', createdOn: '8/18/2025 3:45 PM' },
  { id: 'q6', name: 'Chat Support Queue', queuePriority: 50, type: 'Chat', owner: 'Aurora365 User6', createdOn: '8/20/2025 9:30 AM' },
  { id: 'q7', name: 'Live Chat Queue', queuePriority: 70, type: 'Chat', owner: 'Aurora365 User6', createdOn: '8/22/2025 1:00 PM' },
  { id: 'q8', name: 'Case Management Queue', queuePriority: 40, type: 'Record', owner: 'Aurora365 User6', createdOn: '8/25/2025 10:15 AM' },
  { id: 'q9', name: 'Emergency Queue', queuePriority: 100, type: 'Voice', owner: 'Aurora365 User6', createdOn: '9/1/2025 8:00 AM' },
  { id: 'q10', name: 'After Hours Queue', queuePriority: 30, type: 'Voice', owner: 'Aurora365 User6', createdOn: '9/5/2025 4:30 PM' },
  { id: 'q11', name: 'Social Media Queue', queuePriority: 55, type: 'Chat', owner: 'Aurora365 User6', createdOn: '9/8/2025 11:45 AM' },
  { id: 'q12', name: 'Email Support Queue', queuePriority: 45, type: 'Record', owner: 'Aurora365 User6', createdOn: '9/10/2025 2:00 PM' }
];

const Queues: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = queuesData.filter(q => q.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button className="toolbar-btn"><Add20Regular /> Add queue</button>
          <button className="toolbar-btn"><ArrowClockwise20Regular /> Refresh</button>
        </div>
        <div className="page-toolbar-right">
          <div className="toolbar-search">
            <Search20Regular className="toolbar-search-icon" />
            <input
              type="text"
              placeholder="Search queues"
              className="toolbar-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="page-heading">
        <h1>Queues</h1>
        <p>Manage queues for distributing work items to agents. Queues organize and prioritize incoming customer requests across different channels.</p>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th><div className="th-inner">Name <ArrowSort20Regular style={{width:12,height:12,color:'#605e5c'}} /></div></th>
              <th><div className="th-inner">Queue priority <ArrowSort20Regular style={{width:12,height:12,color:'#605e5c'}} /></div></th>
              <th>Type</th>
              <th>Owner</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(queue => (
              <tr key={queue.id}>
                <td><Link to={`/queues/${queue.id}`} className="table-link">{queue.name}</Link></td>
                <td>{queue.queuePriority}</td>
                <td>{queue.type}</td>
                <td>{queue.owner}</td>
                <td>{queue.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Queues;
