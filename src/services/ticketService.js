import axios from "axios";

const API_URL = "/api/tickets";

// Get tickets by project
export const getTicketsByProject = async (projectId, token) => {
  const res = await axios.get(`${API_URL}?projectId=${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create ticket
export const createTicket = async (ticketData, token) => {
  const res = await axios.post(API_URL, ticketData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update ticket
export const updateTicket = async (id, ticketData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, ticketData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete ticket
export const deleteTicket = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
