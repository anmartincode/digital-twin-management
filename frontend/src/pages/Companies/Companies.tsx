import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Company {
  id: string;
  name: string;
  type: 'vendor' | 'contractor' | 'tenant' | 'service_provider' | 'supplier';
  industry: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  contractValue: string;
  contractStart: string;
  contractEnd: string;
  rating: number;
  location: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  services: string[];
  lastActivity: string;
  facilities: number;
}

const Companies: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const sampleCompanies: Company[] = [
    {
      id: 'CMP-001',
      name: 'TechFlow Solutions',
      type: 'tenant',
      industry: 'Technology',
      status: 'active',
      contractValue: '$2,400,000',
      contractStart: '2023-01-01',
      contractEnd: '2025-12-31',
      rating: 4.8,
      location: 'Floor 15-18, Building A',
      contact: {
        name: 'Jennifer Adams',
        phone: '+1 (555) 123-4567',
        email: 'j.adams@techflow.com'
      },
      services: ['Office Space', 'Meeting Rooms', 'IT Infrastructure'],
      lastActivity: '2024-01-14',
      facilities: 4
    },
    {
      id: 'CMP-002',
      name: 'ProClean Services',
      type: 'service_provider',
      industry: 'Cleaning & Maintenance',
      status: 'active',
      contractValue: '$180,000',
      contractStart: '2023-06-01',
      contractEnd: '2024-05-31',
      rating: 4.5,
      location: 'External Contractor',
      contact: {
        name: 'Michael Rodriguez',
        phone: '+1 (555) 234-5678',
        email: 'm.rodriguez@proclean.com'
      },
      services: ['Janitorial', 'Deep Cleaning', 'Waste Management'],
      lastActivity: '2024-01-15',
      facilities: 12
    },
    {
      id: 'CMP-003',
      name: 'HVAC Masters Inc.',
      type: 'contractor',
      industry: 'HVAC Services',
      status: 'active',
      contractValue: '$850,000',
      contractStart: '2023-03-15',
      contractEnd: '2026-03-14',
      rating: 4.9,
      location: 'On-site Service',
      contact: {
        name: 'David Chen',
        phone: '+1 (555) 345-6789',
        email: 'd.chen@hvacmasters.com'
      },
      services: ['HVAC Maintenance', 'System Upgrades', 'Emergency Repairs'],
      lastActivity: '2024-01-13',
      facilities: 8
    },
    {
      id: 'CMP-004',
      name: 'SecureGuard Security',
      type: 'service_provider',
      industry: 'Security Services',
      status: 'active',
      contractValue: '$320,000',
      contractStart: '2023-01-01',
      contractEnd: '2024-12-31',
      rating: 4.6,
      location: '24/7 On-site',
      contact: {
        name: 'Sarah Wilson',
        phone: '+1 (555) 456-7890',
        email: 's.wilson@secureguard.com'
      },
      services: ['Security Guards', 'Surveillance', 'Access Control'],
      lastActivity: '2024-01-15',
      facilities: 6
    },
    {
      id: 'CMP-005',
      name: 'EcoEnergy Consultants',
      type: 'vendor',
      industry: 'Energy Management',
      status: 'pending',
      contractValue: '$125,000',
      contractStart: '2024-02-01',
      contractEnd: '2025-01-31',
      rating: 4.3,
      location: 'Remote/On-site',
      contact: {
        name: 'Lisa Thompson',
        phone: '+1 (555) 567-8901',
        email: 'l.thompson@ecoenergy.com'
      },
      services: ['Energy Audits', 'Efficiency Consulting', 'Sustainability Planning'],
      lastActivity: '2024-01-10',
      facilities: 3
    },
    {
      id: 'CMP-006',
      name: 'Metro Law Firm',
      type: 'tenant',
      industry: 'Legal Services',
      status: 'active',
      contractValue: '$1,800,000',
      contractStart: '2022-07-01',
      contractEnd: '2027-06-30',
      rating: 4.7,
      location: 'Floor 8-12, Building B',
      contact: {
        name: 'Robert Martinez',
        phone: '+1 (555) 678-9012',
        email: 'r.martinez@metrolaw.com'
      },
      services: ['Office Space', 'Conference Facilities', 'Document Storage'],
      lastActivity: '2024-01-12',
      facilities: 5
    },
    {
      id: 'CMP-007',
      name: 'ElectroFix Solutions',
      type: 'contractor',
      industry: 'Electrical Services',
      status: 'active',
      contractValue: '$420,000',
      contractStart: '2023-09-01',
      contractEnd: '2025-08-31',
      rating: 4.4,
      location: 'On-call Service',
      contact: {
        name: 'James Park',
        phone: '+1 (555) 789-0123',
        email: 'j.park@electrofix.com'
      },
      services: ['Electrical Maintenance', 'Lighting Upgrades', 'Emergency Repairs'],
      lastActivity: '2024-01-11',
      facilities: 7
    },
    {
      id: 'CMP-008',
      name: 'GreenSpace Landscaping',
      type: 'service_provider',
      industry: 'Landscaping',
      status: 'inactive',
      contractValue: '$95,000',
      contractStart: '2023-04-01',
      contractEnd: '2023-12-31',
      rating: 3.8,
      location: 'Outdoor Areas',
      contact: {
        name: 'Maria Garcia',
        phone: '+1 (555) 890-1234',
        email: 'm.garcia@greenspace.com'
      },
      services: ['Landscape Maintenance', 'Seasonal Planting', 'Irrigation'],
      lastActivity: '2023-12-28',
      facilities: 2
    }
  ];

  const getStatusColor = (status: Company['status']) => {
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

  const getTypeColor = (type: Company['type']) => {
    switch (type) {
      case 'tenant':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contractor':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'service_provider':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'vendor':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'supplier':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredCompanies = sampleCompanies.filter(company => {
    const matchesFilter = filter === 'all' || company.type === filter || company.status === filter;
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Companies</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage facility management companies, tenants, and service providers
          </p>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center space-x-2">
          <AddIcon className="h-4 w-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Companies</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
              </div>
              <BusinessIcon className="h-8 w-8 text-sky-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">6</p>
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Tenants</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">T</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Contractors</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">C</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Value</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">$6.2M</p>
              </div>
              <AttachMoneyIcon className="h-8 w-8 text-green-500" />
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
                  <option value="all">All Companies</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="tenant">Tenants</option>
                  <option value="contractor">Contractors</option>
                  <option value="service_provider">Service Providers</option>
                  <option value="vendor">Vendors</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="card dark:bg-slate-800 dark:border-slate-700">
        <div className="card-body dark:bg-slate-800 p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Type & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                          <BusinessIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {company.name}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {company.industry} • {company.facilities} facilities
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getTypeColor(company.type)}`}>
                          {company.type.replace('_', ' ').charAt(0).toUpperCase() + company.type.replace('_', ' ').slice(1)}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(company.status)}`}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900 dark:text-white">{company.contact.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        <PhoneIcon className="h-3 w-3 mr-1" />
                        {company.contact.phone}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        <EmailIcon className="h-3 w-3 mr-1" />
                        {company.contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{company.contractValue}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(company.contractStart).toLocaleDateString()} - {new Date(company.contractEnd).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {renderStars(company.rating)}
                        <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                          {company.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedCompany(company)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md"
                          title="View Details"
                        >
                          <VisibilityIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md" title="Edit Company">
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 rounded-md" title="Delete Company">
                          <DeleteIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredCompanies.length === 0 && (
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-12 text-center">
            <BusinessIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No companies found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
      )}

      {/* Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
              <button 
                onClick={() => setSelectedCompany(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Industry:</span>
                      <span className="text-slate-900 dark:text-white">{selectedCompany.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Type:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(selectedCompany.type)}`}>
                        {selectedCompany.type.replace('_', ' ').charAt(0).toUpperCase() + selectedCompany.type.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedCompany.status)}`}>
                        {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Rating:</span>
                      <div className="flex items-center">
                        {renderStars(selectedCompany.rating)}
                        <span className="ml-2 text-slate-900 dark:text-white">{selectedCompany.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-slate-500 dark:text-slate-400 w-20">Contact:</span>
                      <span className="text-slate-900 dark:text-white">{selectedCompany.contact.name}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-slate-900 dark:text-white">{selectedCompany.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <EmailIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-slate-900 dark:text-white">{selectedCompany.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <LocationOnIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-slate-900 dark:text-white">{selectedCompany.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Contract Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Value:</span>
                      <span className="text-slate-900 dark:text-white font-medium">{selectedCompany.contractValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Start Date:</span>
                      <span className="text-slate-900 dark:text-white">{new Date(selectedCompany.contractStart).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">End Date:</span>
                      <span className="text-slate-900 dark:text-white">{new Date(selectedCompany.contractEnd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Facilities:</span>
                      <span className="text-slate-900 dark:text-white">{selectedCompany.facilities}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Activity</h4>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Last Activity:</span>
                      <span className="text-slate-900 dark:text-white">{new Date(selectedCompany.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies; 