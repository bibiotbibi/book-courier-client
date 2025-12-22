import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10 px-4">
      
      {/* Logo */}
      <Link to="/" className="mb-8">
        <img
          className="w-10 sm:w-24 md:w-18 "
          src="https://i.ibb.co/GvY2DJ2M/Screenshot-9-removebg-preview.png"
          alt="Logo"
        />
      </Link>

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        {/* - Outlet ) */}
        <div className="flex-1 p-8 md:p-12">
          <Outlet />
        </div>

        {/* Right side */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img
            src="https://i.ibb.co/GvY2DJ2M/Screenshot-9-removebg-preview.png"
            alt="Decorative"
            className="w-64 md:w-72 animate-float"
          />
        </div>

      </div>

     
      <p className="mt-6 text-gray-400 text-sm">
        &copy; 2025 YourWebsite. All rights reserved.
      </p>

     
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout;
