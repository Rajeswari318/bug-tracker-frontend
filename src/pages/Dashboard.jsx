import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch all projects
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err.response?.data?.message);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Fetch tickets when a project is selected
    const fetchTickets = async () => {
      if (!selectedProjectId) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/tickets/${selectedProjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err.response?.data?.message);
      }
    };

    fetchTickets();
  }, [selectedProjectId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <label className="block mb-2 font-semibold">Select Project:</label>
      <select
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        className="border px-4 py-2 mb-4 rounded"
      >
        <option value="">-- Choose Project --</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>
            {proj.title}
          </option>
        ))}
      </select>

      <h3 className="text-xl font-semibold mb-2">Tickets:</h3>

      {tickets.length === 0 ? (
        <p>No tickets for this project.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="border p-4 rounded bg-white shadow">
              <h4 className="font-bold">{ticket.title}</h4>
              <p>{ticket.description}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Assignee:</strong> {ticket.assignee || "Not Assigned"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
