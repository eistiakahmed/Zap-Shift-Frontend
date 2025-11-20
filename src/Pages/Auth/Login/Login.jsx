import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
  const { loginUser, googleLoginUser,email,setEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    setEmail(data.email)
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    googleLoginUser()
      .then((result) => {
        console.log(result);
        navigate(location?.state || '/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h2>
      <p className="text-gray-500 mb-8">Sign in to your ZapShift account</p>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-4">
          {/* ======Email====== */}
          <div>
            <label className="sr-only">Email</label>
            <input
              type="email"
              {...register('email', {
                required: true,
              })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Email"
            />
          </div>
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is Required</p>
          )}

          {/* ======Password====== */}
          <div>
            <label className="sr-only">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Password"
            />

            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="text-red-500">
                password must be at least one uppercase, at least one lowercase,
                at least one number, and at least one special characters
              </p>
            )}

            {/* =====Forgot Password===== */}
            <div className="flex justify-end text-sm mt-2">
              <Link
                to="/forgetPassword"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#a2d94a] text-white font-semibold rounded-lg hover:bg-[#8ec240] transition duration-200 mt-4"
          >
            Login
          </button>
        </div>
      </form>

      <div className="text-sm text-center my-6">
        <a className="text-gray-600 hover:text-lime-600">
          Don't have an account?
          <Link
            state={location?.state}
            to="/register"
            className="font-semibold text-blue-600 ml-1 hover:underline"
          >
            Register
          </Link>
        </a>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300 mr-2"></div>
        <p className="text-gray-500 text-sm">Or</p>
        <div className="border-t border-gray-300 ml-2"></div>
      </div>

      <div>
        <button
          onClick={handleGoogle}
          className="btn bg-white text-black border-[#e5e5e5] w-full rounded-xl"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with google
        </button>
      </div>
    </div>
  );
};

export default Login;
