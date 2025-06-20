import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const currentProjectId = location.pathname.includes("/projects/")
    ? location.pathname.split("/projects/")[1]?.split("/")[0]
    : "";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      navigate(`/projects/${selectedId}/tickets`);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#f0f0f0", padding: "20px" }}>
        <h2 className="text-2xl font-bold mb-4">Bug Tracker</h2>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            </li>
            <li>
              <Link to="/projects" className="text-blue-600 hover:underline">Projects</Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="project-select" className="block mb-1 font-semibold">Select Project</label>
          <select
            id="project-select"
            value={currentProjectId || ""}
            onChange={handleSelect}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">-- Choose Project --</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* ✅ This renders nested route pages */}
      </div>
    </div>
  );
};

export default Layout;

