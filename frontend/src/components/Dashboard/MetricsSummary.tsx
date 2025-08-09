import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricData {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  suffix?: string;
}

const MetricsSummary: React.FC = () => {
  const metrics: MetricData[] = [
    {
      label: 'Operations',
      value: '5.3',
      change: '+24.8%',
      changeType: 'positive',
      suffix: '/10'
    },
    {
      label: 'Efficiency',
      value: '2.4',
      change: '+3.4%',
      changeType: 'negative',
      suffix: '/10'
    },
    {
      label: 'Satisfaction',
      value: '7.8',
      change: '+12.1%',
      changeType: 'positive',
      suffix: '/10'
    }
  ];

  return (
    <div className="flex items-center space-x-8 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="flex flex-col">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
          <div className="flex items-baseline space-x-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              {metric.suffix && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{metric.suffix}</span>
              )}
            </div>
            <div className={`flex items-center text-xs font-medium ${
              metric.changeType === 'positive' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {metric.changeType === 'positive' ? (
                <TrendingUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDownIcon className="h-3 w-3 mr-1" />
              )}
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsSummary; 