import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import BIMViewer from './pages/BIMViewer/BIMViewer';
import FacilityMap from './pages/FacilityMap/FacilityMap';
import IoTDevices from './pages/IoTDevices/IoTDevices';
import Assets from './pages/Assets/Assets';
import Maintenance from './pages/Maintenance/Maintenance';
import Energy from './pages/Energy/Energy';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bim" element={<BIMViewer />} />
          <Route path="/map" element={<FacilityMap />} />
          <Route path="/iot" element={<IoTDevices />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App; 