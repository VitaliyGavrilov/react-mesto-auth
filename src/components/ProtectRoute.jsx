import { Navigate } from "react-router-dom";

function ProtectRoute({ children, loggedIn }) {
  return loggedIn ? (
    children
  ) : (
    <Navigate to="/sign-up" replace />
  );
  
}

export default ProtectRoute;
