import React from 'react';

const IoTDevices: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">IoT Devices</h1>
        <p className="text-gray-600 mb-4">
          Monitor and manage IoT sensors and devices across the facility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Temperature Sensors</h3>
            <p className="text-blue-700 text-sm mb-3">Monitor environmental conditions</p>
            <div className="text-2xl font-bold text-blue-600">24°C</div>
            <div className="text-xs text-blue-500">Last updated: 2 min ago</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Humidity Sensors</h3>
            <p className="text-green-700 text-sm mb-3">Track moisture levels</p>
            <div className="text-2xl font-bold text-green-600">45%</div>
            <div className="text-xs text-green-500">Last updated: 1 min ago</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Motion Sensors</h3>
            <p className="text-purple-700 text-sm mb-3">Occupancy detection</p>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-purple-500">Active zones</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Energy Meters</h3>
            <p className="text-orange-700 text-sm mb-3">Power consumption tracking</p>
            <div className="text-2xl font-bold text-orange-600">2.4 kW</div>
            <div className="text-xs text-orange-500">Current usage</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">Security Cameras</h3>
            <p className="text-red-700 text-sm mb-3">Surveillance systems</p>
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-xs text-red-500">Online cameras</div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="font-semibold text-indigo-900 mb-2">Air Quality</h3>
            <p className="text-indigo-700 text-sm mb-3">Environmental monitoring</p>
            <div className="text-2xl font-bold text-indigo-600">Good</div>
            <div className="text-xs text-indigo-500">AQI: 42</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDevices; 