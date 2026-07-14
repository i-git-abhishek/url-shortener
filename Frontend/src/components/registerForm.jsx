import { useState } from "react";
import { registerUser } from "../api/user.api";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({ setCurrentAction }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(name.trim(), email.trim(), password);
      navigate({to: "/dashboard"});
      setSuccessMessage(data?.message || "Registration successful. You can now log in.");
      setCurrentAction("login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-slate-500 text-center mt-4 cursor-pointer">
            Already have an account?{" "}
            <span
              type="button"
              onClick={() => setCurrentAction("login")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
