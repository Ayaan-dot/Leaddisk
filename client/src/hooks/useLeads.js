import { useState, useEffect, useCallback } from 'react';
import { getLeads, updateLead, searchLeads, getLeadStats } from '../services/leadService';
import toast from 'react-hot-toast';

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const response = await getLeadStats();
      setStats(response.data.stats);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch stats';
      toast.error(message);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(async (page = 1, status = statusFilter) => {
    setLoading(true);
    try {
      const response = await getLeads(page, 10, status);
      setLeads(response.data.leads);
      setPagination(response.pagination);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch leads';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchLeads(1);
    fetchStats();
  }, [fetchLeads, fetchStats]);

  const changePage = useCallback((newPage) => {
    fetchLeads(newPage);
  }, [fetchLeads]);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
    setSearchQuery('');
    setSearchResults(null);
    fetchLeads(1, status);
  }, [fetchLeads]);

  const updateLeadStatus = useCallback(async (id, newStatus) => {
    try {
      await updateLead(id, newStatus);
      toast.success(`Lead status updated to ${newStatus}`);
      fetchLeads(pagination.page);
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
    }
  }, [fetchLeads, fetchStats, pagination.page]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(null);
      setSearching(false);
      fetchLeads(1);
      return;
    }
    setSearching(true);
    try {
      const response = await searchLeads(query);
      setSearchResults(response.data.leads);
    } catch (error) {
      const message = error.response?.data?.message || 'Search failed';
      toast.error(message);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [fetchLeads]);

  const refreshLeads = useCallback(() => {
    fetchLeads(pagination.page);
    fetchStats();
  }, [fetchLeads, fetchStats, pagination.page]);

  const displayLeads = searchResults !== null ? searchResults : leads;
  const totalLeads = pagination.total;
  const totalPages = pagination.pages;
  const page = pagination.page;

  return {
    leads: displayLeads,
    loading,
    stats,
    statsLoading,
    pagination,
    statusFilter,
    searchQuery,
    isSearching: searching,
    totalLeads,
    totalPages,
    page,
    changePage,
    handleStatusFilter,
    updateLeadStatus,
    handleSearch,
    refreshLeads,
    setSearchQuery,
  };
}
