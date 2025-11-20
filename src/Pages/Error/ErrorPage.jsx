import React from 'react';
import error from '../../assets/errorPage.png'
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="my-25 h-[60vh] flex flex-col justify-center items-center bg-white rounded-2xl shadow">
      <img src={error} alt="" />
      <div>
        <Link to="/">
          <button className="btn rounded-xl px-10 bg-[#c9eb65]">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;