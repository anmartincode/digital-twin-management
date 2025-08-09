import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  budget: string;
  category: 'HVAC' | 'Security' | 'Energy' | 'Maintenance' | 'Infrastructure';
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const sampleProjects: Project[] = [
    {
      id: 'PRJ-001',
      name: 'HVAC System Upgrade',
      description: 'Complete overhaul of building HVAC systems with smart controls and energy-efficient units.',
      status: 'active',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      manager: 'Sarah Johnson',
      budget: '$485,000',
      category: 'HVAC'
    },
    {
      id: 'PRJ-002',
      name: 'Security Camera Installation',
      description: 'Install new IP cameras and upgrade security monitoring systems across all floors.',
      status: 'active',
      progress: 40,
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      manager: 'Mike Chen',
      budget: '$125,000',
      category: 'Security'
    },
    {
      id: 'PRJ-003',
      name: 'LED Lighting Conversion',
      description: 'Replace all fluorescent lighting with energy-efficient LED systems.',
      status: 'completed',
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-01-30',
      manager: 'Emily Rodriguez',
      budget: '$95,000',
      category: 'Energy'
    },
    {
      id: 'PRJ-004',
      name: 'Fire Safety System Upgrade',
      description: 'Modernize fire detection and suppression systems to meet new safety standards.',
      status: 'planning',
      progress: 10,
      startDate: '2024-04-01',
      endDate: '2024-08-15',
      manager: 'David Park',
      budget: '$320,000',
      category: 'Infrastructure'
    },
    {
      id: 'PRJ-005',
      name: 'Preventive Maintenance Program',
      description: 'Implement IoT-based predictive maintenance for critical building systems.',
      status: 'on-hold',
      progress: 25,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      manager: 'Lisa Thompson',
      budget: '$180,000',
      category: 'Maintenance'
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'completed':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'planning':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400';
    }
  };

  const getCategoryColor = (category: Project['category']) => {
    switch (category) {
      case 'HVAC':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Security':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Energy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Maintenance':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Infrastructure':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredProjects = sampleProjects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and track facility improvement projects
          </p>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center space-x-2">
          <AddIcon className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
              </div>
              <FolderIcon className="h-8 w-8 text-sky-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">2</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-teal-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">1</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Budget</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$1.2M</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-bold">$</span>
              </div>
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
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="planning">Planning</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <div className="card-body p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <MoreVertIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Progress</span>
                  <span className="font-medium text-slate-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <PersonIcon className="h-4 w-4 mr-2" />
                  <span>{project.manager}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <CalendarTodayIcon className="h-4 w-4 mr-2" />
                  <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Budget:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{project.budget}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-12 text-center">
            <FolderIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects; 