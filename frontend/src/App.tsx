import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
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
import Projects from './pages/Projects/Projects';
import Reports from './pages/Reports/Reports';
import Companies from './pages/Companies/Companies';
import People from './pages/People/People';

const App: React.FC = () => {
  return (
    <ThemeProvider>
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/people" element={<People />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default App; 