import React, { useState } from "react";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setSending(true);
    const response = await fetch("/api/contactUs/submit_form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resultData = await response.json();
    setSending(false);
    if (resultData.success) {
      setResult("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setResult("Error: " + resultData.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6">
          Contact Us
        </h1>
        <div className="flex flex-col md:flex-row justify-between">
          {/* Contact Details */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <ul className="space-y-4">
              {/* Name */}
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.347 0 4.547.525 6.379 1.449M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <strong className="text-gray-700">Name:</strong>
                  <p className="text-gray-600">Uttam Kumar</p>
                </div>
              </li>
              {/* Email */}
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <strong className="text-gray-700">Email:</strong>
                  <p className="text-gray-600">
                    <a
                      href="mailto:uttamks.webdev@gmail.com"
                      className="text-gray-600 hover:underline"
                    >
                      uttamks.webdev@gmail.com
                    </a>
                  </p>
                </div>
              </li>
              {/* Contact Number */}
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v4M3 5l4 4m0 0l4-4m-4 4v12m0-12l4 4m0 0l4-4m-4 4v12"
                  />
                </svg>
                <div>
                  <strong className="text-gray-700">Contact Number:</strong>
                  <p className="text-gray-600">+91 6299359419</p>
                </div>
              </li>
              {/* Address */}
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 0c1.654 0 3 1.346 3 3v2a3 3 0 11-6 0v-2c0-1.654 1.346-3 3-3z"
                  />
                </svg>
                <div>
                  <strong className="text-gray-700">Address:</strong>
                  <p className="text-gray-600">Ahmedabad, India</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div>
                <button
                  disabled={sending}
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
            <span className="text-green-600 font-semibold">{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
