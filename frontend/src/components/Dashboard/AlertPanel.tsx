import React from 'react';
import { Alert } from '../../types';
import { Transition } from '@headlessui/react';
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
        return 'border-sky-200 bg-sky-50 dark:border-sky-700/50 dark:bg-sky-900/20';
      case 'warning':
        return 'border-orange-200 bg-orange-50 dark:border-orange-700/50 dark:bg-orange-900/20';
      case 'error':
        return 'border-pink-200 bg-pink-50 dark:border-pink-700/50 dark:bg-pink-900/20';
      case 'critical':
        return 'border-purple-200 bg-purple-50 dark:border-purple-700/50 dark:bg-purple-900/20';
      default:
        return 'border-slate-200 bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/20';
    }
  };

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700">
      <div className="card-header dark:bg-slate-700">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Recent Alerts</h3>
      </div>
      <div className="card-body dark:bg-slate-800">
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <Transition
              show={true}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">No recent alerts</p>
            </Transition>
          ) : (
            alerts.map((alert, index) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <Transition
                  key={alert.id}
                  show={true}
                  enter="transition ease-out duration-300"
                  enterFrom="transform opacity-0 translate-y-2"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 translate-y-2"
                >
                  <div
                    className={`p-3 border-l-4 rounded-r-md ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start">
                      <IconComponent className="text-lg mr-2 text-slate-600 dark:text-slate-400" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white">{alert.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{alert.message}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Transition>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPanel; 