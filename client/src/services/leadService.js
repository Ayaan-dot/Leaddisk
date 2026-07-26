import api from './api';

export const createLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

export const getLeads = async (page = 1, limit = 10, status = '') => {
  const params = { page, limit };
  if (status) params.status = status;
  const response = await api.get('/leads', { params });
  return response.data;
};

export const updateLead = async (id, status) => {
  const response = await api.patch(`/leads/${id}`, { status });
  return response.data;
};

export const searchLeads = async (query) => {
  const response = await api.get('/leads/search', { params: { q: query } });
  return response.data;
};

export const getLeadStats = async () => {
  const response = await api.get('/leads/stats');
  return response.data;
};

