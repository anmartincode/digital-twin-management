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
import FolderIcon from '@mui/icons-material/Folder';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExtensionIcon from '@mui/icons-material/Extension';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

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

const secondaryNavigation = [
  { name: 'Projects', icon: FolderIcon, count: '3/5' },
  { name: 'Analytics', icon: BarChartIcon },
  { name: 'Reports', icon: AnalyticsIcon, badge: 'New' },
  { name: 'Extensions', icon: ExtensionIcon },
  { name: 'Companies', icon: BusinessIcon, count: '17' },
  { name: 'People', icon: PeopleIcon, count: '164' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-start h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">DT</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Digital Twin</span>
        </div>
      </div>
      
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400 text-xs font-medium">⌘K</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="pt-8">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.name}
                  </div>
                  {item.count && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.count}</span>
                  )}
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Overview */}
        <div className="pt-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Digital Twin Overview</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">3 of 5 facilities active</div>
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-6 rounded ${i <= 3 ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-200 dark:bg-gray-600'}`}
                />
              ))}
            </div>
            <button className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Get full access
              <span className="ml-1">🚀</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button className="flex items-center p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
            <HelpOutlineIcon className="w-5 h-5" />
          </button>
          <button className="flex items-center p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md relative">
            <NotificationsIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">3</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Dialog */}
      <Dialog as="div" className="lg:hidden" open={isOpen} onClose={onClose}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg">
          <SidebarContent />
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Sidebar; 