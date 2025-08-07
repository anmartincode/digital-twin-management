import React from 'react';

interface BIMControlsProps {
  viewMode: 'wireframe' | 'solid' | 'transparent';
  onViewModeChange: (mode: 'wireframe' | 'solid' | 'transparent') => void;
}

const BIMControls: React.FC<BIMControlsProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">View Mode</h3>
      <div className="space-y-2">
        <button
          onClick={() => onViewModeChange('solid')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${
            viewMode === 'solid' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Solid
        </button>
        <button
          onClick={() => onViewModeChange('wireframe')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${
            viewMode === 'wireframe' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Wireframe
        </button>
        <button
          onClick={() => onViewModeChange('transparent')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${
            viewMode === 'transparent' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Transparent
        </button>
      </div>
    </div>
  );
};

export default BIMControls; 