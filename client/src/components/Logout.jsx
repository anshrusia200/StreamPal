import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../api/user";

export const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button my={2} p={5} onClick={handleLogout}>
      Logout
    </Button>
  );
};
