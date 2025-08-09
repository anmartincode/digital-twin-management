import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Menu } from '@headlessui/react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side - Breadcrumbs and Project Info */}
        <div className="flex items-center flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-4"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Projects</span>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Digital Twin</span>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white font-medium">Facility Management</span>
          </nav>
        </div>

        {/* Center - Project Title and Status */}
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏢</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Building Complex</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <VerifiedIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-green-600 dark:text-green-400">Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%234F46E5'/%3E%3Ctext x='8' y='12' text-anchor='middle' fill='white' font-size='10' font-family='Arial'%3EJP%3C/text%3E%3C/svg%3E" alt="Jessica Parker" className="w-4 h-4 rounded-full" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Jessica Parker</span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Edited 7 hrs ago</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          {/* Action buttons */}
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ManageAccountsIcon className="h-4 w-4 mr-2 inline" />
            Manage
          </button>
          
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ShareIcon className="h-4 w-4 mr-2 inline" />
            Share
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <MoreVertIcon className="h-5 w-5" />
            </Menu.Button>
            
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Export Data
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Add New
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
          
          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <NotificationsIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </Menu.Button>
            
            <Menu.Items className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  <strong>Notifications</strong>
                </div>
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No new notifications
                </div>
              </div>
            </Menu.Items>
          </Menu>
          
          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">AM</span>
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">Andy Martinez</span>
              <KeyboardArrowDownIcon className="ml-1 h-4 w-4 text-gray-400" />
            </Menu.Button>
            
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header; 