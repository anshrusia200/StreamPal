import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.user.email);
  const folderPath = useSelector((state) => state.user.folder);

  if (userEmail && folderPath) {
    return children;
  } else if (userEmail && !folderPath) {
    return <Navigate to="/setFolder" />;
  } else {
    return <Navigate to="/signin" />;
  }
};
