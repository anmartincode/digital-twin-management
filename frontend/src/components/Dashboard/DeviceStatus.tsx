import React from 'react';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import GroupsIcon from '@mui/icons-material/Groups';
import BoltIcon from '@mui/icons-material/Bolt';
import VideocamIcon from '@mui/icons-material/Videocam';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const DeviceStatus: React.FC = () => {
  const deviceCategories = [
    { name: 'Temperature Sensors', count: 45, online: 42, icon: ThermostatIcon },
    { name: 'Humidity Sensors', count: 32, online: 30, icon: OpacityIcon },
    { name: 'Occupancy Sensors', count: 28, online: 26, icon: GroupsIcon },
    { name: 'Energy Meters', count: 15, online: 15, icon: BoltIcon },
    { name: 'Security Cameras', count: 24, online: 22, icon: VideocamIcon },
    { name: 'HVAC Controllers', count: 12, online: 7, icon: AcUnitIcon },
  ];

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700">
      <div className="card-header dark:bg-slate-700">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Device Status</h3>
      </div>
      <div className="card-body dark:bg-slate-800">
        <div className="space-y-3">
          {deviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <IconComponent className="text-lg mr-2 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{category.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.online}/{category.count} online
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${(category.online / category.count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {Math.round((category.online / category.count) * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Total Devices</span>
            <span className="font-medium text-slate-900 dark:text-white">156</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-slate-600 dark:text-slate-400">Online</span>
            <span className="font-medium text-teal-600 dark:text-teal-400">142</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-slate-600 dark:text-slate-400">Offline</span>
            <span className="font-medium text-pink-600 dark:text-pink-400">14</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus; 