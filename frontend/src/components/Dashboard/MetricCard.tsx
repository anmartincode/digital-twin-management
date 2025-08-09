import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: SvgIconComponent;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: IconComponent
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-900/30';
      case 'negative':
        return 'text-pink-700 bg-pink-50 dark:text-pink-300 dark:bg-pink-900/30';
      default:
        return 'text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-800/30';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg transition-shadow duration-200">
      <div className="card-body dark:bg-slate-800 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <IconComponent className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
            {change && (
              <div className="flex items-center">
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getChangeColor()}`}>
                  <span className="mr-1">{getChangeIcon()}</span>
                  {change}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 