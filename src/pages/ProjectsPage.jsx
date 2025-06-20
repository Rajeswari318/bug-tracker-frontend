import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch projects
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch projects:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Add new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      console.error("❌ Failed to add project:", err.response?.data || err.message);
    }
  };

  // ✅ Delete project
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("❌ Failed to delete project:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      {/* Add Project Form */}
      <form onSubmit={handleAddProject} className="mb-6">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm">{project.description}</p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500"
              >
                Delete
              </button>

              <Link
                to={`/projects/${project._id}/tickets`}
                className="text-blue-600 underline"
              >
                View Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
