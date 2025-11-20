// src/pages/Register/Register.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, googleLoginUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handleRegister = (data) => {
    console.log('After register', data.photo[0], data.name);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password).then((result) => {
      console.log(result.user);
      // store the image and get the photo URL
      const formData = new FormData();
      formData.append('image', profileImage);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST
      }`;

      axios
        .post(image_API_URL, formData)
        .then((res) => {
          console.log('after image upload', res.data.data.url);
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          console.log(userProfile);

          updateUserProfile(userProfile)
            .then(() => {
              console.log('Profile update Successfully');
              navigate(location?.state || '/');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // update user profile
  };

  const handleGoogle = () => {
    googleLoginUser()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-1">
        Create an Account
      </h2>
      <p className="text-gray-500 mb-8">Register with ZapShift</p>

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="space-y-4">
          <div className="mb-4">
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="sr-only">Name</label>
            <input
              type="text"
              {...register('name', {
                required: true,
                maxLength: 20,
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Name"
            />
          </div>
          {errors.name?.type === 'required' && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* Image */}
          <div>
            <label className="sr-only">Image Upload</label>

            <input
              type="file"
              className="file-input w-full border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              {...register('photo', { required: true })}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Email"
            />
          </div>
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* Password Field */}
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
          </div>

          {errors.password?.type === 'required' && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">
              {' '}
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-500">
              password must be at least one uppercase, at least one lowercase,
              at least one number, and at least one special characters
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-[#a2d94a] text-white font-semibold rounded-lg hover:bg-[#8ec240] transition duration-200 mt-4"
          >
            Register
          </button>
        </div>
      </form>

      <div className="text-sm text-center my-4">
        <a href="#" className="text-gray-600 hover:text-lime-600">
          Already have an account?
          <Link
            state={location?.state}
            to="/login"
            className="font-semibold text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>
        </a>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300  mr-2"></div>
        <p className="text-gray-500 text-sm">Or</p>
        <div className="border-t border-gray-300  ml-2"></div>
      </div>

      <div>
        <button
          onClick={handleGoogle}
          className="btn bg-white text-black border-[#e5e5e5] w-full"
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
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
