import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import BIMModel from '../../components/BIM/BIMModel';
import BIMControls from '../../components/BIM/BIMControls';
import BIMInfo from '../../components/BIM/BIMInfo';

const BIMViewer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'wireframe' | 'solid' | 'transparent'>('solid');
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">BIM Viewer</h1>
            <p className="text-gray-600">3D Building Information Model Visualization</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="btn btn-secondary"
            >
              {showStats ? 'Hide' : 'Show'} Stats
            </button>
            <button className="btn btn-primary">
              Upload IFC File
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* 3D View */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [10, 10, 10], fov: 75 }}
            style={{ background: '#f8fafc' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <BIMModel
              viewMode={viewMode}
              onElementSelect={setSelectedElement}
              selectedElement={selectedElement}
            />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxDistance={50}
              minDistance={2}
            />
            
            {showStats && <Stats />}
          </Canvas>
          
          {/* Overlay Controls */}
          <div className="absolute top-4 left-4">
            <BIMControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <BIMInfo
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
          />
        </div>
      </div>
    </div>
  );
};

export default BIMViewer; 