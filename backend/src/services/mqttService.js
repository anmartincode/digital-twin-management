const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.subscribers = new Map();
    this.deviceData = new Map();
    
    // MQTT Configuration
    this.config = {
      host: process.env.MQTT_HOST || 'localhost',
      port: process.env.MQTT_PORT || 1883,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: `digital-twin-${uuidv4()}`,
      clean: true,
      reconnectPeriod: 5000,
      connectTimeout: 30000
    };
  }

  connect() {
    try {
      const url = `mqtt://${this.config.host}:${this.config.port}`;
      
      this.client = mqtt.connect(url, {
        ...this.config,
        will: {
          topic: 'digital-twin/status',
          payload: JSON.stringify({
            clientId: this.config.clientId,
            status: 'offline',
            timestamp: new Date().toISOString()
          }),
          qos: 1,
          retain: true
        }
      });

      this.setupEventHandlers();
      this.subscribeToDefaultTopics();
      
    } catch (error) {
      console.error('MQTT connection error:', error);
    }
  }

  setupEventHandlers() {
    this.client.on('connect', () => {
      console.log('🔌 MQTT connected successfully');
      this.isConnected = true;
      
      // Publish online status
      this.publish('digital-twin/status', {
        clientId: this.config.clientId,
        status: 'online',
        timestamp: new Date().toISOString()
      });
    });

    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        this.handleMessage(topic, data);
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });

    this.client.on('error', (error) => {
      console.error('MQTT error:', error);
      this.isConnected = false;
    });

    this.client.on('close', () => {
      console.log('MQTT connection closed');
      this.isConnected = false;
    });

    this.client.on('reconnect', () => {
      console.log('MQTT reconnecting...');
    });
  }

  subscribeToDefaultTopics() {
    const defaultTopics = [
      'sensors/+/data',
      'devices/+/status',
      'alerts/+/trigger',
      'energy/+/consumption',
      'occupancy/+/data',
      'maintenance/+/updates'
    ];

    defaultTopics.forEach(topic => {
      this.subscribe(topic);
    });
  }

  subscribe(topic, callback) {
    if (!this.client) {
      console.error('MQTT client not connected');
      return;
    }

    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Error subscribing to ${topic}:`, err);
      } else {
        console.log(`📡 Subscribed to: ${topic}`);
        if (callback) {
          this.subscribers.set(topic, callback);
        }
      }
    });
  }

  publish(topic, data, options = {}) {
    if (!this.client || !this.isConnected) {
      console.error('MQTT client not connected');
      return;
    }

    const message = JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      messageId: uuidv4()
    });

    const publishOptions = {
      qos: options.qos || 1,
      retain: options.retain || false,
      ...options
    };

    this.client.publish(topic, message, publishOptions, (err) => {
      if (err) {
        console.error(`Error publishing to ${topic}:`, err);
      } else {
        console.log(`📤 Published to ${topic}:`, data);
      }
    });
  }

  handleMessage(topic, data) {
    console.log(`📨 Received message on ${topic}:`, data);

    // Store device data
    if (data.deviceId) {
      this.deviceData.set(data.deviceId, {
        ...data,
        lastSeen: new Date()
      });
    }

    // Handle different message types
    if (topic.includes('/data')) {
      this.handleSensorData(topic, data);
    } else if (topic.includes('/status')) {
      this.handleDeviceStatus(topic, data);
    } else if (topic.includes('/alerts')) {
      this.handleAlert(topic, data);
    } else if (topic.includes('/energy')) {
      this.handleEnergyData(topic, data);
    }

    // Call subscriber callbacks
    const callback = this.subscribers.get(topic);
    if (callback) {
      callback(data);
    }
  }

  handleSensorData(topic, data) {
    // Process sensor data
    const sensorData = {
      deviceId: data.deviceId,
      sensorType: data.type,
      value: data.value,
      unit: data.unit,
      quality: data.quality || 'good',
      timestamp: new Date(),
      location: data.location
    };

    // Store in database (implement database storage)
    this.storeSensorData(sensorData);
  }

  handleDeviceStatus(topic, data) {
    // Update device status
    const deviceStatus = {
      deviceId: data.deviceId,
      status: data.status,
      lastSeen: new Date(),
      metadata: data.metadata || {}
    };

    // Store in database (implement database storage)
    this.updateDeviceStatus(deviceStatus);
  }

  handleAlert(topic, data) {
    // Process alerts
    const alert = {
      id: data.alertId || uuidv4(),
      type: data.type,
      severity: data.severity,
      message: data.message,
      deviceId: data.deviceId,
      timestamp: new Date(),
      acknowledged: false
    };

    // Store in database (implement database storage)
    this.createAlert(alert);
  }

  handleEnergyData(topic, data) {
    // Process energy consumption data
    const energyData = {
      buildingId: data.buildingId,
      consumption: data.consumption,
      peakDemand: data.peakDemand,
      cost: data.cost,
      timestamp: new Date(),
      breakdown: data.breakdown || {}
    };

    // Store in database (implement database storage)
    this.storeEnergyData(energyData);
  }

  // Database storage methods (to be implemented)
  async storeSensorData(data) {
    // TODO: Implement database storage
    console.log('Storing sensor data:', data);
  }

  async updateDeviceStatus(status) {
    // TODO: Implement database storage
    console.log('Updating device status:', status);
  }

  async createAlert(alert) {
    // TODO: Implement database storage
    console.log('Creating alert:', alert);
  }

  async storeEnergyData(data) {
    // TODO: Implement database storage
    console.log('Storing energy data:', data);
  }

  // Utility methods
  getDeviceData(deviceId) {
    return this.deviceData.get(deviceId);
  }

  getAllDeviceData() {
    return Array.from(this.deviceData.values());
  }

  isConnected() {
    return this.isConnected;
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.isConnected = false;
    }
  }
}

// Create singleton instance
const mqttService = new MQTTService();

module.exports = mqttService; 