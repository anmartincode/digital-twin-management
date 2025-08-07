import React, { useState } from 'react';
import MetricCard from '../../components/Dashboard/MetricCard';
import ChartWidget from '../../components/Dashboard/ChartWidget';
import AlertPanel from '../../components/Dashboard/AlertPanel';
import DeviceStatus from '../../components/Dashboard/DeviceStatus';

const Dashboard: React.FC = () => {
  const [metrics] = useState({
    totalDevices: 156,
    onlineDevices: 142,
    activeAlerts: 3,
    energyConsumption: 245.6,
    occupancyRate: 78,
    maintenanceTasks: 12
  });

  const [recentAlerts] = useState([
    {
      id: '1',
      title: 'Temperature Sensor Offline',
      message: 'Temperature sensor in Room 201 is not responding',
      type: 'warning' as const,
      category: 'device' as const,
      source: {
        type: 'device' as const,
        id: 'temp_201'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      acknowledged: false,
      resolved: false
    },
    {
      id: '2',
      title: 'High Energy Consumption',
      message: 'Building A energy consumption is 15% above normal',
      type: 'error' as const,
      category: 'energy' as const,
      source: {
        type: 'system' as const,
        id: 'energy_bldg_a'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      acknowledged: true,
      resolved: false
    },
    {
      id: '3',
      title: 'Maintenance Due',
      message: 'HVAC system maintenance scheduled for tomorrow',
      type: 'info' as const,
      category: 'maintenance' as const,
      source: {
        type: 'system' as const,
        id: 'hvac_01'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      acknowledged: false,
      resolved: false
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Real-time overview of your facility</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <span className="w-2 h-2 bg-success-400 rounded-full mr-1"></span>
            System Online
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Devices"
          value={metrics.totalDevices}
          change="+2"
          changeType="positive"
          icon="📡"
        />
        <MetricCard
          title="Online Devices"
          value={metrics.onlineDevices}
          change={`${Math.round((metrics.onlineDevices / metrics.totalDevices) * 100)}%`}
          changeType="positive"
          icon="🟢"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          change="-1"
          changeType="negative"
          icon="⚠️"
        />
        <MetricCard
          title="Energy (kWh)"
          value={metrics.energyConsumption}
          change="+5.2%"
          changeType="negative"
          icon="⚡"
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${metrics.occupancyRate}%`}
          change="+3%"
          changeType="positive"
          icon="👥"
        />
        <MetricCard
          title="Maintenance Tasks"
          value={metrics.maintenanceTasks}
          change="+2"
          changeType="neutral"
          icon="🔧"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Consumption Chart */}
        <div className="lg:col-span-2">
          <ChartWidget
            title="Energy Consumption (Last 24 Hours)"
            type="line"
            data={{
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
              datasets: [{
                label: 'Energy (kWh)',
                data: [180, 160, 220, 280, 320, 290, 200],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
              }]
            }}
          />
        </div>

        {/* Device Status */}
        <div>
          <DeviceStatus />
        </div>
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPanel alerts={recentAlerts} />
        
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 text-sm">📡</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">New IoT device connected</p>
                  <p className="text-xs text-gray-500">Temperature sensor added to Room 305</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-success-600 text-sm">✅</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Maintenance completed</p>
                  <p className="text-xs text-gray-500">HVAC filter replacement in Building B</p>
                  <p className="text-xs text-gray-400">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
                    <span className="text-warning-600 text-sm">⚠️</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Alert resolved</p>
                  <p className="text-xs text-gray-500">High humidity alert in Server Room</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 