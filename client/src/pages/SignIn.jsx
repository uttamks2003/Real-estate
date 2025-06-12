import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
  clearError,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure("An error occurred. Please try again."));
    }
  };
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* OAuth Section */}
        <div className="my-4 flex items-center justify-center">
          <span className="border-b border-gray-300 w-1/3" />
          <span className="mx-2 text-green-500">or</span>
          <span className="border-b border-gray-300 w-1/3" />
        </div>

        <OAuth />

        {/* Forgot Password Link */}
        {/* <div className="flex justify-between items-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div> */}

        {/* Sign Up Prompt */}
        <div className="flex gap-2 mt-5">
          <p>Don’t have an account?</p>
          <Link
            to="/sign-up"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
}
