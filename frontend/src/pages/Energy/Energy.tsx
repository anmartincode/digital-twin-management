import React from 'react';

const Energy: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Energy Management</h1>
        <p className="text-gray-600 mb-4">
          Monitor and optimize energy consumption across the facility.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Usage</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Power</span>
                <span className="font-semibold text-gray-900">2.4 kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">HVAC</span>
                <span className="font-semibold text-blue-600">1.2 kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lighting</span>
                <span className="font-semibold text-yellow-600">0.8 kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Equipment</span>
                <span className="font-semibold text-green-600">0.4 kW</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Consumption</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today</span>
                <span className="font-semibold text-gray-900">57.6 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Yesterday</span>
                <span className="font-semibold text-gray-900">62.3 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Week</span>
                <span className="font-semibold text-gray-900">398.7 kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold text-gray-900">1,847 kWh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Energy; 