import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayouts = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden w-full max-w-4xl min-h-[550px] flex flex-col-reverse md:flex-row">
        <div className="flex-1 p-16 flex flex-col justify-start">
          <div className="mb-12">
            <Logo />
          </div>
          <Outlet />
        </div>

        <div className="flex-1 bg-[#fafcf0]  md:flex items-center justify-center p-8">
          <img
            src={authImage}
            alt="Delivery illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
