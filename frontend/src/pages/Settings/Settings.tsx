import React, { useState } from 'react';
import Toggle from '../../components/UI/Toggle';
import { useTheme } from '../../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dataRetention, setDataRetention] = useState('90 days');
  const [backupFrequency, setBackupFrequency] = useState('Daily');
  const [apiRateLimit, setApiRateLimit] = useState('100/min');
  const [logLevel, setLogLevel] = useState('Info');

  const handleDataRetentionChange = (value: string) => {
    setDataRetention(value);
    // Here you would typically save to backend
    console.log('Data retention updated to:', value);
  };

  const handleBackupFrequencyChange = (value: string) => {
    setBackupFrequency(value);
    console.log('Backup frequency updated to:', value);
  };

  const handleApiRateLimitChange = (value: string) => {
    setApiRateLimit(value);
    console.log('API rate limit updated to:', value);
  };

  const handleLogLevelChange = (value: string) => {
    setLogLevel(value);
    console.log('Log level updated to:', value);
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Configure system preferences and user settings.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Preferences</h3>
            <div className="space-y-6">
              <Toggle
                enabled={isDarkMode}
                onToggle={toggleDarkMode}
                label="Dark Mode"
              />
              <Toggle
                enabled={notifications}
                onToggle={() => setNotifications(!notifications)}
                label="Notifications"
              />
              <Toggle
                enabled={autoRefresh}
                onToggle={() => setAutoRefresh(!autoRefresh)}
                label="Auto-refresh"
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Data Retention</span>
                <select
                  value={dataRetention}
                  onChange={(e) => handleDataRetentionChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                  <option value="180 days">180 days</option>
                  <option value="365 days">365 days</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Backup Frequency</span>
                <select
                  value={backupFrequency}
                  onChange={(e) => handleBackupFrequencyChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">API Rate Limit</span>
                <select
                  value={apiRateLimit}
                  onChange={(e) => handleApiRateLimitChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="50/min">50/min</option>
                  <option value="100/min">100/min</option>
                  <option value="200/min">200/min</option>
                  <option value="500/min">500/min</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Log Level</span>
                <select
                  value={logLevel}
                  onChange={(e) => handleLogLevelChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="Debug">Debug</option>
                  <option value="Info">Info</option>
                  <option value="Warning">Warning</option>
                  <option value="Error">Error</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 