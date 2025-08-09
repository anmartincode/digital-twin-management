import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme, ThemeMode } from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const Settings: React.FC = () => {
  const { themeMode, isDarkMode, setThemeMode } = useTheme();
  const [dataRetention, setDataRetention] = useState('30 days');
  const [backupFrequency, setBackupFrequency] = useState('Daily');
  const [apiRateLimit, setApiRateLimit] = useState('100/min');
  const [logLevel, setLogLevel] = useState('Info');

  const dataRetentionOptions = ['30 days', '90 days', '180 days', '365 days'];
  const backupFrequencyOptions = ['Daily', 'Weekly', 'Monthly'];
  const apiRateLimitOptions = ['50/min', '100/min', '200/min', '500/min'];
  const logLevelOptions = ['Debug', 'Info', 'Warning', 'Error'];
  
  const themeOptions: { value: ThemeMode; label: string; description: string; icon: React.ReactNode }[] = [
    { 
      value: 'light', 
      label: 'Light', 
      description: 'Always use light theme',
      icon: <LightModeIcon className="h-4 w-4" />
    },
    { 
      value: 'dark', 
      label: 'Dark', 
      description: 'Always use dark theme',
      icon: <DarkModeIcon className="h-4 w-4" />
    },
    { 
      value: 'auto', 
      label: 'Auto', 
      description: 'Match system preference',
      icon: <SettingsBrightnessIcon className="h-4 w-4" />
    },
  ];

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeMode(event.target.value as ThemeMode);
  };

  const currentThemeOption = themeOptions.find(option => option.value === themeMode);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your system preferences and configurations.</p>
      </div>

      {/* Theme Preview Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800">
              {currentThemeOption?.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Theme: {currentThemeOption?.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isDarkMode ? 'Dark mode is active' : 'Light mode is active'}
                {themeMode === 'auto' && ' (following system preference)'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="h-4 w-4 rounded-full bg-primary-500"></div>
            <div className="h-4 w-4 rounded-full bg-success-500"></div>
            <div className="h-4 w-4 rounded-full bg-warning-500"></div>
            <div className="h-4 w-4 rounded-full bg-danger-500"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {currentThemeOption?.icon}
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Theme</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentThemeOption?.description}
                </p>
              </div>
              <select 
                value={themeMode}
                onChange={handleThemeChange}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500"
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Language</span>
              <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 transition-colors duration-200">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Time Zone</span>
              <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 transition-colors duration-200">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Data Retention</span>
              <Listbox value={dataRetention} onChange={setDataRetention}>
                <div className="relative w-32">
                  <Listbox.Button className="relative w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-left">
                    <span className="block truncate">{dataRetention}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <KeyboardArrowDownIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {dataRetentionOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `${
                            active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                          } cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Backup Frequency</span>
              <Listbox value={backupFrequency} onChange={setBackupFrequency}>
                <div className="relative w-32">
                  <Listbox.Button className="relative w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-left">
                    <span className="block truncate">{backupFrequency}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <KeyboardArrowDownIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {backupFrequencyOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `${
                            active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                          } cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">API Rate Limit</span>
              <Listbox value={apiRateLimit} onChange={setApiRateLimit}>
                <div className="relative w-32">
                  <Listbox.Button className="relative w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-left">
                    <span className="block truncate">{apiRateLimit}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <KeyboardArrowDownIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {apiRateLimitOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `${
                            active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                          } cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Log Level</span>
              <Listbox value={logLevel} onChange={setLogLevel}>
                <div className="relative w-32">
                  <Listbox.Button className="relative w-full bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-left">
                    <span className="block truncate">{logLevel}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <KeyboardArrowDownIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {logLevelOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `${
                            active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                          } cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 