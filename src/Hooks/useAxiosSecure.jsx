import axios from 'axios';
import React from 'react';


// component er bahire korer karon holo jinis ta jano ber render nah kora hoi
const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});


const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;