import axios from "axios";

export const getTicketsByProject = async (projectId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`/api/tickets?projectId=${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTicket = async (projectId, data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `/api/tickets`,
    { ...data, projectId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const updateTicket = async (ticketId, data) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`/api/tickets/${ticketId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTicket = async (ticketId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`/api/tickets/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
