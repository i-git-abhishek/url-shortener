//basic dashboard page with a welcome message and a logout button
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate({to: "/auth"});
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome, {auth.user?.name || "User"}!</h1>
        <p className="text-lg mb-8">You are now logged in to the dashboard.</p>
        <button
          onClick={handleLogout}
          className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;