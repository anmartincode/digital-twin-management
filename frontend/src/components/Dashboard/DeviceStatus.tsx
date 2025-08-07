import React from 'react';

const DeviceStatus: React.FC = () => {
  const deviceCategories = [
    { name: 'Temperature Sensors', count: 45, online: 42, icon: '🌡️' },
    { name: 'Humidity Sensors', count: 32, online: 30, icon: '💧' },
    { name: 'Occupancy Sensors', count: 28, online: 26, icon: '👥' },
    { name: 'Energy Meters', count: 15, online: 15, icon: '⚡' },
    { name: 'Security Cameras', count: 24, online: 22, icon: '📹' },
    { name: 'HVAC Controllers', count: 12, online: 7, icon: '❄️' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-medium text-gray-900">Device Status</h3>
      </div>
      <div className="card-body">
        <div className="space-y-3">
          {deviceCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg mr-2">{category.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  <p className="text-xs text-gray-500">
                    {category.online}/{category.count} online
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-success-600 h-2 rounded-full"
                    style={{ width: `${(category.online / category.count) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round((category.online / category.count) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Devices</span>
            <span className="font-medium text-gray-900">156</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Online</span>
            <span className="font-medium text-success-600">142</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Offline</span>
            <span className="font-medium text-danger-600">14</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus; 