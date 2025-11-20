import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const ForgetPassword = () => {
  const { forgotPasswordUser, email, setEmail } = useAuth();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    forgotPasswordUser(email)
      .then((res) => {
        console.log(res);
        alert('Password reset email sent!');
        window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-[43px] font-extrabold mt-3">Forgot Password</h1>
      <p className="my-3">
        Enter your email address and we’ll send you a <br /> reset link.
      </p>

      <form onSubmit={handleForgotPassword}>
        <div>
          <label className="sr-only">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            placeholder="Email"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#a2d94a] text-white font-semibold rounded-lg hover:bg-[#8ec240] transition duration-200 mt-4"
        >
          Send
        </button>
      </form>
      <p className="mt-3 text-slate-500">
        Remember your password?{' '}
        <Link to="/login" className="text-[#a2d94a] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}; 

export default ForgetPassword;
