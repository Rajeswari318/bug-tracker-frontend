import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTicket, getTicketsByProject } from "../services/ticketApi";

const TicketsPage = () => {
  const { projectId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignee: "",
  });

  useEffect(() => {
    if (projectId) {
      getTicketsByProject(projectId)
        .then((res) => {
          if (Array.isArray(res)) {
            setTickets(res);
          } else {
            setTickets([]); // fallback to empty array
            console.error("Expected array but got:", res);
          }
        })
        .catch((err) => {
          console.error("❌ Failed to fetch tickets:", err);
          setTickets([]);
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = await createTicket(projectId, formData);
      setTickets((prev) => [...prev, newTicket]);
      setFormData({
        title: "",
        description: "",
        priority: "Low",
        status: "Open",
        assignee: "",
      });
    } catch (err) {
      console.error("❌ Failed to create ticket:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
        <input
          className="border p-2 w-full rounded"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 w-full rounded"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <select
            className="border p-2 rounded flex-1"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            className="border p-2 rounded flex-1"
            type="text"
            name="assignee"
            placeholder="Assignee"
            value={formData.assignee}
            onChange={handleChange}
          />
          <select
            className="border p-2 rounded flex-1"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Ticket
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6 mb-2">Tickets List</h3>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <ul className="space-y-2">
          {Array.isArray(tickets) && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket._id} className="border p-3 rounded shadow-sm">
                <p className="font-semibold">{ticket.title}</p>
                <p>Status: {ticket.status} | Priority: {ticket.priority}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tickets available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TicketsPage;
