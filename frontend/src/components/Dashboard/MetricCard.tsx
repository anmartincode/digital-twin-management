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
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'negative':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
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
    <div className="card dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      <div className="card-body dark:bg-gray-800 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
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