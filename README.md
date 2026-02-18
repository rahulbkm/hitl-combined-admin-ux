# Dynamics 365 Customer Service - Realtime Quality UI

This is a React + TypeScript implementation of the Dynamics 365 Customer Service admin center's "Realtime conversation quality" interface, recreated from Figma designs.

## Features

- **Full Suite Header**: Includes Dynamics 365 branding, navigation menu, and action buttons
- **Side Navigation**: Hierarchical menu with sections for Customer Support, Agent Experience, and Operations
- **Command Bar**: Action buttons for creating quality evaluation criteria and compliance checks
- **Page Header**: Breadcrumb navigation, page title with AI Copilot badge, and informational banner
- **Tabs**: Switch between Conversation Quality, Adherence, and Predicted CSAT views
- **Quality Evaluation Cards**: Expandable cards with toggle switches for:
  - Conversation effectiveness
  - Conversation flow & other criteria
- **Compliance Table**: Interactive table for managing compliance rules with toggle switches
- **Responsive Design**: Adapts to different screen sizes with proper overflow handling

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS3** - Styling (no external CSS frameworks)
- **Fluent UI Design System** - Design language and components

## Project Structure

```
hitl-combined-admin-ux/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── RealtimeQuality.tsx    # Main component
│   │   └── RealtimeQuality.css    # Component styles
│   ├── App.tsx                     # Root component
│   ├── App.css                     # Global app styles
│   ├── index.tsx                   # Entry point
│   └── index.css                   # Base styles
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Component Architecture

### Main Component: `RealtimeQuality`

The main component manages state for:
- Active tab selection
- Quality evaluation sections (enabled/disabled state)
- Compliance rules (enabled/disabled state)

### Sub-components:

- **SuiteHeader**: Top navigation bar with Dynamics 365 branding
- **SideNavigation**: Left sidebar with hierarchical menu items
- **CommandBar**: Action buttons bar below the header
- **Breadcrumb**: Navigation breadcrumb trail
- **InfoBanner**: Information message with icon
- **Tabs**: Tab navigation for different views
- **QualityCard**: Reusable card for quality evaluation sections
- **ComplianceTable**: Table component for compliance rules
- **ToggleSwitch**: Reusable toggle switch component

## State Management

The component uses React hooks (`useState`) for local state management:

```typescript
// Quality sections with criteria
const [qualitySections, setQualitySections] = useState<QualitySection[]>([...]);

// Compliance rules
const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([...]);

// Active tab
const [activeTab, setActiveTab] = useState('conversation-quality');
```

## Styling Approach

The component uses vanilla CSS with:
- **CSS Variables**: For consistent design tokens (colors, spacing)
- **BEM-like naming**: Clear, maintainable class names
- **Fluent Design System**: Colors and spacing match Microsoft's design language
- **Responsive Design**: Media queries for smaller screens
- **Custom Scrollbars**: Styled scrollbars for better UX

### Key Colors:

- **Primary Blue**: `#0078d4` (buttons, links, active states)
- **Dark Background**: `#0a1529` (suite header)
- **Light Background**: `#f3f2f1` (page background)
- **White**: `#ffffff` (cards, content areas)
- **Text Colors**: `#242424`, `#323130`, `#616161` (hierarchy)

## Customization

### Adding New Quality Sections:

```typescript
const newSection: QualitySection = {
  id: 'new-section',
  title: 'Section Title',
  description: 'Section description...',
  enabled: true,
  criteria: [
    { name: 'Criterion 1' },
    { name: 'Criterion 2' }
  ]
};

setQualitySections([...qualitySections, newSection]);
```

### Adding New Compliance Rules:

```typescript
const newRule: ComplianceRule = {
  name: 'New Rule',
  description: 'Rule description...',
  enabled: true,
  conditions: 'Workstream, Queue'
};

setComplianceRules([...complianceRules, newRule]);
```

## Accessibility

- Semantic HTML elements (`<nav>`, `<button>`, `<table>`)
- ARIA attributes for interactive elements
- Keyboard navigation support
- Focus indicators for interactive elements
- Screen reader friendly labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Fidelity

This implementation closely matches the Figma design with:
- ✅ Exact color values from Fluent UI design tokens
- ✅ Proper spacing and typography
- ✅ Interactive states (hover, active, focus)
- ✅ Toggle switches with smooth transitions
- ✅ Shadow and border styles
- ✅ Icon placeholders (can be replaced with Fluent UI Icons)

## Future Enhancements

- [ ] Add Fluent UI React Icons library
- [ ] Implement data persistence
- [ ] Add API integration
- [ ] Implement form validation
- [ ] Add keyboard shortcuts
- [ ] Implement drag-and-drop for criteria reordering
- [ ] Add export functionality
- [ ] Implement search/filter for tables

## License

This is a mockup/prototype implementation for demonstration purposes.

## Credits

Design recreated from Figma using the Figma MCP server integration with Claude Code.
