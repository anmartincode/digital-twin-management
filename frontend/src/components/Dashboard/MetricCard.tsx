import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success-600 bg-success-100';
      case 'negative':
        return 'text-danger-600 bg-danger-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
        
        {change && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChangeColor()}`}>
              <span className="mr-1">{getChangeIcon()}</span>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard; 