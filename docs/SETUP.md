# Digital Twin Management - Setup Guide

## Prerequisites

Before setting up the Digital Twin Management application, ensure you have the following installed:

### Required Software
- **Docker** (version 20.10+) - [Download](https://docs.docker.com/get-docker/)
- **Docker Compose** (version 2.0+) - [Download](https://docs.docker.com/compose/install/)
- **Git** - [Download](https://git-scm.com/downloads)

### Optional Software
- **Node.js** (version 18+) - For local development
- **Python** (version 3.9+) - For local development
- **PostgreSQL** (version 14+) - For local database access
- **MongoDB** (version 6+) - For local database access

## Quick Start (Recommended)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd digital-twin-management
```

### 2. Run the Quick Start Script
```bash
./start.sh
```

This script will:
- Create necessary directories
- Set up environment configuration
- Create Docker files
- Start all services with Docker Compose
- Display access URLs

### 3. Access the Application
Once the startup is complete, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090

## Manual Setup

If you prefer to set up the application manually, follow these steps:

### 1. Environment Configuration

Copy the environment template and configure it:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```bash
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=digital_twin
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# MQTT Configuration
MQTT_HOST=localhost
MQTT_PORT=1883

# Mapbox Configuration
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### 2. Create Required Directories
```bash
mkdir -p uploads logs database/init database/mongo-init
mkdir -p mqtt/config mqtt/data mqtt/log
mkdir -p nginx monitoring/grafana/dashboards monitoring/grafana/datasources
```

### 3. Start Services with Docker Compose
```bash
docker-compose up -d
```

### 4. Verify Installation
```bash
docker-compose ps
```

All services should show as "Up" status.

## Development Setup

For development work, you can run services locally:

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Python Services Development
```bash
cd backend/python
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Database Setup

### PostgreSQL with PostGIS
The application automatically creates the required databases and extensions. If you need to set up manually:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE digital_twin;

-- Connect to the database
\c digital_twin

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
```

### TimescaleDB
```sql
-- Connect to TimescaleDB
psql -U postgres -h localhost -p 5433

-- Create database
CREATE DATABASE timeseries;

-- Connect to the database
\c timeseries

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

### MongoDB
```javascript
// Connect to MongoDB
mongosh "mongodb://admin:password@localhost:27017/digital_twin?authSource=admin"

// Create collections
use digital_twin
db.createCollection("bim_models")
db.createCollection("assets")
db.createCollection("configurations")
```

## Configuration

### MQTT Configuration
Create MQTT configuration file at `mqtt/config/mosquitto.conf`:
```conf
# MQTT Configuration
listener 1883
allow_anonymous true

# Persistence
persistence true
persistence_location /mosquitto/data/

# Logging
log_dest file /mosquitto/log/mosquitto.log
log_type all
log_timestamp true
```

### Nginx Configuration
The application includes a basic Nginx configuration. For production, you may want to customize it:

```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## Testing the Installation

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### 2. API Documentation
Visit http://localhost:5000/api/docs to see the interactive API documentation.

### 3. Database Connections
Test database connections:
```bash
# PostgreSQL
docker exec -it digital-twin-postgres psql -U postgres -d digital_twin -c "SELECT version();"

# MongoDB
docker exec -it digital-twin-mongodb mongosh --eval "db.runCommand('ping')"

# Redis
docker exec -it digital-twin-redis redis-cli ping
```

### 4. MQTT Test
```bash
# Subscribe to test topic
docker exec -it digital-twin-mqtt mosquitto_sub -t "test/topic"

# Publish test message
docker exec -it digital-twin-mqtt mosquitto_pub -t "test/topic" -m "Hello World"
```

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
If you get port conflicts, check what's running on the required ports:
```bash
# Check ports in use
lsof -i :3000
lsof -i :5000
lsof -i :5432
lsof -i :27017
```

#### 2. Docker Issues
```bash
# Check Docker status
docker --version
docker-compose --version

# Check running containers
docker ps

# View logs
docker-compose logs -f [service-name]
```

#### 3. Database Connection Issues
```bash
# Check database containers
docker-compose ps postgres mongodb redis

# Test database connections
docker exec -it digital-twin-postgres pg_isready -U postgres
docker exec -it digital-twin-mongodb mongosh --eval "db.adminCommand('ping')"
docker exec -it digital-twin-redis redis-cli ping
```

#### 4. Memory Issues
If you encounter memory issues, increase Docker memory allocation:
- Docker Desktop: Settings → Resources → Memory (recommend 8GB+)
- Docker Engine: Edit `/etc/docker/daemon.json`

#### 5. Permission Issues
```bash
# Fix file permissions
chmod +x start.sh
chmod -R 755 uploads/
chmod -R 755 logs/
```

### Logs and Debugging

#### View Service Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f python-services
```

#### Debug Mode
To run in debug mode, modify the environment:
```bash
# In .env file
NODE_ENV=development
LOG_LEVEL=debug
```

## Production Deployment

### 1. Environment Configuration
Update `.env` file for production:
```bash
NODE_ENV=production
JWT_SECRET=your-super-secure-production-secret
POSTGRES_PASSWORD=your-secure-db-password
MONGODB_URI=mongodb://user:password@host:port/database
```

### 2. SSL Configuration
Set up SSL certificates and update Nginx configuration for HTTPS.

### 3. Monitoring
Configure monitoring and alerting:
- Set up Grafana dashboards
- Configure Prometheus alerts
- Set up log aggregation

### 4. Backup Strategy
Implement automated backups:
```bash
# Database backups
docker exec digital-twin-postgres pg_dump -U postgres digital_twin > backup.sql
docker exec digital-twin-mongodb mongodump --out /backup
```

## Support

For additional support:
- Check the [Architecture Documentation](ARCHITECTURE.md)
- Review the [API Documentation](http://localhost:5000/api/docs)
- Check service logs for error messages
- Open an issue in the project repository

## Next Steps

After successful installation:
1. Upload your first IFC file through the BIM Viewer
2. Configure IoT devices to connect to the MQTT broker
3. Set up facility maps and floor plans
4. Configure alerts and notifications
5. Customize dashboards and analytics 