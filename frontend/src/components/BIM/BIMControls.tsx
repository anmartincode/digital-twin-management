import React from 'react';
import { RadioGroup } from '@headlessui/react';

interface BIMControlsProps {
  viewMode: 'wireframe' | 'solid' | 'transparent';
  onViewModeChange: (mode: 'wireframe' | 'solid' | 'transparent') => void;
}

const BIMControls: React.FC<BIMControlsProps> = ({ viewMode, onViewModeChange }) => {
  const viewModes = [
    { id: 'solid', name: 'Solid', description: 'Full solid rendering' },
    { id: 'wireframe', name: 'Wireframe', description: 'Wireframe view' },
    { id: 'transparent', name: 'Transparent', description: 'Semi-transparent view' },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">View Mode</h3>
      <RadioGroup value={viewMode} onChange={onViewModeChange}>
        <div className="space-y-2">
          {viewModes.map((mode) => (
            <RadioGroup.Option
              key={mode.id}
              value={mode.id}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : ''
                }
                ${
                  checked
                    ? 'bg-blue-100 text-blue-900 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-100'
                }
                relative flex cursor-pointer rounded-lg px-3 py-2 shadow-md focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? 'text-blue-900' : 'text-gray-900'
                          }`}
                        >
                          {mode.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? 'text-blue-700' : 'text-gray-500'
                          }`}
                        >
                          {mode.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-blue-900">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.2" />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default BIMControls; 