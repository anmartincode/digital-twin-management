import React, { useState } from 'react';
import MetricCard from '../../components/Dashboard/MetricCard';
import ChartWidget from '../../components/Dashboard/ChartWidget';
import AlertPanel from '../../components/Dashboard/AlertPanel';
import DeviceStatus from '../../components/Dashboard/DeviceStatus';
import BudgetChart from '../../components/Dashboard/BudgetChart';
import FacilityTable from '../../components/Dashboard/FacilityTable';
import MetricsSummary from '../../components/Dashboard/MetricsSummary';
import SatelliteIcon from '@mui/icons-material/Satellite';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WarningIcon from '@mui/icons-material/Warning';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import BuildIcon from '@mui/icons-material/Build';
import SensorsIcon from '@mui/icons-material/Sensors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      {/* Top Metrics Summary */}
      <MetricsSummary />

      {/* Main Chart */}
      <div className="grid grid-cols-1 gap-6">
        <BudgetChart title="Facility Operations Budget" />
      </div>

      {/* Metrics Grid - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Total Devices"
          value={metrics.totalDevices}
          change="+2"
          changeType="positive"
          icon={SatelliteIcon}
        />
        <MetricCard
          title="Online Devices"
          value={metrics.onlineDevices}
          change={`${Math.round((metrics.onlineDevices / metrics.totalDevices) * 100)}%`}
          changeType="positive"
          icon={FiberManualRecordIcon}
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          change="-1"
          changeType="negative"
          icon={WarningIcon}
        />
        <MetricCard
          title="Energy (kWh)"
          value={metrics.energyConsumption}
          change="+5.2%"
          changeType="negative"
          icon={BoltIcon}
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${metrics.occupancyRate}%`}
          change="+3%"
          changeType="positive"
          icon={GroupsIcon}
        />
        <MetricCard
          title="Maintenance Tasks"
          value={metrics.maintenanceTasks}
          change="+2"
          changeType="neutral"
          icon={BuildIcon}
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

      {/* Facilities Table */}
      <div className="grid grid-cols-1 gap-6">
        <FacilityTable />
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPanel alerts={recentAlerts} />
        
        {/* Recent Activity */}
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-header dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="card-body dark:bg-gray-800">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <SensorsIcon className="text-blue-600 dark:text-blue-300 text-sm" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">New IoT device connected</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Temperature sensor added to Room 305</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="text-green-600 dark:text-green-300 text-sm" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">Maintenance completed</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">HVAC filter replacement in Building B</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <WarningIcon className="text-yellow-600 dark:text-yellow-300 text-sm" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">Alert resolved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">High humidity alert in Server Room</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">1 hour ago</p>
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