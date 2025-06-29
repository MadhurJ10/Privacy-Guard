import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r py-8 px-4 sm:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Divider to differentiate footer */}
        <div className="w-full border-t border-gray-400 mb-6"></div>

        {/* Top Section */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-6">
          {/* Brand Name */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              Privacy Guard
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Your ultimate tool for online privacy and security.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-gray-600 text-sm sm:text-base">
            <a href="#" className="hover:text-gray-800 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline">
              About Us
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline">
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Social Media and Copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-500 transition"
              aria-label="Follow us on Facebook"
            >
              <i className="ri-facebook-fill text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition"
              aria-label="Follow us on Twitter"
            >
              <i className="ri-twitter-fill text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-500 transition"
              aria-label="Follow us on Instagram"
            >
              <i className="ri-instagram-fill text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Subscribe on YouTube"
            >
              <i className="ri-youtube-fill text-2xl"></i>
            </a>
          </div>

          {/* Copyright and Creator */}
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 sm:text-base">
              &copy; 2025 Privacy Guard. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 sm:text-base mt-1">
              Created by <span className="font-bold">Madhur Bhawsar</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
