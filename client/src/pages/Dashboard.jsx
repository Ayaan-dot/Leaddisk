import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Plus, Users, TrendingUp, Target, Activity, ChevronUp, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import LeadTable from '../components/LeadTable';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import { SkeletonStats, SkeletonTable } from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../hooks/useLeads';
import { motion } from 'framer-motion';

function DashboardHome() {
  const { user } = useAuth();
  const { leads, loading, error, totalPages, currentPage, totalLeads, fetchLeads, createLead, updateLeadStatus, deleteLead } = useLeads();
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearch = useCallback((term) => { setSearch(term); fetchLeads(1, term); }, [fetchLeads]);
  const handlePageChange = (page) => { fetchLeads(page, search); };
  const handleCreateLead = async (formData) => { await createLead(formData); setShowCreateModal(false); };

  const stats = { total: totalLeads || leads.length, new: leads.filter(l => l.status === 'new').length, qualified: leads.filter(l => l.status === 'qualified' || l.status === 'proposal').length, closed: leads.filter(l => l.status === 'closed').length };
  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, trend: '+12%', color: 'emerald' },
    { label: 'Active Leads', value: stats.new, icon: Activity, trend: '+5%', color: 'amber' },
    { label: 'Qualified', value: stats.qualified, icon: Target, trend: '+8%', color: 'teal' },
    { label: 'Closed Won', value: stats.closed, icon: TrendingUp, trend: '+23%', color: 'emerald' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'User'}</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />Add Lead
        </button>
      </div>

      {/* Stats */}
      {loading && leads.length === 0 ? (
        <SkeletonStats />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {statCards.map(function(card) { return (
            <div key={card.label} className="card-premium">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  card.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/30' :
                  card.color === 'amber' ? 'bg-amber-50 dark:bg-amber-900/30' :
                  'bg-teal-50 dark:bg-teal-900/30'
                }`}>
                  <card.icon className={`w-5 h-5 ${
                    card.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                    card.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                    'text-teal-600 dark:text-teal-400'
                  }`} />
                </div>
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                  <ChevronUp className="w-3 h-3" />
                  {card.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          ); })}
        </motion.div>
      )}

      {/* Leads Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Leads</h2>
          <SearchBar onSearch={handleSearch} className="w-full sm:w-72" />
        </div>

        {error ? (
          <div className="card-premium text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            <button onClick={() => fetchLeads(1)} className="btn-secondary mt-4">Retry</button>
          </div>
        ) : loading && leads.length === 0 ? (
          <SkeletonTable rows={5} />
        ) : leads.length === 0 ? (
          <EmptyState
            title={search ? 'No leads found' : 'No leads yet'}
            description={search ? 'Try a different search term' : 'Create your first lead to get started'}
            action={
              <button onClick={() => setShowCreateModal(true)} className="btn-primary gap-2">
                <Plus className="w-4 h-4" />Add Lead
              </button>
            }
          />
        ) : (
          <LeadTable
            leads={leads}
            onStatusChange={updateLeadStatus}
            onDelete={deleteLead}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalLeads={totalLeads}
          />
        )}
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Lead">
        <LeadForm onSubmit={handleCreateLead} />
      </Modal>
    </div>
  );
}

function LeadsPage() {
  const { leads, loading, totalPages, currentPage, totalLeads, fetchLeads, updateLeadStatus, deleteLead } = useLeads();
  const [search, setSearch] = useState('');
  const handleSearch = useCallback((term) => { setSearch(term); fetchLeads(1, term); }, [fetchLeads]);
  const handlePageChange = (page) => { fetchLeads(page, search); };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all your leads</p>
      </div>
      <SearchBar onSearch={handleSearch} className="max-w-md" />
      {loading && leads.length === 0 ? (
        <SkeletonTable rows={5} />
      ) : leads.length === 0 ? (
        <EmptyState
          title={search ? 'No leads found' : 'No leads yet'}
          description={search ? 'Try a different search term' : 'No leads have been added yet'}
        />
      ) : (
        <LeadTable
          leads={leads}
          onStatusChange={updateLeadStatus}
          onDelete={deleteLead}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalLeads={totalLeads}
        />
      )}
    </div>
  );
}

function AnalyticsPage() {
  const pipelineData = [
    { stage: 'New Leads', count: 24, color: 'bg-emerald-500', max: 24 },
    { stage: 'Contacted', count: 18, color: 'bg-amber-500', max: 24 },
    { stage: 'Qualified', count: 12, color: 'bg-teal-500', max: 24 },
    { stage: 'Proposal', count: 8, color: 'bg-blue-500', max: 24 },
    { stage: 'Closed Won', count: 6, color: 'bg-green-500', max: 24 },
  ];
  const quickStatsData = [
    { label: 'Conversion Rate', value: '24.8%', trend: '+4.2%', positive: true },
    { label: 'Avg. Response Time', value: '2.4 hrs', trend: '-12%', positive: false },
    { label: 'Active Deals', value: '42', trend: '+8%', positive: true },
    { label: 'Team Members', value: '8', trend: '0%', positive: true },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Pipeline Overview</h3>
          <div className="space-y-4">
            {pipelineData.map(function(item) {
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{item.stage}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: ((item.count / item.max) * 100) + '%' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {quickStatsData.map(function(item) {
              return (
                <div key={item.label} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                    <span className={`text-xs font-medium ${item.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences</p>
      </div>
      <div className="card-premium max-w-2xl">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="label-premium">Full Name</label>
            <input type="text" className="input-premium" placeholder="Your name" />
          </div>
          <div>
            <label className="label-premium">Email</label>
            <input type="email" className="input-premium" placeholder="your@email.com" />
          </div>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
}

