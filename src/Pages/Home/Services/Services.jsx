import React, { use } from 'react';
import service from '../../../assets/service.png'

const Services = ({ servicesPromise }) => {
  const services = use(servicesPromise)
  // console.log(service)
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
      {services.map((s) => (
        <>
          <div className="bg-white text-black text-center p-10 rounded-4xl flex flex-col justify-center items-center hover:bg-[#c9eb65] hover:text-gray-900 hover:scale-105 transition-all duration-300 shadow-md">
            <span className="flex justify-center w-[100px] h-[100px] mb-3  p-5 rounded-full bg-[#f4f3fd]">
              <img src={service} alt="" />
            </span>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="text-gray-500 mt-2">{s.description}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Services;