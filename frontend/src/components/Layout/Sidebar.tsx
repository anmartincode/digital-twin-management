import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import MapIcon from '@mui/icons-material/Map';
import SensorsIcon from '@mui/icons-material/Sensors';
import BuildIcon from '@mui/icons-material/Build';
import HandymanIcon from '@mui/icons-material/Handyman';
import BoltIcon from '@mui/icons-material/Bolt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'BIM Viewer', href: '/bim', icon: ViewInArIcon },
  { name: 'Facility Map', href: '/map', icon: MapIcon },
  { name: 'IoT Devices', href: '/iot', icon: SensorsIcon },
  { name: 'Assets', href: '/assets', icon: BuildIcon },
  { name: 'Maintenance', href: '/maintenance', icon: HandymanIcon },
  { name: 'Energy', href: '/energy', icon: BoltIcon },
  { name: 'Analytics', href: '/analytics', icon: AnalyticsIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40 w-16 bg-gray-900 shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-2 border-b border-gray-700">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">DT</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-2">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center justify-center w-12 h-12 text-lg rounded-lg transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                  title={item.name}
                >
                  <IconComponent className="w-6 h-6" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">DT</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Dialog */}
      <Dialog as="div" className="lg:hidden" open={isOpen} onClose={onClose}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-16 bg-gray-900 shadow-lg">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-2 border-b border-gray-700">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">DT</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-6 px-2">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center justify-center w-12 h-12 text-lg rounded-lg transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                    onClick={onClose}
                    title={item.name}
                  >
                    <IconComponent className="w-6 h-6" />
                    
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">DT</span>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Sidebar; 