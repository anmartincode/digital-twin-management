import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'budget' | 'energy' | 'combined' | 'maintenance' | 'occupancy';
  status: 'draft' | 'published' | 'scheduled';
  lastGenerated: string;
  frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'excel' | 'csv';
  size: string;
  author: string;
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'templates' | 'scheduled'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');

  const sampleReports: Report[] = [
    {
      id: 'RPT-001',
      name: 'Monthly Budget & Energy Report',
      description: 'Comprehensive monthly report combining budget analysis and energy consumption metrics.',
      type: 'combined',
      status: 'published',
      lastGenerated: '2024-01-15',
      frequency: 'monthly',
      format: 'pdf',
      size: '2.4 MB',
      author: 'Sarah Johnson'
    },
    {
      id: 'RPT-002',
      name: 'Energy Consumption Analysis',
      description: 'Detailed analysis of energy usage patterns and cost optimization opportunities.',
      type: 'energy',
      status: 'published',
      lastGenerated: '2024-01-14',
      frequency: 'weekly',
      format: 'excel',
      size: '1.8 MB',
      author: 'Mike Chen'
    },
    {
      id: 'RPT-003',
      name: 'Quarterly Budget Summary',
      description: 'Executive summary of quarterly budget performance across all facility systems.',
      type: 'budget',
      status: 'draft',
      lastGenerated: '2024-01-10',
      frequency: 'manual',
      format: 'pdf',
      size: '1.2 MB',
      author: 'Emily Rodriguez'
    },
    {
      id: 'RPT-004',
      name: 'Daily Operations Dashboard',
      description: 'Real-time snapshot of facility operations including energy and maintenance metrics.',
      type: 'combined',
      status: 'scheduled',
      lastGenerated: '2024-01-15',
      frequency: 'daily',
      format: 'pdf',
      size: '0.8 MB',
      author: 'David Park'
    },
    {
      id: 'RPT-005',
      name: 'Maintenance Cost Analysis',
      description: 'Analysis of maintenance expenses and predictive maintenance savings.',
      type: 'maintenance',
      status: 'published',
      lastGenerated: '2024-01-12',
      frequency: 'monthly',
      format: 'excel',
      size: '3.1 MB',
      author: 'Lisa Thompson'
    }
  ];

  const reportTemplates = [
    {
      id: 'TPL-001',
      name: 'Budget & Energy Combined Report',
      description: 'Template for comprehensive reports combining budget analysis with energy consumption data',
      icon: BarChartIcon,
      color: 'bg-sky-100 text-sky-700'
    },
    {
      id: 'TPL-002',
      name: 'Energy Efficiency Report',
      description: 'Focused template for energy consumption analysis and efficiency metrics',
      icon: AssessmentIcon,
      color: 'bg-teal-100 text-teal-700'
    },
    {
      id: 'TPL-003',
      name: 'Financial Performance Report',
      description: 'Budget analysis template with cost breakdowns and variance analysis',
      icon: TableChartIcon,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'TPL-004',
      name: 'Executive Summary',
      description: 'High-level overview template for executive stakeholders',
      icon: PictureAsPdfIcon,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'published':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'draft':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'scheduled':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400';
    }
  };

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'combined':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'budget':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'energy':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'occupancy':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const generateSampleReport = (reportId: string) => {
    const report = sampleReports.find(r => r.id === reportId);
    if (report) {
      alert(`Generating ${report.name}...\n\nThis would typically:\n1. Collect budget data from the financial system\n2. Gather energy consumption metrics\n3. Combine data into a formatted report\n4. Export to ${report.format.toUpperCase()} format`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Generate and manage facility reports combining budget and energy data
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center space-x-2"
        >
          <AddIcon className="h-4 w-4" />
          <span>Create Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Reports</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
              </div>
              <AssessmentIcon className="h-8 w-8 text-sky-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Published</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">3</p>
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled</p>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">1</p>
              </div>
              <ScheduleIcon className="h-8 w-8 text-sky-500" />
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">This Month</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</p>
              </div>
              <CalendarTodayIcon className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Reports', count: sampleReports.length },
            { key: 'templates', label: 'Templates', count: reportTemplates.length },
            { key: 'scheduled', label: 'Scheduled', count: sampleReports.filter(r => r.status === 'scheduled').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Report Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTemplates.map((template) => {
            const IconComponent = template.icon;
            return (
              <div key={template.id} className="card dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="card-body p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{template.description}</p>
                  <button 
                    onClick={() => generateSampleReport('RPT-001')}
                    className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* All Reports and Scheduled Tabs */}
      {(activeTab === 'all' || activeTab === 'scheduled') && (
        <>
          {/* Filters */}
          <div className="card dark:bg-slate-800 dark:border-slate-700">
            <div className="card-body p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <FilterListIcon className="h-5 w-5 text-slate-500" />
                  <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500">
                    <option value="all">All Types</option>
                    <option value="combined">Combined</option>
                    <option value="budget">Budget</option>
                    <option value="energy">Energy</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <SearchIcon className="h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {sampleReports
              .filter(report => activeTab === 'all' || report.status === 'scheduled')
              .map((report) => (
              <div key={report.id} className="card dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="card-body p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{report.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(report.type)}`}>
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">{report.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Author:</span>
                          <span className="ml-1 text-slate-900 dark:text-white">{report.author}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Last Generated:</span>
                          <span className="ml-1 text-slate-900 dark:text-white">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Frequency:</span>
                          <span className="ml-1 text-slate-900 dark:text-white">{report.frequency}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Size:</span>
                          <span className="ml-1 text-slate-900 dark:text-white">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => generateSampleReport(report.id)}
                        className="p-2 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 rounded-md"
                        title="Generate Report"
                      >
                        <GetAppIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md" title="View Report">
                        <VisibilityIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md" title="Edit Report">
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 rounded-md" title="Delete Report">
                        <DeleteIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Report Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Create New Report</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This would open a report builder where you can:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-6">
              <li>Select data sources (Budget, Energy, Maintenance)</li>
              <li>Choose time ranges and filters</li>
              <li>Configure report layout and formatting</li>
              <li>Set up scheduling and distribution</li>
            </ul>
            <div className="flex items-center justify-end space-x-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  generateSampleReport('RPT-001');
                }}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 