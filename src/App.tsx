import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home';
import { RealtimeQuality } from './components/RealtimeQualityNew';
import ChatChannels from './components/ChatChannels';
import VoiceChannels from './components/VoiceChannels';
import ChannelExperiences from './components/ChannelExperiences';
import ConversationProfiles from './components/ConversationProfiles';
import EngagementProfiles from './components/EngagementProfiles';
import Queues from './components/Queues';
import ChannelEdit from './components/ChannelEdit';
import VoiceChannelEdit from './components/VoiceChannelEdit';
import ConversationProfileEdit from './components/ConversationProfileEdit';
import EngagementProfileEdit from './components/EngagementProfileEdit';
import QueueEdit from './components/QueueEdit';
import { SuiteHeader, SideNavigation } from './components/shared/Layout';
import './App.css';

const EDIT_PATHS = [
  '/chat-channels/',
  '/voice-channels/',
  '/conversation-profiles/',
  '/engagement-profiles/',
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isEditPage = EDIT_PATHS.some(p => location.pathname.startsWith(p));

  if (isEditPage) {
    return (
      <div className="home-page">
        <SuiteHeader />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <SuiteHeader />
      <div className="main-container">
        <SideNavigation />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-time-coaching" element={<RealtimeQuality />} />
          <Route path="/chat-channels" element={<ChatChannels />} />
          <Route path="/chat-channels/:id" element={<ChannelEdit />} />
          <Route path="/voice-channels" element={<VoiceChannels />} />
          <Route path="/voice-channels/:id" element={<VoiceChannelEdit />} />
          <Route path="/channel-experiences" element={<ChannelExperiences />} />
          <Route path="/conversation-profiles" element={<ConversationProfiles />} />
          <Route path="/conversation-profiles/:id" element={<ConversationProfileEdit />} />
          <Route path="/engagement-profiles" element={<EngagementProfiles />} />
          <Route path="/engagement-profiles/:id" element={<EngagementProfileEdit />} />
          <Route path="/queues" element={<Queues />} />
          <Route path="/queues/:id" element={<QueueEdit />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
