import React from 'react';

interface BIMInfoProps {
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
}

const BIMInfo: React.FC<BIMInfoProps> = ({ selectedElement, onElementSelect }) => {
  const elementData = {
    'wall-1': { name: 'Exterior Wall', type: 'Wall', material: 'Concrete', area: '40 m²' },
    'wall-2': { name: 'Interior Wall', type: 'Wall', material: 'Drywall', area: '40 m²' },
    'floor': { name: 'Ground Floor', type: 'Floor', material: 'Concrete', area: '100 m²' },
    'ceiling': { name: 'Ceiling', type: 'Ceiling', material: 'Gypsum', area: '100 m²' },
    'column-1': { name: 'Structural Column', type: 'Column', material: 'Steel', area: '2 m²' },
    'column-2': { name: 'Structural Column', type: 'Column', material: 'Steel', area: '2 m²' },
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">BIM Information</h3>
      
      {selectedElement && elementData[selectedElement as keyof typeof elementData] ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              {elementData[selectedElement as keyof typeof elementData].name}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Type:</span>
                <span className="text-blue-900">{elementData[selectedElement as keyof typeof elementData].type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Material:</span>
                <span className="text-blue-900">{elementData[selectedElement as keyof typeof elementData].material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Area:</span>
                <span className="text-blue-900">{elementData[selectedElement as keyof typeof elementData].area}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onElementSelect(null)}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Clear Selection
          </button>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          <div className="text-4xl mb-2">🏗️</div>
          <p>Click on a building element to view its information</p>
        </div>
      )}
    </div>
  );
};

export default BIMInfo; 