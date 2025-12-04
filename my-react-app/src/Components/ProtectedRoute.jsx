import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return role === "admin" ? <Navigate to="/loginadmin" /> : <Navigate to="/loginstudent" />;
  }

  if (user.role === "admin") {
    if (role === "admin") return children;
    return <Navigate to="/admin" />;
  }

  if (user.role === "student") {
    if (role === "student") return children;
    return <Navigate to="/student/dashboard" />;
  }

  return role === "admin" ? <Navigate to="/loginadmin" /> : <Navigate to="/loginstudent" />;
};

export default ProtectedRoute;
