# Digital Twin Management - Facility Management Integration

A comprehensive Facility Management Integration application that bridges BIM models with IoT integration for digital twin management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Docker & Docker Compose
- Git

### One-Command Setup
```bash
# Clone the repository
git clone <repository-url>
cd digital-twin-management

# Run the setup script
./scripts/manage.sh setup
```

### Manual Setup
1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Setup environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development environment**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
digital-twin-management/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Utility functions
│   ├── python/             # Python services
│   │   ├── bim_processor/  # BIM file processing
│   │   ├── iot_handler/    # IoT data handling
│   │   └── celery_tasks/   # Background tasks
│   └── package.json
├── database/               # Database schemas and migrations
├── docs/                   # Documentation
├── scripts/                # Management scripts
├── docker-compose.yml      # Docker configuration
└── package.json            # Root package.json
```

## 🛠️ Development Commands

### Using the Management Script
```bash
# Setup the entire project
./scripts/manage.sh setup

# Start development environment
./scripts/manage.sh dev

# Run tests
./scripts/manage.sh test

# Run linting
./scripts/manage.sh lint

# Format code
./scripts/manage.sh format

# Build project
./scripts/manage.sh build

# Clean project
./scripts/manage.sh clean

# Show project status
./scripts/manage.sh status
```

### Using npm Scripts
```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Testing
npm run test             # Run all tests
npm run test:frontend    # Run frontend tests
npm run test:backend     # Run backend tests

# Code Quality
npm run lint             # Run linting
npm run format           # Format code

# Building
npm run build            # Build both frontend and backend
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend

# Docker
npm run docker:build     # Build Docker images
npm run docker:up        # Start containers
npm run docker:down      # Stop containers
npm run docker:logs      # View logs
```

## 🏗️ Architecture Overview

### Frontend Stack
- **React.js** with TypeScript for the main application
- **React Three Fiber** for 3D BIM model visualization
- **Tailwind CSS** for responsive UI design
- **D3.js** for data visualizations and dashboards
- **Socket.io-client** for real-time IoT data updates
- **Mapbox GL JS** for facility mapping and floor plans

### Backend Stack
- **Node.js** with Express.js for RESTful APIs
- **WebSocket** for Python real-time data streaming
- **MQTT client** for IoT device communication
- **Celery** for Python background job processing
- **IfcOpenShell** for Python BIM file processing

### Database Stack
- **PostgreSQL** with PostGIS extension for spatial data
- **TimescaleDB** for time series IoT data
- **MongoDB** for document storage

## 🔧 Features

### BIM Integration
- IFC file upload and processing
- 3D model visualization with React Three Fiber
- Building element extraction and classification
- Spatial data management with PostGIS

### IoT Integration
- Real-time sensor data collection via MQTT
- Device management and monitoring
- Time-series data storage with TimescaleDB
- Real-time dashboards and alerts

### Facility Management
- Interactive floor plans with Mapbox
- Asset tracking and maintenance scheduling
- Energy consumption monitoring
- Space utilization analytics

### Data Visualization
- Real-time dashboards with D3.js
- Performance metrics and KPIs
- Historical data analysis
- Custom chart configurations

## 📊 API Documentation

The API documentation is available at `/api/docs` when the backend is running.

## 🐳 Docker Setup

### Development Environment
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production environment
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                 # Run tests in watch mode
npm test -- --coverage   # Run tests with coverage
```

### Backend Testing
```bash
cd backend
npm test                 # Run tests
npm run test:coverage    # Run tests with coverage
```

## 📝 Code Quality

### Linting
```bash
npm run lint             # Check code style
npm run lint:fix         # Fix auto-fixable issues
```

### Formatting
```bash
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
```

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Environment variable management

## 📈 Performance

- Code splitting and lazy loading
- Image optimization
- Database query optimization
- Caching strategies
- Real-time performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run linting and tests (`npm run lint && npm run test`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) directory
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.