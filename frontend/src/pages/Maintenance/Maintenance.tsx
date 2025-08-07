import React from 'react';

const Maintenance: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Management</h1>
        <p className="text-gray-600 mb-4">
          Schedule and track maintenance activities for facility equipment and systems.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Tasks</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">HVAC Filter Replacement</div>
                <div className="text-sm text-blue-600">Due: Tomorrow</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900">Lighting Inspection</div>
                <div className="text-sm text-green-600">Due: Next Week</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="font-medium text-orange-900">Security System Check</div>
                <div className="text-sm text-orange-600">Due: 3 days</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Orders</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900">Urgent: Water Leak</div>
                <div className="text-sm text-red-600">Status: In Progress</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-900">Elevator Maintenance</div>
                <div className="text-sm text-yellow-600">Status: Scheduled</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900">Fire Alarm Test</div>
                <div className="text-sm text-green-600">Status: Completed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Today</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Scheduled</span>
                <span className="font-semibold text-blue-600">25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance; 