import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/projects/${project._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onUpdate();
      } catch (err) {
        console.error("Delete failed:", err.message);
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
      <p className="mb-1">{project.description}</p>
      <p className="text-xs text-gray-500 mb-2">ID: {project._id}</p>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/projects/${project._id}/tickets`)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          View Tickets
        </button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
