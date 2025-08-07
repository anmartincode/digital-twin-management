import React from 'react';
import { Alert } from '../../types';

interface AlertPanelProps {
  alerts: Alert[];
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'critical':
        return '🚨';
      default:
        return '📢';
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'critical':
        return 'border-red-300 bg-red-100';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
      </div>
      <div className="card-body">
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 border-l-4 rounded-r-md ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start">
                  <span className="text-lg mr-2">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPanel; 