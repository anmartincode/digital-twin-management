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
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'offline':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400';
    }
  };

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700">
      {/* Table Header */}
      <div className="card-header dark:bg-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">All Facilities</h3>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <FilterListIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <SortIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <SearchIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <MoreVertIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700">
            <GetAppIcon className="h-4 w-4 mr-2 inline" />
            Export
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700">
            <AddIcon className="h-4 w-4 mr-2 inline" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card-body dark:bg-slate-800 p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {facilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                    {facility.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                    {facility.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-sky-600 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{facility.contact.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {facility.contact.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {facility.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                    {facility.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
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