import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { CgArrowTopRight } from 'react-icons/cg';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogoutUser = () => {
    logoutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="">Blog</NavLink>
      </li>
      <li>
        <NavLink to="">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 py-4 md:px-6 shadow-sm rounded-3xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="tooltip" data-tip={user?.displayName}>
              <img
                src={user?.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <button onClick={handleLogoutUser} className="btn rounded-4xl">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {' '}
            <Link to="/login" className="btn rounded-3xl mr-2">
              Sign In
            </Link>
            <Link className="flex items-center" to="/register">
              <button className="btn rounded-3xl bg-[#c9eb65]">Sign Up</button>
              <button className="text-[#c9eb65] bg-[#1f1f1f] w-10 h-10 rounded-full flex justify-center items-center">
                <CgArrowTopRight size={25} />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
