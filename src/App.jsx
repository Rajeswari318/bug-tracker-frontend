import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TicketsPage from "./pages/TicketsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Sidebar + Topbar Layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout wrapper */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId/tickets" element={<TicketsPage />} />

          {/* Optionally, in the future you can add:
              <Route path="/projects/:projectId/tickets/new" element={<CreateTicket />} />
              <Route path="/tickets/:ticketId/edit" element={<EditTicket />} />
          */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
