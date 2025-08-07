# Digital Twin Management System - Access Information

## 🚀 System Status: RUNNING

All services are now successfully running and accessible.

## 📋 Service Access URLs

### Main Application
- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api/docs
- **Health Check**: http://localhost:5001/health

### Monitoring & Observability
- **Grafana Dashboard**: http://localhost:3001
  - Username: `admin`
  - Password: `admin`
- **Prometheus**: http://localhost:9090

### Database Services
- **PostgreSQL (PostGIS)**: localhost:5432
  - Database: `digital_twin`
  - Username: `postgres`
  - Password: `password`
- **TimescaleDB**: localhost:5433
  - Database: `timeseries`
  - Username: `postgres`
  - Password: `password`
- **MongoDB**: localhost:27017
  - Database: `digital_twin`
  - Username: `admin`
  - Password: `password`

### Message Queuing & Caching
- **Redis**: localhost:6379
- **MQTT Broker**: localhost:1883

### Reverse Proxy
- **Nginx**: http://localhost:80 (HTTP)
- **Nginx**: https://localhost:443 (HTTPS)

## 🔧 Environment Configuration

The system is configured with the following environment variables:

### Application Settings
- **NODE_ENV**: development
- **PORT**: 5001 (backend)
- **FRONTEND_URL**: http://localhost:3000

### Database Connections
- **POSTGRES_HOST**: postgres (Docker service name)
- **TIMESCALE_HOST**: timescaledb (Docker service name)
- **MONGODB_URI**: mongodb://admin:password@mongodb:27017/digital_twin?authSource=admin
- **REDIS_URL**: redis://redis:6379

### MQTT Configuration
- **MQTT_HOST**: mqtt (Docker service name)
- **MQTT_PORT**: 1883

### Celery Configuration
- **CELERY_BROKER_URL**: redis://redis:6379/0
- **CELERY_RESULT_BACKEND**: redis://redis:6379/0

## 📊 Monitoring Dashboards

### Grafana Dashboards Available
1. **Digital Twin System Overview** - Main system health and performance metrics
2. **System Health** - Service status indicators
3. **Active Connections** - HTTP request rates
4. **Database Performance** - PostgreSQL and TimescaleDB metrics
5. **Redis Memory Usage** - Cache performance
6. **MQTT Messages** - IoT data flow
7. **System Resources** - CPU and memory usage

### Prometheus Targets
- digital-twin-backend:5000
- digital-twin-frontend:3000
- digital-twin-python:8000
- postgres:5432
- mongodb:27017
- redis:6379
- mqtt:1883

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### BIM Management
- `POST /api/bim/upload` - Upload BIM files
- `GET /api/bim/models` - Get BIM models

### IoT & Sensors
- `GET /api/iot/devices` - Get IoT devices
- `GET /api/iot/sensors` - Get sensor data

### Facility Management
- `GET /api/facility` - Get facility information

### Asset Management
- `GET /api/assets` - Get asset information

### Maintenance
- `GET /api/maintenance` - Get maintenance data

### Energy Management
- `GET /api/energy` - Get energy consumption data

### Analytics
- `GET /api/analytics` - Get analytics data

## 🛠️ Development Tools

### Celery Tasks
- **Celery Worker**: Running background tasks
- **Celery Beat**: Scheduled task execution

### File Upload
- **Upload Path**: ./uploads
- **Max File Size**: 100MB
- **Allowed Types**: ifc, json, gltf, glb

## 🔒 Security Notes

### Current Configuration (Development)
- JWT Secret: `your-super-secret-jwt-key-change-this-in-production`
- CORS Origin: http://localhost:3000
- Rate Limiting: 100 requests per 15 minutes per IP

### Production Recommendations
1. Change JWT secret to a strong, unique value
2. Configure proper SSL certificates
3. Set up proper authentication and authorization
4. Configure secure database passwords
5. Enable proper logging and monitoring
6. Set up backup strategies

## 🚨 Troubleshooting

### Common Issues
1. **Port Conflicts**: If port 5000 is in use, the system automatically uses port 5001
2. **Service Restarts**: Use `docker-compose restart [service-name]` to restart individual services
3. **Logs**: Use `docker-compose logs [service-name]` to view service logs
4. **Database Connections**: Ensure all database services are healthy before starting the application

### Health Checks
- Backend: `curl http://localhost:5001/health`
- Frontend: `curl http://localhost:3000`
- Prometheus: `curl http://localhost:9090/api/v1/status/config`
- Grafana: `curl http://localhost:3001/api/health`

## 📈 Next Steps

1. **Access Grafana**: Navigate to http://localhost:3001 and log in with admin/admin
2. **Import Dashboards**: The Digital Twin System Overview dashboard should be automatically available
3. **Configure Data Sources**: Prometheus datasource is pre-configured
4. **Upload BIM Files**: Use the frontend interface to upload and process BIM models
5. **Connect IoT Devices**: Configure MQTT connections for real-time sensor data
6. **Set up Alerts**: Configure monitoring alerts in Grafana

## 🎯 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Python        │
│   (React)       │◄──►│   (Node.js)     │◄──►│   Services      │
│   Port: 3000    │    │   Port: 5001    │    │   Port: 8000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx         │    │   Celery        │    │   MQTT          │
│   (Reverse      │    │   (Background   │    │   (IoT Data)    │
│   Proxy)        │    │   Tasks)        │    │   Port: 1883    │
│   Port: 80/443  │    │   Redis: 6379   │    └─────────────────┘
└─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Databases     │    │   Monitoring    │
│   - PostgreSQL  │    │   - Prometheus  │
│   - TimescaleDB │    │   - Grafana     │
│   - MongoDB     │    │   Port: 9090/   │
│   - Redis       │    │   3001          │
└─────────────────┘    └─────────────────┘
```

## 📞 Support

For issues or questions:
1. Check service logs: `docker-compose logs [service-name]`
2. Verify service status: `docker-compose ps`
3. Restart services: `docker-compose restart [service-name]`
4. Rebuild containers: `docker-compose build --no-cache`

---

**Last Updated**: August 7, 2025
**System Version**: 1.0.0
**Status**: ✅ All Services Running 