import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const isAuthenticated = true; // replace with your auth logic
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, preserving where we came from
    return <Navigate to="/client/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
