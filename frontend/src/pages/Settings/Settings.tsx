import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
        <p className="text-gray-600 mb-4">
          Configure system preferences and user settings.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Dark Mode</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full shadow absolute left-0"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notifications</span>
                <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full shadow absolute right-0"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Auto-refresh</span>
                <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full shadow absolute right-0"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Retention</span>
                <span className="font-semibold text-gray-900">90 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Backup Frequency</span>
                <span className="font-semibold text-gray-900">Daily</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Rate Limit</span>
                <span className="font-semibold text-gray-900">100/min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Log Level</span>
                <span className="font-semibold text-gray-900">Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 