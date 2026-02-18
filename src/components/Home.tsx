import React from 'react';
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
  Emoji20Regular,
  ErrorCircle20Regular,
  Warning20Regular,
  Info20Regular,
  ChevronRight20Regular
} from '@fluentui/react-icons';
import './Home.css';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="home-page">
      <SuiteHeader />

      <div className="main-container">
        <SideNavigation onNavigate={onNavigate} activePage="Home" />

        <div className="content-area">
          <div className="home-content">
            <h1 className="home-title">Welcome to the Copilot Service admin center</h1>

            <div className="home-grid">
              <div className="home-main-content">
                <div className="home-cards-row">
                  <div className="home-card">
                    <div className="home-card-illustration blue-illustration">
                      <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
                        {/* Main blue blob background */}
                        <ellipse cx="120" cy="110" rx="90" ry="45" fill="#4285F4" opacity="0.9"/>
                        <ellipse cx="120" cy="90" rx="95" ry="50" fill="#669DF6" opacity="0.8"/>

                        {/* Phone handset */}
                        <path d="M 50 75 Q 45 70 50 65 L 58 57 Q 63 52 68 57 L 72 61 Q 77 66 72 71 L 64 79 Q 59 84 54 79 Z" fill="#E8F0FE"/>
                        <path d="M 65 85 Q 70 80 75 85 L 95 105 Q 100 110 95 115 L 90 120 Q 85 125 80 120 L 60 100 Q 55 95 60 90 Z" fill="#E8F0FE"/>
                        <rect x="68" y="70" width="18" height="25" fill="#E8F0FE" transform="rotate(45 77 82)"/>

                        {/* Headset icon */}
                        <circle cx="120" cy="75" r="22" fill="#1967D2"/>
                        <path d="M 108 75 Q 108 65 120 65 Q 132 65 132 75" stroke="#E8F0FE" strokeWidth="3" fill="none"/>
                        <rect x="105" y="73" width="6" height="12" fill="#E8F0FE" rx="2"/>
                        <rect x="129" y="73" width="6" height="12" fill="#E8F0FE" rx="2"/>
                        <circle cx="120" cy="85" r="3" fill="#8AB4F8"/>

                        {/* Chat bubble with dots */}
                        <rect x="150" y="50" width="45" height="28" fill="#8AB4F8" rx="14"/>
                        <polygon points="165,78 170,85 175,78" fill="#8AB4F8"/>
                        <circle cx="163" cy="64" r="3" fill="#E8F0FE"/>
                        <circle cx="173" cy="64" r="3" fill="#E8F0FE"/>
                        <circle cx="183" cy="64" r="3" fill="#E8F0FE"/>

                        {/* Bar chart */}
                        <rect x="45" y="110" width="12" height="25" fill="#1967D2" rx="2"/>
                        <rect x="60" y="100" width="12" height="35" fill="#1967D2" rx="2"/>
                        <rect x="75" y="95" width="12" height="40" fill="#1967D2" rx="2"/>

                        {/* Sparkles */}
                        <circle cx="145" cy="40" r="3" fill="#AECBFA"/>
                        <path d="M 158 48 L 160 50 L 158 52 L 156 50 Z" fill="#E8F0FE"/>
                        <path d="M 188 45 L 191 48 L 188 51 L 185 48 Z" fill="#E8F0FE"/>
                        <circle cx="135" cy="100" r="2.5" fill="#AECBFA"/>

                        {/* Arrow up-right */}
                        <line x1="185" y1="90" x2="200" y2="75" stroke="#1967D2" strokeWidth="3" strokeLinecap="round"/>
                        <polyline points="195,80 200,75 205,80" fill="none" stroke="#1967D2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="home-card-title">Create your contact center</h2>
                    <p className="home-card-description">
                      We'll set up a simple contact center within minutes using defaults. You can make changes when it's ready.
                    </p>
                    <button className="home-card-button primary">Create</button>
                  </div>

                  <div className="home-card">
                    <div className="home-card-illustration blue-illustration">
                      <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
                        {/* Large blue dome/arch at top */}
                        <path d="M 60 80 Q 60 30 120 30 Q 180 30 180 80" fill="#669DF6"/>
                        <ellipse cx="120" cy="80" rx="60" ry="8" fill="#4285F4" opacity="0.5"/>

                        {/* Person icon at top */}
                        <circle cx="120" cy="45" r="8" fill="#E8F0FE"/>
                        <path d="M 112 60 Q 112 54 120 54 Q 128 54 128 60 L 126 70 L 114 70 Z" fill="#E8F0FE"/>
                        <circle cx="120" cy="42" r="2" fill="#1967D2"/>

                        {/* Presentation stand/easel */}
                        <line x1="100" y1="145" x2="120" y2="85" stroke="#1967D2" strokeWidth="3"/>
                        <line x1="140" y1="145" x2="120" y2="85" stroke="#1967D2" strokeWidth="3"/>
                        <rect x="85" y="142" width="70" height="3" fill="#1967D2" rx="1.5"/>

                        {/* Presentation board */}
                        <rect x="75" y="70" width="90" height="70" fill="#4285F4" rx="4"/>
                        <rect x="80" y="75" width="80" height="60" fill="#669DF6" rx="2"/>

                        {/* Charts on board - Bar chart */}
                        <rect x="88" y="105" width="8" height="20" fill="#E8F0FE" rx="1"/>
                        <rect x="98" y="95" width="8" height="30" fill="#E8F0FE" rx="1"/>
                        <rect x="108" y="100" width="8" height="25" fill="#E8F0FE" rx="1"/>

                        {/* Line chart */}
                        <polyline points="125,110 135,100 145,105 155,95" fill="none" stroke="#E8F0FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="125" cy="110" r="2.5" fill="#8AB4F8"/>
                        <circle cx="135" cy="100" r="2.5" fill="#8AB4F8"/>
                        <circle cx="145" cy="105" r="2.5" fill="#8AB4F8"/>
                        <circle cx="155" cy="95" r="2.5" fill="#8AB4F8"/>

                        {/* Document icon */}
                        <rect x="85" y="80" width="14" height="18" fill="#8AB4F8" rx="1"/>
                        <line x1="88" y1="85" x2="96" y2="85" stroke="#E8F0FE" strokeWidth="1.5"/>
                        <line x1="88" y1="89" x2="96" y2="89" stroke="#E8F0FE" strokeWidth="1.5"/>
                        <line x1="88" y1="93" x2="94" y2="93" stroke="#E8F0FE" strokeWidth="1.5"/>

                        {/* Checkmark circle */}
                        <circle cx="150" cy="83" r="7" fill="#8AB4F8"/>
                        <polyline points="147,83 149,85 153,81" fill="none" stroke="#E8F0FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

                        {/* Graph icon */}
                        <rect x="107" y="80" width="16" height="12" fill="#8AB4F8" rx="1"/>
                        <path d="M 109 88 L 112 84 L 115 86 L 118 83 L 121 85" fill="none" stroke="#E8F0FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="home-card-title">Agent hub</h2>
                    <p className="home-card-description">
                      Explore AI in Dynamics 365, streamline AI adoption, and monitor AI performance in real time to gain insights.
                    </p>
                    <button className="home-card-button primary">Open</button>
                  </div>
                </div>

                <div className="health-section">
                  <div className="health-header">
                    <div>
                      <h2 className="health-title">Contact center health</h2>
                      <p className="health-description">
                        Monitor your contact center setup for errors, warnings, and suggestions to improve operation.
                      </p>
                    </div>
                  </div>

                  <div className="health-summary">
                    <div className="health-stat">
                      <div className="health-stat-icon error">
                        <ErrorCircle20Regular />
                      </div>
                      <div className="health-stat-content">
                        <span className="health-stat-label">Errors</span>
                        <span className="health-stat-value">2</span>
                      </div>
                    </div>

                    <div className="health-stat">
                      <div className="health-stat-icon warning">
                        <Warning20Regular />
                      </div>
                      <div className="health-stat-content">
                        <span className="health-stat-label">Warnings</span>
                        <span className="health-stat-value">0</span>
                      </div>
                    </div>

                    <div className="health-stat">
                      <div className="health-stat-icon info">
                        <Info20Regular />
                      </div>
                      <div className="health-stat-content">
                        <span className="health-stat-label">Suggestions</span>
                        <span className="health-stat-value">0</span>
                      </div>
                    </div>

                    <div className="health-actions">
                      <button className="health-check-button">Run health check</button>
                      <span className="health-last-run">Last run: 2/6/2026, 8:01:04 AM</span>
                    </div>
                  </div>

                  <div className="health-tabs">
                    <button className="health-tab active">Errors (2)</button>
                    <button className="health-tab">Warnings (0)</button>
                    <button className="health-tab">Suggestions (0)</button>
                  </div>

                  <div className="health-items">
                    <div className="health-item">
                      <ChevronRight20Regular className="health-item-icon" />
                      <span className="health-item-text">Workstream has no intake rules</span>
                      <span className="health-item-count">(2 occurrences)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="home-sidebar">
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Other admin apps</h3>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Power Platform admin center</h4>
                    <p className="sidebar-link-description">
                      Create and manage environments and manage the tenant level user management and security.
                    </p>
                  </a>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Power Apps</h4>
                    <p className="sidebar-link-description">
                      You can customize your tables, forms, dashboards etc.
                    </p>
                  </a>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Copilot Studio</h4>
                    <p className="sidebar-link-description">
                      Manage your AI agents from a list, move between environments, and try out the unified AI agent-building studio.
                    </p>
                  </a>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Microsoft 365 admin center</h4>
                    <p className="sidebar-link-description">
                      Tenant admin can add users and manage office productivity here.
                    </p>
                  </a>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Microsoft Entra ID</h4>
                    <p className="sidebar-link-description">
                      Tenant admin can bulk manage users and security roles here.
                    </p>
                  </a>

                  <a href="#" className="sidebar-link-card">
                    <h4 className="sidebar-link-title">Telemetry insights (preview)</h4>
                    <p className="sidebar-link-description">
                      Get performance optimization opportunities and actionable guidance based on usage patterns in environments.
                    </p>
                  </a>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Quick Links</h3>
                  <div className="quick-links">
                    <a href="#" className="quick-link">Documentation</a>
                    <a href="#" className="quick-link">Community forums</a>
                    <a href="#" className="quick-link">Support</a>
                    <a href="#" className="quick-link">What's new</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const SuiteHeader: React.FC = () => (
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

interface SideNavigationProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ onNavigate, activePage }) => {
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

  const handleClick = (item: string) => {
    if (item === 'Home' || item === 'Real-time coaching') {
      onNavigate(item);
    }
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
              className={`nav-item ${item === activePage ? 'active' : ''} ${item === 'Home' || item === 'Real-time coaching' ? 'clickable' : ''}`}
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

export default Home;
