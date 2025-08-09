import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'technician' | 'tenant' | 'contractor' | 'visitor';
  department: string;
  company: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  joinDate: string;
  avatar: string;
  accessLevel: 'full' | 'limited' | 'restricted' | 'view_only';
  permissions: {
    dashboard: boolean;
    analytics: boolean;
    projects: boolean;
    reports: boolean;
    companies: boolean;
    people: boolean;
    settings: boolean;
    maintenance: boolean;
    energy: boolean;
    security: boolean;
  };
  facilities: string[];
}

const People: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);

  const samplePeople: Person[] = [
    {
      id: 'USR-001',
      name: 'Sarah Johnson',
      email: 's.johnson@digitaltwins.com',
      phone: '+1 (555) 123-4567',
      role: 'admin',
      department: 'IT Administration',
      company: 'Digital Twin Management',
      status: 'active',
      lastLogin: '2024-01-15T09:30:00',
      joinDate: '2022-03-15',
      avatar: 'SJ',
      accessLevel: 'full',
      permissions: {
        dashboard: true,
        analytics: true,
        projects: true,
        reports: true,
        companies: true,
        people: true,
        settings: true,
        maintenance: true,
        energy: true,
        security: true
      },
      facilities: ['Building A', 'Building B', 'Building C']
    },
    {
      id: 'USR-002',
      name: 'Mike Chen',
      email: 'm.chen@digitaltwins.com',
      phone: '+1 (555) 234-5678',
      role: 'manager',
      department: 'Facilities Management',
      company: 'Digital Twin Management',
      status: 'active',
      lastLogin: '2024-01-15T08:45:00',
      joinDate: '2022-07-20',
      avatar: 'MC',
      accessLevel: 'limited',
      permissions: {
        dashboard: true,
        analytics: true,
        projects: true,
        reports: true,
        companies: true,
        people: false,
        settings: false,
        maintenance: true,
        energy: true,
        security: true
      },
      facilities: ['Building A', 'Building B']
    },
    {
      id: 'USR-003',
      name: 'Emily Rodriguez',
      email: 'e.rodriguez@digitaltwins.com',
      phone: '+1 (555) 345-6789',
      role: 'technician',
      department: 'Maintenance',
      company: 'Digital Twin Management',
      status: 'active',
      lastLogin: '2024-01-14T16:20:00',
      joinDate: '2023-01-10',
      avatar: 'ER',
      accessLevel: 'restricted',
      permissions: {
        dashboard: true,
        analytics: false,
        projects: false,
        reports: false,
        companies: false,
        people: false,
        settings: false,
        maintenance: true,
        energy: true,
        security: false
      },
      facilities: ['Building A']
    },
    {
      id: 'USR-004',
      name: 'David Park',
      email: 'd.park@techflow.com',
      phone: '+1 (555) 456-7890',
      role: 'tenant',
      department: 'Operations',
      company: 'TechFlow Solutions',
      status: 'active',
      lastLogin: '2024-01-15T11:15:00',
      joinDate: '2023-01-01',
      avatar: 'DP',
      accessLevel: 'view_only',
      permissions: {
        dashboard: true,
        analytics: true,
        projects: false,
        reports: true,
        companies: false,
        people: false,
        settings: false,
        maintenance: false,
        energy: true,
        security: false
      },
      facilities: ['Building A - Floor 15-18']
    },
    {
      id: 'USR-005',
      name: 'Lisa Thompson',
      email: 'l.thompson@hvacmasters.com',
      phone: '+1 (555) 567-8901',
      role: 'contractor',
      department: 'HVAC Services',
      company: 'HVAC Masters Inc.',
      status: 'active',
      lastLogin: '2024-01-13T14:30:00',
      joinDate: '2023-03-15',
      avatar: 'LT',
      accessLevel: 'restricted',
      permissions: {
        dashboard: true,
        analytics: false,
        projects: false,
        reports: false,
        companies: false,
        people: false,
        settings: false,
        maintenance: true,
        energy: true,
        security: false
      },
      facilities: ['Building A', 'Building B']
    },
    {
      id: 'USR-006',
      name: 'Jennifer Adams',
      email: 'j.adams@metrolaw.com',
      phone: '+1 (555) 678-9012',
      role: 'tenant',
      department: 'Legal',
      company: 'Metro Law Firm',
      status: 'active',
      lastLogin: '2024-01-15T10:45:00',
      joinDate: '2022-07-01',
      avatar: 'JA',
      accessLevel: 'view_only',
      permissions: {
        dashboard: true,
        analytics: true,
        projects: false,
        reports: true,
        companies: false,
        people: false,
        settings: false,
        maintenance: false,
        energy: true,
        security: false
      },
      facilities: ['Building B - Floor 8-12']
    },
    {
      id: 'USR-007',
      name: 'Robert Martinez',
      email: 'r.martinez@digitaltwins.com',
      phone: '+1 (555) 789-0123',
      role: 'manager',
      department: 'Security',
      company: 'Digital Twin Management',
      status: 'active',
      lastLogin: '2024-01-15T07:00:00',
      joinDate: '2022-11-01',
      avatar: 'RM',
      accessLevel: 'limited',
      permissions: {
        dashboard: true,
        analytics: true,
        projects: false,
        reports: true,
        companies: true,
        people: true,
        settings: false,
        maintenance: false,
        energy: false,
        security: true
      },
      facilities: ['Building A', 'Building B', 'Building C']
    },
    {
      id: 'USR-008',
      name: 'Maria Garcia',
      email: 'm.garcia@visitor.temp',
      phone: '+1 (555) 890-1234',
      role: 'visitor',
      department: 'Consulting',
      company: 'External Consultant',
      status: 'pending',
      lastLogin: '2024-01-10T15:30:00',
      joinDate: '2024-01-10',
      avatar: 'MG',
      accessLevel: 'view_only',
      permissions: {
        dashboard: true,
        analytics: false,
        projects: false,
        reports: false,
        companies: false,
        people: false,
        settings: false,
        maintenance: false,
        energy: false,
        security: false
      },
      facilities: ['Building A - Lobby']
    }
  ];

  const getRoleColor = (role: Person['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'technician':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'tenant':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'contractor':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'visitor':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400';
    }
  };

  const getStatusColor = (status: Person['status']) => {
    switch (status) {
      case 'active':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'inactive':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-300';
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'suspended':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400';
    }
  };

  const getAccessLevelColor = (level: Person['accessLevel']) => {
    switch (level) {
      case 'full':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'limited':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'restricted':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'view_only':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredPeople = samplePeople.filter(person => {
    const matchesFilter = filter === 'all' || person.role === filter || person.status === filter;
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getRoleIcon = (role: Person['role']) => {
    switch (role) {
      case 'admin':
        return AdminPanelSettingsIcon;
      case 'manager':
        return BadgeIcon;
      case 'technician':
        return BusinessIcon;
      case 'tenant':
        return PersonIcon;
      case 'contractor':
        return BusinessIcon;
      case 'visitor':
        return PersonIcon;
      default:
        return PersonIcon;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">People</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage user access and permissions for facility operations
          </p>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center space-x-2">
          <AddIcon className="h-4 w-4" />
          <span>Add Person</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
              </div>
              <PersonIcon className="h-8 w-8 text-sky-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">7</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Admins</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</p>
              </div>
              <AdminPanelSettingsIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Managers</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</p>
              </div>
              <BadgeIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">External</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</p>
              </div>
              <BusinessIcon className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card dark:bg-slate-800 dark:border-slate-700">
        <div className="card-body p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FilterListIcon className="h-5 w-5 text-slate-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="admin">Admins</option>
                  <option value="manager">Managers</option>
                  <option value="technician">Technicians</option>
                  <option value="tenant">Tenants</option>
                  <option value="contractor">Contractors</option>
                  <option value="visitor">Visitors</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* People Table */}
      <div className="card dark:bg-slate-800 dark:border-slate-700">
        <div className="card-body dark:bg-slate-800 p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Role & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredPeople.map((person) => {
                  const RoleIcon = getRoleIcon(person.role);
                  return (
                    <tr key={person.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{person.avatar}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {person.name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {person.department} • {person.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(person.role)}`}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(person.status)}`}>
                            {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 dark:text-white flex items-center">
                          <EmailIcon className="h-3 w-3 mr-1" />
                          {person.email}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                          <PhoneIcon className="h-3 w-3 mr-1" />
                          {person.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getAccessLevelColor(person.accessLevel)}`}>
                          <LockIcon className="h-3 w-3 mr-1" />
                          {person.accessLevel.replace('_', ' ').charAt(0).toUpperCase() + person.accessLevel.replace('_', ' ').slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                        {new Date(person.lastLogin).toLocaleDateString()} {new Date(person.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setSelectedPerson(person)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md"
                            title="View Details"
                          >
                            <VisibilityIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedPerson(person);
                              setShowPermissions(true);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
                            title="Manage Permissions"
                          >
                            <SecurityIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md" title="Edit User">
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 rounded-md" title="Delete User">
                            <DeleteIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredPeople.length === 0 && (
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-12 text-center">
            <PersonIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No people found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedPerson && !showPermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedPerson.name}</h3>
              <button 
                onClick={() => setSelectedPerson(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">User Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Role:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(selectedPerson.role)}`}>
                        {selectedPerson.role.charAt(0).toUpperCase() + selectedPerson.role.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPerson.status)}`}>
                        {selectedPerson.status.charAt(0).toUpperCase() + selectedPerson.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Department:</span>
                      <span className="text-slate-900 dark:text-white">{selectedPerson.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Company:</span>
                      <span className="text-slate-900 dark:text-white">{selectedPerson.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Join Date:</span>
                      <span className="text-slate-900 dark:text-white">{new Date(selectedPerson.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <EmailIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-slate-900 dark:text-white">{selectedPerson.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-slate-900 dark:text-white">{selectedPerson.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Access Level</h4>
                  <span className={`inline-flex px-3 py-2 text-sm font-medium rounded border ${getAccessLevelColor(selectedPerson.accessLevel)}`}>
                    <LockIcon className="h-4 w-4 mr-2" />
                    {selectedPerson.accessLevel.replace('_', ' ').charAt(0).toUpperCase() + selectedPerson.accessLevel.replace('_', ' ').slice(1)}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Facility Access</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.facilities.map((facility, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Activity</h4>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Last Login:</span>
                      <span className="text-slate-900 dark:text-white">
                        {new Date(selectedPerson.lastLogin).toLocaleDateString()} {new Date(selectedPerson.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowPermissions(true);
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Manage Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {selectedPerson && showPermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Permissions for {selectedPerson.name}
              </h3>
              <button 
                onClick={() => {
                  setShowPermissions(false);
                  setSelectedPerson(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">Access Level</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Current access level determines base permissions</p>
                </div>
                <span className={`px-3 py-2 text-sm font-medium rounded border ${getAccessLevelColor(selectedPerson.accessLevel)}`}>
                  {selectedPerson.accessLevel.replace('_', ' ').charAt(0).toUpperCase() + selectedPerson.accessLevel.replace('_', ' ').slice(1)}
                </span>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">Module Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedPerson.permissions).map(([module, hasAccess]) => (
                    <div key={module} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                          {module.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {hasAccess ? (
                          <CheckCircleIcon className="h-5 w-5 text-teal-500" />
                        ) : (
                          <CancelIcon className="h-5 w-5 text-slate-400" />
                        )}
                        <span className={`ml-2 text-sm ${hasAccess ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          {hasAccess ? 'Granted' : 'Denied'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">Facility Access</h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedPerson.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <span className="text-sm text-slate-900 dark:text-white">{facility}</span>
                      <CheckCircleIcon className="h-5 w-5 text-teal-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowPermissions(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Back
              </button>
              <button 
                onClick={() => {
                  alert('This would open a permission editor to modify user access levels and specific module permissions.');
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Edit Permissions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People; 