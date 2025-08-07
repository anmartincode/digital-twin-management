// BIM Model Types
export interface BIMElement {
  id: string;
  name: string;
  type: string;
  geometry: {
    vertices: number[][];
    faces: number[][];
    boundingBox: {
      min: [number, number, number];
      max: [number, number, number];
    };
  };
  properties: Record<string, any>;
  material?: {
    name: string;
    color: [number, number, number];
    opacity: number;
  };
}

export interface BIMModel {
  id: string;
  name: string;
  version: string;
  filePath: string;
  uploadDate: Date;
  elements: BIMElement[];
  metadata: {
    projectName: string;
    buildingName: string;
    floorCount: number;
    totalArea: number;
    units: string;
  };
}

// IoT Device Types
export interface IoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'actuator' | 'controller';
  category: 'temperature' | 'humidity' | 'occupancy' | 'energy' | 'security' | 'lighting' | 'hvac';
  location: {
    buildingId: string;
    floorId: string;
    roomId?: string;
    coordinates: [number, number, number];
  };
  status: 'online' | 'offline' | 'error' | 'maintenance';
  lastSeen: Date;
  configuration: Record<string, any>;
}

export interface SensorReading {
  deviceId: string;
  timestamp: Date;
  value: number;
  unit: string;
  quality: 'good' | 'uncertain' | 'bad';
  metadata?: Record<string, any>;
}

// Facility Types
export interface Building {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  floors: Floor[];
  totalArea: number;
  yearBuilt: number;
  buildingType: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  name: string;
  level: number;
  rooms: Room[];
  area: number;
  floorPlan?: string; // URL to floor plan image
}

export interface Room {
  id: string;
  floorId: string;
  name: string;
  type: 'office' | 'meeting' | 'lobby' | 'bathroom' | 'kitchen' | 'storage' | 'technical';
  area: number;
  capacity: number;
  coordinates: [number, number, number];
  devices: string[]; // IoT device IDs
}

// Asset Management Types
export interface Asset {
  id: string;
  name: string;
  type: string;
  category: 'equipment' | 'furniture' | 'fixture' | 'system';
  location: {
    buildingId: string;
    floorId: string;
    roomId?: string;
    coordinates?: [number, number, number];
  };
  status: 'operational' | 'maintenance' | 'out_of_service' | 'retired';
  installationDate: Date;
  warrantyExpiry?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  specifications: Record<string, any>;
}

// Maintenance Types
export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  assetId: string;
  type: 'preventive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  scheduledDate: Date;
  completedDate?: Date;
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  cost?: number;
  notes?: string;
}

// Energy Management Types
export interface EnergyConsumption {
  id: string;
  buildingId: string;
  timestamp: Date;
  totalConsumption: number; // kWh
  peakDemand: number; // kW
  cost: number;
  breakdown: {
    lighting: number;
    hvac: number;
    equipment: number;
    other: number;
  };
}

// Space Utilization Types
export interface OccupancyData {
  id: string;
  roomId: string;
  timestamp: Date;
  currentOccupancy: number;
  maxCapacity: number;
  utilizationRate: number; // percentage
}

// Alert Types
export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  category: 'device' | 'maintenance' | 'energy' | 'security' | 'system';
  source: {
    type: 'device' | 'system' | 'manual';
    id: string;
  };
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'map' | '3d_view';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  configuration: Record<string, any>;
  dataSource: {
    type: 'realtime' | 'historical' | 'static';
    query: string;
    refreshInterval?: number;
  };
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: 'grid' | 'flexible';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User and Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  permissions: string[];
  lastLogin?: Date;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Real-time Event Types
export interface RealTimeEvent {
  type: 'sensor_update' | 'device_status' | 'alert' | 'maintenance_update';
  timestamp: Date;
  data: any;
}

// Map and Location Types
export interface MapFeature {
  id: string;
  type: 'point' | 'polygon' | 'line';
  geometry: {
    coordinates: number[][];
    type: string;
  };
  properties: Record<string, any>;
}

// File Upload Types
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  uploadDate: Date;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
}

// Configuration Types
export interface SystemConfig {
  mqtt: {
    broker: string;
    port: number;
    username?: string;
    password?: string;
    topics: string[];
  };
  mapbox: {
    accessToken: string;
    style: string;
  };
  database: {
    postgres: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
    };
    mongodb: {
      uri: string;
      database: string;
    };
    timescale: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
    };
  };
} 