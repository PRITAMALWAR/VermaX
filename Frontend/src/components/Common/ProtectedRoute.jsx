


import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, loading, user } = useAuth();

  if (loading) return <Loader />;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

























// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "./Loader";

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn, loading } = useAuth();

//   if (loading) {
//     return <Loader />;
//   }

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;















