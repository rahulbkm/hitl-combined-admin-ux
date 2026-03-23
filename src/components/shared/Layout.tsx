import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Navigation20Regular,
  Home20Regular,
  Search20Regular,
  Rocket20Regular,
  Headset20Regular,
  People20Regular,
  Bot20Regular,
  ChannelShare20Regular,
  DocumentQueue20Regular,
  Directions20Regular,
  Stream20Regular,
  Wrench20Regular,
  PersonSettings20Regular,
  Circle20Regular,
  Pulse20Regular,
  TabDesktopMultiple20Regular,
  TargetEdit20Regular,
  Lightbulb20Regular,
  Molecule20Regular,
  LightbulbFilament20Regular,
  Calendar20Regular,
  Settings20Regular,
  Add20Regular,
  GridDots20Regular,
  QuestionCircle20Regular,
  ChatMultiple20Regular,
  Emoji20Regular
} from '@fluentui/react-icons';

// Route map: sidebar item name → route path
const ROUTE_MAP: { [key: string]: string } = {
  'Home': '/',
  'Real-time coaching': '/real-time-coaching',
  'Channels': '/channel-experiences',
  'Queues': '/queues',
};

export const SuiteHeader: React.FC = () => (
  <div className="suite-header">
    <div className="suite-header-left">
      <button className="menu-button" aria-label="Menu">
        <GridDots20Regular />
      </button>
      <div className="app-title">
        <span className="app-name">Dynamics 365</span>
        <span className="divider">|</span>
        <span className="app-subtitle">Customer Service admin center</span>
      </div>
    </div>
    <div className="suite-header-right">
      <button className="icon-button" aria-label="Notifications">
        <Circle20Regular />
      </button>
      <button className="icon-button" aria-label="Add">
        <Add20Regular />
      </button>
      <button className="icon-button" aria-label="Settings">
        <Settings20Regular />
      </button>
      <button className="icon-button" aria-label="Help">
        <QuestionCircle20Regular />
      </button>
      <button className="icon-button" aria-label="Messages">
        <ChatMultiple20Regular />
      </button>
      <button className="icon-button" aria-label="Emoji">
        <Emoji20Regular />
      </button>
      <button className="avatar-button">
        <div className="avatar" />
      </button>
    </div>
  </div>
);

export const SideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIcon = (item: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Home': <Home20Regular />,
      'Search admin settings': <Search20Regular />,
      'Guided channel setups': <Rocket20Regular />,
      'Overview': <Headset20Regular />,
      'User management': <People20Regular />,
      'Bots': <Bot20Regular />,
      'Channels': <ChannelShare20Regular />,
      'Queues': <DocumentQueue20Regular />,
      'Routing': <Directions20Regular />,
      'Workstreams': <Stream20Regular />,
      'Case settings': <Wrench20Regular />,
      'Customer settings': <PersonSettings20Regular />,
      'Quality management': <Circle20Regular />,
      'Real-time coaching': <Pulse20Regular />,
      'Workspaces': <TabDesktopMultiple20Regular />,
      'Productivity': <TargetEdit20Regular />,
      'Knowledge': <Lightbulb20Regular />,
      'Collaboration': <Molecule20Regular />,
      'Insights': <LightbulbFilament20Regular />,
      'Calendar': <Calendar20Regular />,
      'Service scheduling': <Circle20Regular />,
      'Miscellaneous': <Settings20Regular />
    };
    return iconMap[item] || <Circle20Regular />;
  };

  const menuItems = [
    { section: 'Get started', items: ['Home', 'Search admin settings', 'Guided channel setups'] },
    { section: 'Customer Support', items: ['Overview', 'User management', 'Bots', 'Channels', 'Queues', 'Routing', 'Workstreams', 'Case settings', 'Customer settings', 'Quality management', 'Real-time coaching'] },
    { section: 'Agent experience', items: ['Overview', 'Workspaces', 'Productivity', 'Knowledge', 'Collaboration'] },
    { section: 'Operations', items: ['Overview', 'Insights', 'Calendar', 'Service scheduling', 'Miscellaneous'] }
  ];

  const isActive = (item: string): boolean => {
    const route = ROUTE_MAP[item];
    if (!route) return false;
    if (route === '/') return location.pathname === '/';
    if (route === '/channel-experiences') {
      return location.pathname.startsWith('/channel-experiences') ||
        location.pathname.startsWith('/chat-channels') ||
        location.pathname.startsWith('/voice-channels');
    }
    return location.pathname.startsWith(route);
  };

  const isClickable = (item: string): boolean => !!ROUTE_MAP[item];

  const handleClick = (item: string) => {
    const route = ROUTE_MAP[item];
    if (route) navigate(route);
  };

  return (
    <nav className="side-nav">
      <button className="nav-hamburger">
        <Navigation20Regular />
      </button>
      {menuItems.map((group, idx) => (
        <div key={idx} className="nav-group">
          <div className="nav-section-header">{group.section}</div>
          {group.items.map((item) => (
            <div
              key={item}
              className={`nav-item ${isActive(item) ? 'active' : ''} ${isClickable(item) ? 'clickable' : ''}`}
              onClick={() => handleClick(item)}
            >
              <span className="nav-icon">{getIcon(item)}</span>
              <span className="nav-label">{item}</span>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};
