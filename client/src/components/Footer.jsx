import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8">
          <h5 className="uppercase text-lg font-bold mb-4">Quick Links</h5>
          <ul className="list-none mb-0">
            <li className="mb-2">
              <Link
                to="about"
                className="hover:text-green-500 transition duration-200"
              >
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact"
                className="hover:text-green-500 transition duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/faq"
                className="hover:text-green-500 transition duration-200"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8">
          <h5 className="uppercase text-lg font-bold mb-4">Social Media</h5>
          <ul className="list-none flex justify-start space-x-4">
            <li>
              <a

                className="hover:text-green-500 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter text-xl" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/uttamshukla005/"
                className="hover:text-green-500 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-xl" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/uttamks2003/"
                className="hover:text-green-500 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in text-xl" />
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8">
          <h5 className="uppercase text-lg font-bold mb-4">
            Subscribe to our Newsletter
          </h5>
          <form className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-2 px-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="text-center text-gray-400 text-sm mt-8">
        &copy; 2025 ApnaGhar Real Estate Pvt. Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
