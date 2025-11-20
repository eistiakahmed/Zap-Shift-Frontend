import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Utility/Footer/Footer';
import Navbar from '../Pages/Utility/Navbar/Navbar';

const Mainlayouts = () => {
  return (
    <div className=" bg-slate-100 ">
      <div className="max-w-11/12 mx-auto py-5">
        <Navbar />
        <div className="min-h-[60vh]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mainlayouts;
