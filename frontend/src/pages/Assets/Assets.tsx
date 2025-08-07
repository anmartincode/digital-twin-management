import React from 'react';

const Assets: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Asset Management</h1>
        <p className="text-gray-600 mb-4">
          Track and manage facility assets, equipment, and inventory.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Assets</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Assets</span>
                <span className="font-semibold text-green-600">1,189</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Under Maintenance</span>
                <span className="font-semibold text-orange-600">34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Out of Service</span>
                <span className="font-semibold text-red-600">24</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Categories</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">HVAC Systems</span>
                <span className="font-semibold text-gray-900">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lighting</span>
                <span className="font-semibold text-gray-900">423</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Security</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">IT Equipment</span>
                <span className="font-semibold text-gray-900">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Furniture</span>
                <span className="font-semibold text-gray-900">345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets; 