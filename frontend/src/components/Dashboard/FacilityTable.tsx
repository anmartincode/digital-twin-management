import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface FacilityData {
  id: string;
  name: string;
  contact: {
    name: string;
    avatar: string;
  };
  email: string;
  value: string;
  source: string;
  status: 'active' | 'maintenance' | 'offline';
}

const FacilityTable: React.FC = () => {
  const facilities: FacilityData[] = [
    {
      id: '01',
      name: 'HVAC System Alpha',
      contact: { name: 'Tyra Dhillon', avatar: 'TD' },
      email: 'tyradhillon@facility.com',
      value: '$3,912',
      source: 'IoT Sensors',
      status: 'active'
    },
    {
      id: '02',
      name: 'Energy Management Hub',
      contact: { name: 'Brittni Lando', avatar: 'BL' },
      email: 'lando@energyproject.com',
      value: '$2,345',
      source: 'Smart Meters',
      status: 'active'
    },
    {
      id: '03',
      name: 'Security System',
      contact: { name: 'Kevin Chen', avatar: 'KC' },
      email: 'chen@security.com',
      value: '$13,864',
      source: 'Access Control',
      status: 'maintenance'
    },
    {
      id: '04',
      name: 'Lighting Control Network',
      contact: { name: 'Josh Ryan', avatar: 'JR' },
      email: 'joshryan@lighting.com',
      value: '$6,314',
      source: 'Building Automation',
      status: 'active'
    },
    {
      id: '05',
      name: 'Fire Safety System',
      contact: { name: 'Chieko Chute', avatar: 'CC' },
      email: 'chieko67@firesafety.com',
      value: '$5,982',
      source: 'Safety Sensors',
      status: 'offline'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700">
      {/* Table Header */}
      <div className="card-header dark:bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Facilities</h3>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
            <FilterListIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
            <SortIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
            <SearchIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md">
            <MoreVertIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <GetAppIcon className="h-4 w-4 mr-2 inline" />
            Export
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">
            <AddIcon className="h-4 w-4 mr-2 inline" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card-body dark:bg-gray-800 p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {facilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {facility.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {facility.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{facility.contact.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {facility.contact.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {facility.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {facility.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {facility.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(facility.status)}`}>
                      {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacilityTable; 