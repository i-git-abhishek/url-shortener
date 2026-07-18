import { useEffect } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import { logout } from "./store/slice/authSlice.js";

const RootLayout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch(logout());
      queryClient.clear();
      navigate({ to: "/" });
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, [dispatch, navigate, queryClient]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
