import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", padding: "1rem", background: "#f0f0f0", height: "100vh" }}>
      <h2>Bug Tracker</h2>
      <nav style={{ marginTop: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "1rem 0" }}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li style={{ margin: "1rem 0" }}>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
