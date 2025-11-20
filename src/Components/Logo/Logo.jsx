import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to='/'>
      <div className=" flex items-end">
        <img src={logo} alt="logo" className="" />
        <h1 className="text-2xl font-bold -ms-5">ZapShift</h1>
      </div>
    </Link>
  );
};

export default Logo;
