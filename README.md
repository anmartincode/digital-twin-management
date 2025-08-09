# Digital Twin Management System

A comprehensive facility management platform integrating Building Information Modeling (BIM), IoT devices, and real-time analytics for smart building management.

## Features

### 🎨 **Enhanced Dark Mode with P3 Color Support**
- **Three Theme Modes**: Light, Dark, and Auto (follows system preference)
- **Display P3 Color Space**: Enhanced color reproduction on compatible displays
- **Smooth Transitions**: Seamless theme switching with visual feedback
- **Persistent Settings**: Theme preferences saved across sessions
- **System Integration**: Auto mode respects system dark/light mode changes

### 🏢 **Facility Management**
- Interactive 3D BIM viewer
- Real-time facility mapping
- Asset tracking and management
- Maintenance scheduling

### 📊 **Analytics & Monitoring**
- Real-time IoT device monitoring
- Energy consumption analytics
- Occupancy tracking
- Performance dashboards

### 👥 **Project Management**
- Company and people management
- Project tracking
- Report generation
- Settings and configuration

## Dark Mode Implementation

The dark mode functionality includes:

1. **ThemeContext**: Centralized theme management with three modes
2. **P3 Color Palette**: Enhanced colors using Display P3 color space for supported devices
3. **Visual Feedback**: Theme preview section in Settings page
4. **Accessibility**: Proper contrast ratios and smooth transitions

### Theme Options
- **Light Mode**: Clean, bright interface optimized for daylight use
- **Dark Mode**: Easy on the eyes with rich P3 colors for low-light environments  
- **Auto Mode**: Automatically switches based on system preference

### P3 Color Benefits
- Wider color gamut for more vibrant colors
- Better color accuracy on modern displays
- Enhanced visual experience on compatible devices
- Fallback to standard colors on older displays

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern browser with P3 color support (recommended)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd digital-twin-management
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend (if applicable)
cd ../backend
npm install
```

3. Start the development server
```bash
# Frontend
cd frontend
npm start
```

### Testing Dark Mode

1. Navigate to the Settings page
2. Use the Theme dropdown to switch between Light, Dark, and Auto modes
3. Observe the theme preview section showing current mode and color palette
4. On supported devices, enjoy enhanced P3 colors in dark mode

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with P3 color support
- **Headless UI** for accessible components
- **Material UI Icons** for consistent iconography
- **React Three Fiber** for 3D BIM visualization

### Styling
- **Display P3 Colors**: Enhanced color reproduction
- **Dark Mode**: Class-based implementation
- **Responsive Design**: Mobile-first approach
- **Smooth Transitions**: CSS transitions for theme switching

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts (Theme, etc.)
│   ├── pages/              # Page components
│   │   └── Settings/       # Settings page with theme controls
│   └── styles/             # Global styles and Tailwind config
├── tailwind.config.js      # P3 colors and theme configuration
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test dark mode functionality
5. Submit a pull request

## Browser Support

- **P3 Colors**: Safari 10+, Chrome 62+, Firefox 113+
- **Dark Mode**: All modern browsers
- **Fallback**: Standard sRGB colors on older browsers