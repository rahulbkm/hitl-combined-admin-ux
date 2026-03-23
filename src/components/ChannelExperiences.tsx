import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import './Pages.css';

interface ExperienceItem {
  title: string;
  description: string;
  link: string;
}

interface Section {
  title: string;
  items: ExperienceItem[];
}

const sections: Section[] = [
  {
    title: 'Channels',
    items: [
      {
        title: 'Chat channels',
        description: 'Configure and manage your live chat channels. Set up chat widgets, customize the appearance, and connect them to conversation profiles for seamless customer interactions.',
        link: '/chat-channels'
      },
      {
        title: 'Voice channels',
        description: 'Set up and manage voice channels with phone number configuration, language settings, recording options, and conversation profiles for inbound and outbound calls.',
        link: '/voice-channels'
      }
    ]
  },
  {
    title: 'Channel experiences',
    items: [
      {
        title: 'Conversation profiles',
        description: 'Design and manage the flow of conversations across your channels. Define automated responses, routing logic, and customer journey paths to create seamless and consistent support experiences.',
        link: '/conversation-profiles'
      },
      {
        title: 'Engagement profiles',
        description: 'Configure how customers engage with your support channels. Set up personalized greetings, response behaviors, escalation rules, and interaction patterns to optimize customer satisfaction and agent efficiency.',
        link: '/engagement-profiles'
      }
    ]
  }
];

const CollapsibleSection: React.FC<{ section: Section }> = ({ section }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="collapsible-section">
      <button className="collapsible-header" onClick={() => setExpanded(!expanded)}>
        <ChevronDown20Regular className={`collapsible-chevron ${expanded ? 'expanded' : ''}`} />
        {section.title}
      </button>
      {expanded && (
        <div className="collapsible-content">
          {section.items.map(item => (
            <div key={item.title} className="experience-item">
              <div className="experience-info">
                <h3 className="experience-title">{item.title}</h3>
                <p className="experience-description">{item.description}</p>
                <a href="#" className="learn-more-link">Learn more</a>
              </div>
              <Link to={item.link} className="manage-btn">
                Manage
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChannelExperiences: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="page-heading">
        <h1>Channel experiences</h1>
        <p>Define and manage how customers interact with your support channels through customized conversation profiles and engagement profiles.</p>
      </div>

      {sections.map(section => (
        <CollapsibleSection key={section.title} section={section} />
      ))}
    </div>
  );
};

export default ChannelExperiences;
