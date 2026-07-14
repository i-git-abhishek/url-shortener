import { useState } from "react";
import { loginUser } from "../api/user.api";
import { useSelector, useDispatch } from "react-redux";
import {login} from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
 
const LoginForm = ({ setCurrentAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email.trim(), password);
      dispatch(login(data.user));
      navigate({to: "/dashboard"})
      setSuccessMessage(data?.message || "Login successful.");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-4">
          New user?{" "}
          <button
            type="button"
            onClick={() => setCurrentAction("register")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
