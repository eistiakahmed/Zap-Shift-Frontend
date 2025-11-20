import React from 'react';
import Logo from '../../../Components/Logo/Logo';

const Footer = () => {
  return (
    <div className="">
      <footer className="footer footer-horizontal footer-center bg-gray-900 rounded-3xl p-10">
        <aside className="text-white">
          <Logo />
        </aside>
        <div className="x  text-gray-300 ">
          <h2>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </h2>
        </div>
        <div className="border-y  border-dashed py-5 text-gray-400 w-full">
          <nav className=''>
            <ul className='flex justify-evenly gap-10'>
              <li>Services</li>
              <li>Coverage</li>
              <li>About Us</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
        <div className="">
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;
