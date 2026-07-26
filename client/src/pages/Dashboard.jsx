import { useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import LeadTable from '../components/LeadTable';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';
import { useLeads } from '../hooks/useLeads';

export default function Dashboard() {
  const {
    leads,
    loading,
    stats,
    statsLoading,
    statusFilter,
    searchQuery,
    isSearching,
    totalLeads,
    totalPages,
    page,
    handleStatusFilter,
    updateLeadStatus,
    handleSearch,
    changePage,
  } = useLeads();

  const [statusModal, setStatusModal] = useState({ open: false, leadId: '', newStatus: '' });

  const handleStatusClick = useCallback((leadId, newStatus) => {
    setStatusModal({ open: true, leadId, newStatus });
  }, []);

  const confirmStatusChange = async () => {
    await updateLeadStatus(statusModal.leadId, statusModal.newStatus);
    setStatusModal({ open: false, leadId: '', newStatus: '' });
  };

  const closeStatusModal = () => {
    setStatusModal({ open: false, leadId: '', newStatus: '' });
  };

  const handleSearchCallback = useCallback(
    (query) => {
      handleSearch(query);
    },
    [handleSearch]
  );

  const handleFilterChange = (status) => {
    handleStatusFilter(status);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monitor and manage your leads
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-4 md:p-5">
                <div className="animate-pulse">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mt-3" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="card p-4 md:p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.total}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card p-4 md:p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    New
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.new}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card p-4 md:p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contacted
                  </p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.contacted}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card p-4 md:p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Closed
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.closed}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {['', 'New', 'Contacted', 'Closed'].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              statusFilter === status
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {status || 'All'}
          </button>
        ))}
      </div>

      {/* Search & Table */}
      <div className="card p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex-1 max-w-sm">
            <SearchBar onSearch={handleSearchCallback} placeholder="Search by name or email..." />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Results for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>

        {loading ? (
          <SkeletonLoader rows={5} />
        ) : (
          <LeadTable
            leads={leads}
            onStatusChange={handleStatusClick}
            page={page}
            totalPages={totalPages}
            totalLeads={totalLeads}
            onPageChange={changePage}
          />
        )}
      </div>

      <Modal
        isOpen={statusModal.open}
        onClose={closeStatusModal}
        onConfirm={confirmStatusChange}
        title="Change Lead Status"
        message={`Are you sure you want to change this lead's status to "${statusModal.newStatus}"?`}
        confirmText="Change Status"
        variant="default"
      />
    </div>
  );
}

