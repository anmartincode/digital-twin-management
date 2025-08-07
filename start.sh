#!/bin/bash

# Digital Twin Management - Quick Start Script
echo "🚀 Starting Digital Twin Management Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads
mkdir -p logs
mkdir -p database/init
mkdir -p database/mongo-init
mkdir -p mqtt/config
mkdir -p mqtt/data
mkdir -p mqtt/log
mkdir -p nginx
mkdir -p monitoring/grafana/dashboards
mkdir -p monitoring/grafana/datasources

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your configuration before starting the application."
fi

# Create Dockerfiles if they don't exist
if [ ! -f backend/Dockerfile ]; then
    echo "🐳 Creating backend Dockerfile..."
    cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
EOF
fi

if [ ! -f backend/python/Dockerfile ]; then
    echo "🐳 Creating Python services Dockerfile..."
    cat > backend/python/Dockerfile << 'EOF'
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
fi

if [ ! -f frontend/Dockerfile ]; then
    echo "🐳 Creating frontend Dockerfile..."
    cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF
fi

# Create basic nginx configuration
if [ ! -f nginx/nginx.conf ]; then
    echo "🌐 Creating nginx configuration..."
    cat > nginx/nginx.conf << 'EOF'
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
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /socket.io {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
        }
    }
}
EOF
fi

# Create Prometheus configuration
if [ ! -f monitoring/prometheus.yml ]; then
    echo "📊 Creating Prometheus configuration..."
    cat > monitoring/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'digital-twin-backend'
    static_configs:
      - targets: ['backend:5000']

  - job_name: 'digital-twin-frontend'
    static_configs:
      - targets: ['frontend:3000']
EOF
fi

# Start the application
echo "🚀 Starting services with Docker Compose..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose ps

echo ""
echo "🎉 Digital Twin Management Application is starting!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📚 API Documentation: http://localhost:5000/api/docs"
echo "📊 Grafana: http://localhost:3001 (admin/admin)"
echo "📈 Prometheus: http://localhost:9090"
echo ""
echo "🔍 To view logs: docker-compose logs -f [service-name]"
echo "🛑 To stop: docker-compose down"
echo "🔄 To restart: docker-compose restart"
echo ""
echo "⚠️  Note: First startup may take several minutes as Docker images are built."
echo "   Check the logs with 'docker-compose logs -f' to monitor progress." 