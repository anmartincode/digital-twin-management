import React from 'react';

const FacilityMap: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Facility Map</h1>
        <p className="text-gray-600 mb-4">
          Interactive facility map with real-time location tracking and asset visualization.
        </p>
        
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="text-gray-500 text-lg mb-4">
            🗺️ Interactive Map Component
          </div>
          <p className="text-gray-600">
            Map integration will be implemented here with location services and asset tracking.
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Asset Locations</h3>
            <p className="text-blue-700 text-sm">Track equipment and assets in real-time</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Occupancy</h3>
            <p className="text-green-700 text-sm">Monitor building occupancy and usage</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Navigation</h3>
            <p className="text-purple-700 text-sm">Indoor navigation and wayfinding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityMap; 