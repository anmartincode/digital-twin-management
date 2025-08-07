# Digital Twin Management - Facility Management Integration

A comprehensive Facility Management Integration application that bridges BIM models with IoT integration for digital twin management.

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- MongoDB 6+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-twin-management
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   npm install
   ```

4. **Setup Databases**
   ```bash
   # PostgreSQL with PostGIS
   docker run --name postgres-postgis -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgis/postgis:15-3.3
   
   # MongoDB
   docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -d mongo:6
   
   # TimescaleDB
   docker run --name timescaledb -e POSTGRES_PASSWORD=password -p 5433:5432 -d timescale/timescaledb:latest-pg14
   ```

5. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start the Application**
   ```bash
   # Start backend services
   cd backend
   npm run dev
   
   # Start frontend
   cd frontend
   npm start
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
└── docker-compose.yml      # Docker configuration
```

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.