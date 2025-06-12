import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    setError(null)
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 disabled:opacity-50 transition duration-200"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* OAuth Section */}
        <div className="my-4 flex items-center justify-center">
          <span className="border-b border-gray-300 w-1/3" />
          <span className="mx-2 text-green-500">or</span>
          <span className="border-b border-gray-300 w-1/3" />
        </div>

        <OAuth />

        {/* Sign In Prompt */}
        <div className="flex gap-2 mt-5">
          <p>Already have an account?</p>
          <Link
            to="/sign-in"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
}
