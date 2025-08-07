import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

interface BIMModelProps {
  viewMode: 'wireframe' | 'solid' | 'transparent';
  onElementSelect: (elementId: string | null) => void;
  selectedElement: string | null;
}

const BIMModel: React.FC<BIMModelProps> = ({ viewMode, onElementSelect, selectedElement }) => {
  // Placeholder BIM model - in a real implementation, this would load actual IFC data
  const elements = [
    { id: 'wall-1', position: [0, 2, 0], size: [10, 4, 0.2], color: '#8B4513' },
    { id: 'wall-2', position: [5, 2, 0], size: [0.2, 4, 10], color: '#8B4513' },
    { id: 'floor', position: [0, 0, 0], size: [10, 0.2, 10], color: '#696969' },
    { id: 'ceiling', position: [0, 4, 0], size: [10, 0.2, 10], color: '#D3D3D3' },
    { id: 'column-1', position: [2, 2, 2], size: [0.5, 4, 0.5], color: '#A0522D' },
    { id: 'column-2', position: [2, 2, -2], size: [0.5, 4, 0.5], color: '#A0522D' },
  ];

  const handleClick = (elementId: string) => {
    onElementSelect(selectedElement === elementId ? null : elementId);
  };

  return (
    <group>
      {elements.map((element) => (
        <Box
          key={element.id}
          position={element.position as [number, number, number]}
          args={element.size as [number, number, number]}
          onClick={() => handleClick(element.id)}
        >
          <meshStandardMaterial
            color={selectedElement === element.id ? '#FFD700' : element.color}
            transparent={viewMode === 'transparent'}
            opacity={viewMode === 'transparent' ? 0.6 : 1}
            wireframe={viewMode === 'wireframe'}
          />
        </Box>
      ))}
    </group>
  );
};

export default BIMModel; 