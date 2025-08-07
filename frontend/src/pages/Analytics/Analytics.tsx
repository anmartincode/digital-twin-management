import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Comprehensive analytics and insights for facility performance and optimization.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Occupancy Rate</span>
                <span className="font-semibold text-green-600">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Energy Efficiency</span>
                <span className="font-semibold text-blue-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Maintenance Score</span>
                <span className="font-semibold text-purple-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Asset Utilization</span>
                <span className="font-semibold text-orange-600">76%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trends</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900">Energy Usage ↓ 12%</div>
                <div className="text-sm text-green-600">Compared to last month</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Occupancy ↑ 8%</div>
                <div className="text-sm text-blue-600">Week-over-week increase</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900">Maintenance Costs ↓ 15%</div>
                <div className="text-sm text-purple-600">Predictive maintenance impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 