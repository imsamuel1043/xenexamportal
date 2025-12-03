import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;


  if (user.role === "admin") return children;

  // Student only allowed on student pages
  if (user.role === "student") {
    if (role === "student") return children;
    return <Navigate to="/sdashboard"/>;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
