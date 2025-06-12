import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-500 text-white py-8 px-6 sm:px-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to{" "}
            <Link to="/" className="text-yellow-300 hover:text-yellow-400">
              ApnaGhar
            </Link>
          </h1>
          <p className="text-lg">
            Transforming the real estate experience with seamless and
            personalized solutions.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-12">
          {/* About Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              About Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="text-green-500 font-medium">ApnaGhar</span>,
              we are dedicated to transforming the real estate experience,
              making it seamless, efficient, and tailored to your needs. Our
              mission is to connect buyers, sellers, and renters through a
              user-friendly platform that simplifies property transactions.
            </p>
          </section>

          {/* Technologies Used */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Technologies Used
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center">
                {/* Inline SVG for HTML */}
                <svg
                  className="h-8 w-8 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="text-gray-700">HTML, React, Tailwind CSS</span>
              </div>
              <div className="flex items-center">
                {/* Inline SVG for Node.js */}
                <svg
                  className="h-8 w-8 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-gray-700">Node.js, Express</span>
              </div>
              <div className="flex items-center">
                {/* Inline SVG for Security */}
                <svg
                  className="h-8 w-8 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM12 20c-4.41-1.07-7-5.09-7-9V7l7-3.11 7 3.11v4c0 3.91-2.59 7.93-7 9z" />
                </svg>
                <span className="text-gray-700">
                  Google Authentication, JWT
                </span>
              </div>
              <div className="flex items-center">
                {/* Inline SVG for Shield */}
                <svg
                  className="h-8 w-8 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1l-11 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-11-5z" />
                </svg>
                <span className="text-gray-700">Robust Security Measures</span>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Authentication */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Inline SVG for User */}
                <svg
                  className="h-12 w-12 text-green-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">User Authentication</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Sign in seamlessly with your Google account.</li>
                  <li>Create a personalized account with your email.</li>
                </ul>
              </div>

              {/* Listing Management */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Inline SVG for Listing */}
                <svg
                  className="h-12 w-12 text-green-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Listing Management</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    Create, edit, and manage property listings effortlessly.
                  </li>
                  <li>Update property details in real-time.</li>
                </ul>
              </div>

              {/* User Interaction */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Inline SVG for Interaction */}
                <svg
                  className="h-12 w-12 text-green-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 6h-2v9H7v2h12a2 2 0 002-2V6zm-3 0H6v9h12V6zM5 6h2v9H5V6z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">User Interaction</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Contact property owners directly after signing in.</li>
                  <li>
                    Maintain a personalized profile for tracking listings.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Explore Listings */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Explore Listings
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Browse through a wide range of property listings without needing
              to sign up. For an enhanced experience and to interact with
              property owners, we encourage you to create an account or log in.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/sign-up"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                to="/search"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
              >
                Explore Listings
              </Link>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Why Choose <span className="text-green-500">ApnaGhar</span>
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>User-Friendly:</strong> Designed with simplicity and
                ease of use in mind.
              </li>
              <li>
                <strong>Secure:</strong> We prioritize your data security with
                Google Authentication and JWT.
              </li>
              <li>
                <strong>Comprehensive Management:</strong> Easily manage and
                find properties that meet your needs.
              </li>
            </ul>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Get Started Today!
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to embark on your real estate journey? Sign up, explore
              listings, and experience the convenience of managing and finding
              properties on{" "}
              <span className="text-green-500 font-medium">ApnaGhar</span>.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/sign-up"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                to="/search"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
              >
                Explore Listings
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
