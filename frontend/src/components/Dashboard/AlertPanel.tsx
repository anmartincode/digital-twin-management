import React from 'react';
import { Alert } from '../../types';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';

interface AlertPanelProps {
  alerts: Alert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'info':
        return InfoIcon;
      case 'warning':
        return WarningIcon;
      case 'error':
        return ErrorIcon;
      case 'critical':
        return ReportIcon;
      default:
        return InfoIcon;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'info':
        return 'border-blue-100 bg-blue-25 dark:border-blue-800 dark:bg-blue-950';
      case 'warning':
        return 'border-amber-100 bg-amber-25 dark:border-amber-800 dark:bg-amber-950';
      case 'error':
        return 'border-red-100 bg-red-25 dark:border-red-800 dark:bg-red-950';
      case 'critical':
        return 'border-orange-100 bg-orange-25 dark:border-orange-800 dark:bg-orange-950';
      default:
        return 'border-gray-100 bg-gray-25 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700">
      <div className="card-header dark:bg-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Alerts</h3>
      </div>
      <div className="card-body dark:bg-gray-800">
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent alerts</p>
          ) : (
            alerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-3 border-l-4 rounded-r-md ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start">
                    <IconComponent className="text-lg mr-2 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{alert.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPanel; 