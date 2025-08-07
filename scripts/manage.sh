#!/bin/bash

# Digital Twin Management - Project Management Script
# This script provides commands to manage the entire project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing_deps=()
    
    if ! command_exists node; then
        missing_deps+=("Node.js")
    fi
    
    if ! command_exists npm; then
        missing_deps+=("npm")
    fi
    
    if ! command_exists docker; then
        missing_deps+=("Docker")
    fi
    
    if ! command_exists docker-compose; then
        missing_deps+=("Docker Compose")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_status "Please install the missing dependencies and try again."
        exit 1
    fi
    
    print_success "All prerequisites are installed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    npm install
    cd frontend && npm install && cd ..
    cd backend && npm install && cd ..
    
    print_success "Dependencies installed successfully"
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    
    # Start databases
    docker-compose up -d postgres mongodb redis mqtt
    
    # Wait for databases to be ready
    print_status "Waiting for databases to be ready..."
    sleep 10
    
    # Start backend and frontend
    npm run dev
}

# Function to stop development environment
stop_dev() {
    print_status "Stopping development environment..."
    
    # Stop all containers
    docker-compose down
    
    print_success "Development environment stopped"
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    npm run test
    
    print_success "Tests completed"
}

# Function to run linting
run_lint() {
    print_status "Running linting..."
    
    npm run lint
    
    print_success "Linting completed"
}

# Function to format code
format_code() {
    print_status "Formatting code..."
    
    npm run format
    
    print_success "Code formatting completed"
}

# Function to build project
build_project() {
    print_status "Building project..."
    
    npm run build
    
    print_success "Build completed"
}

# Function to clean project
clean_project() {
    print_status "Cleaning project..."
    
    npm run clean
    docker-compose down -v
    docker system prune -f
    
    print_success "Project cleaned"
}

# Function to setup project
setup_project() {
    print_status "Setting up project..."
    
    check_prerequisites
    install_dependencies
    
    # Create environment files if they don't exist
    if [ ! -f .env ]; then
        cp env.example .env
        print_warning "Created .env file from template. Please update with your configuration."
    fi
    
    # Build Docker images
    docker-compose build
    
    print_success "Project setup completed"
}

# Function to show project status
show_status() {
    print_status "Project Status:"
    
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "Docker version: $(docker --version)"
    
    echo ""
    echo "Container Status:"
    docker-compose ps
    
    echo ""
    echo "Port Usage:"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:5001"
    echo "PostgreSQL: localhost:5432"
    echo "MongoDB: localhost:27017"
    echo "Redis: localhost:6379"
    echo "MQTT: localhost:1883"
}

# Function to show help
show_help() {
    echo "Digital Twin Management - Project Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  setup       - Setup the entire project (install deps, build images)"
    echo "  install     - Install all dependencies"
    echo "  dev         - Start development environment"
    echo "  stop        - Stop development environment"
    echo "  test        - Run all tests"
    echo "  lint        - Run linting"
    echo "  format      - Format code"
    echo "  build       - Build the project"
    echo "  clean       - Clean the project (remove node_modules, containers)"
    echo "  status      - Show project status"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup    # First time setup"
    echo "  $0 dev      # Start development"
    echo "  $0 test     # Run tests"
}

# Main script logic
case "${1:-help}" in
    setup)
        setup_project
        ;;
    install)
        check_prerequisites
        install_dependencies
        ;;
    dev)
        start_dev
        ;;
    stop)
        stop_dev
        ;;
    test)
        run_tests
        ;;
    lint)
        run_lint
        ;;
    format)
        format_code
        ;;
    build)
        build_project
        ;;
    clean)
        clean_project
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 