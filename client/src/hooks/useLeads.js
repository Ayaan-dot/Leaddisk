import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const fetchLeads = useCallback(async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const { data } = await api.get('/leads', { params });
      if (data.success) {
        setLeads(data.leads);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalLeads(data.totalLeads);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch leads';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createLead = async (leadData) => {
    try {
      const { data } = await api.post('/leads', leadData);
      if (data.success) {
        toast.success('Lead created successfully!');
        await fetchLeads(currentPage);
        return data.lead;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create lead';
      toast.error(message);
      throw err;
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/leads/${id}/status`, { status });
      if (data.success) {
        toast.success('Status updated successfully!');
        setLeads((prev) =>
          prev.map((lead) => (lead._id === id ? { ...lead, status: data.lead.status } : lead))
        );
        return data.lead;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update status';
      toast.error(message);
      throw err;
    }
  };

  const deleteLead = async (id) => {
    try {
      const { data } = await api.delete(`/leads/${id}`);
      if (data.success) {
        toast.success('Lead deleted successfully!');
        await fetchLeads(currentPage);
        return true;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete lead';
      toast.error(message);
      throw err;
    }
  };

  const updateLead = async (id, leadData) => {
    try {
      const { data } = await api.put(`/leads/${id}`, leadData);
      if (data.success) {
        toast.success('Lead updated successfully!');
        await fetchLeads(currentPage);
        return data.lead;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update lead';
      toast.error(message);
      throw err;
    }
  };

  return {
    leads,
    loading,
    error,
    totalPages,
    currentPage,
    totalLeads,
    fetchLeads,
    createLead,
    updateLeadStatus,
    deleteLead,
    updateLead,
  };
}

