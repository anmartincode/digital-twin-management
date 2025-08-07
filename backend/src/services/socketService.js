const mqttService = require('./mqttService');

class SocketService {
  constructor(io) {
    this.io = io;
    this.connectedClients = new Map();
    this.rooms = new Map();
    
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`🔌 Client connected: ${socket.id}`);
      
      // Store client information
      this.connectedClients.set(socket.id, {
        id: socket.id,
        connectedAt: new Date(),
        rooms: new Set(),
        user: null
      });

      // Handle authentication
      socket.on('authenticate', (data) => {
        this.handleAuthentication(socket, data);
      });

      // Handle room joining
      socket.on('join-room', (roomName) => {
        this.handleJoinRoom(socket, roomName);
      });

      // Handle room leaving
      socket.on('leave-room', (roomName) => {
        this.handleLeaveRoom(socket, roomName);
      });

      // Handle real-time data subscriptions
      socket.on('subscribe-sensor', (deviceId) => {
        this.handleSensorSubscription(socket, deviceId);
      });

      socket.on('unsubscribe-sensor', (deviceId) => {
        this.handleSensorUnsubscription(socket, deviceId);
      });

      // Handle BIM model updates
      socket.on('bim-update', (data) => {
        this.handleBIMUpdate(socket, data);
      });

      // Handle facility map interactions
      socket.on('map-interaction', (data) => {
        this.handleMapInteraction(socket, data);
      });

      // Handle device control
      socket.on('device-control', (data) => {
        this.handleDeviceControl(socket, data);
      });

      // Handle alerts
      socket.on('acknowledge-alert', (alertId) => {
        this.handleAlertAcknowledgment(socket, alertId);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        this.handleDisconnection(socket);
      });

      // Send initial data
      this.sendInitialData(socket);
    });
  }

  handleAuthentication(socket, data) {
    // TODO: Implement proper authentication
    const client = this.connectedClients.get(socket.id);
    if (client) {
      client.user = {
        id: data.userId,
        username: data.username,
        role: data.role
      };
      
      socket.emit('authenticated', {
        success: true,
        user: client.user
      });
    }
  }

  handleJoinRoom(socket, roomName) {
    socket.join(roomName);
    
    const client = this.connectedClients.get(socket.id);
    if (client) {
      client.rooms.add(roomName);
    }

    // Notify other clients in the room
    socket.to(roomName).emit('user-joined', {
      userId: client?.user?.id,
      username: client?.user?.username,
      timestamp: new Date()
    });

    console.log(`👥 Client ${socket.id} joined room: ${roomName}`);
  }

  handleLeaveRoom(socket, roomName) {
    socket.leave(roomName);
    
    const client = this.connectedClients.get(socket.id);
    if (client) {
      client.rooms.delete(roomName);
    }

    // Notify other clients in the room
    socket.to(roomName).emit('user-left', {
      userId: client?.user?.id,
      username: client?.user?.username,
      timestamp: new Date()
    });

    console.log(`👋 Client ${socket.id} left room: ${roomName}`);
  }

  handleSensorSubscription(socket, deviceId) {
    // Subscribe to MQTT topic for this device
    const topic = `sensors/${deviceId}/data`;
    
    mqttService.subscribe(topic, (data) => {
      socket.emit('sensor-data', {
        deviceId,
        data,
        timestamp: new Date()
      });
    });

    console.log(`📡 Client ${socket.id} subscribed to sensor: ${deviceId}`);
  }

  handleSensorUnsubscription(socket, deviceId) {
    // Unsubscribe from MQTT topic
    const topic = `sensors/${deviceId}/data`;
    // Note: MQTT doesn't support unsubscribing individual callbacks
    // This would need to be handled differently in a production environment
    
    console.log(`📡 Client ${socket.id} unsubscribed from sensor: ${deviceId}`);
  }

  handleBIMUpdate(socket, data) {
    // Broadcast BIM updates to all clients in the same room
    const roomName = `bim-${data.modelId}`;
    socket.to(roomName).emit('bim-updated', {
      ...data,
      timestamp: new Date(),
      userId: this.connectedClients.get(socket.id)?.user?.id
    });
  }

  handleMapInteraction(socket, data) {
    // Broadcast map interactions to all clients in the same room
    const roomName = `map-${data.facilityId}`;
    socket.to(roomName).emit('map-interaction-update', {
      ...data,
      timestamp: new Date(),
      userId: this.connectedClients.get(socket.id)?.user?.id
    });
  }

  handleDeviceControl(socket, data) {
    // Publish device control command to MQTT
    const topic = `devices/${data.deviceId}/control`;
    mqttService.publish(topic, {
      command: data.command,
      parameters: data.parameters,
      userId: this.connectedClients.get(socket.id)?.user?.id
    });

    // Broadcast to other clients
    socket.to(`devices-${data.deviceId}`).emit('device-control-issued', {
      ...data,
      timestamp: new Date(),
      userId: this.connectedClients.get(socket.id)?.user?.id
    });
  }

  handleAlertAcknowledgment(socket, alertId) {
    // Update alert status in database
    // TODO: Implement database update
    
    // Broadcast acknowledgment to all clients
    this.io.emit('alert-acknowledged', {
      alertId,
      acknowledgedBy: this.connectedClients.get(socket.id)?.user?.id,
      timestamp: new Date()
    });
  }

  handleDisconnection(socket) {
    console.log(`🔌 Client disconnected: ${socket.id}`);
    
    // Clean up client data
    this.connectedClients.delete(socket.id);
    
    // Notify other clients about the disconnection
    this.io.emit('user-disconnected', {
      userId: socket.id,
      timestamp: new Date()
    });
  }

  sendInitialData(socket) {
    // Send initial system status
    socket.emit('system-status', {
      mqttConnected: mqttService.isConnected(),
      totalClients: this.connectedClients.size,
      timestamp: new Date()
    });

    // Send recent alerts
    socket.emit('recent-alerts', {
      alerts: [], // TODO: Fetch from database
      timestamp: new Date()
    });

    // Send device status summary
    socket.emit('device-status-summary', {
      totalDevices: mqttService.getAllDeviceData().length,
      onlineDevices: mqttService.getAllDeviceData().filter(d => d.status === 'online').length,
      timestamp: new Date()
    });
  }

  // Broadcast methods for server-side events
  broadcastSensorData(deviceId, data) {
    this.io.emit('sensor-data', {
      deviceId,
      data,
      timestamp: new Date()
    });
  }

  broadcastAlert(alert) {
    this.io.emit('new-alert', {
      alert,
      timestamp: new Date()
    });
  }

  broadcastDeviceStatus(deviceId, status) {
    this.io.emit('device-status-update', {
      deviceId,
      status,
      timestamp: new Date()
    });
  }

  broadcastEnergyData(buildingId, data) {
    this.io.emit('energy-data', {
      buildingId,
      data,
      timestamp: new Date()
    });
  }

  broadcastOccupancyData(roomId, data) {
    this.io.emit('occupancy-data', {
      roomId,
      data,
      timestamp: new Date()
    });
  }

  // Utility methods
  getConnectedClients() {
    return Array.from(this.connectedClients.values());
  }

  getClientCount() {
    return this.connectedClients.size;
  }

  getClientsInRoom(roomName) {
    const room = this.io.sockets.adapter.rooms.get(roomName);
    return room ? room.size : 0;
  }
}

module.exports = (io) => {
  return new SocketService(io);
}; 