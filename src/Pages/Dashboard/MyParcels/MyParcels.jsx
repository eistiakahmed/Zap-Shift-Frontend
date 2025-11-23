import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaRegEdit } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      console.log(res);
      
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // using tanstack to refresh data in the UIs
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your parcel request has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post(
      '/payment-checkout-session',
      paymentInfo 
    );
    // console.log(res.data);
    window.location.assign(res.data.url);
  };

  return (
    <div className="bg-white p-8 rounded-3xl">
      <h2 className="text-5xl font-bold flex items-center gap-2">
        All Deliveries <span className='bg-lime-500 text-xl py-2 px-4 rounded-full text-white'>{parcels.length}</span>
      </h2>
      <div className="overflow-x-auto border border-gray-300 rounded-3xl mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Serial No</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic Data load */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="text-center">
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === 'paid' ? (
                    <span className="bg-green-500 text-white py-2 px-4 text-sm font-semibold rounded-full ">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn bg-red-500 text-white text-sm rounded-4xl"
                    >
                      Pay
                    </button>
                  )}

                  {/* <Link to={`/dashboard/payment/${parcel._id}`}className='btn bg-red-500 text-white rounded-4xl'>Pay</Link> */}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td className="">
                  <button className="btn btn-square hover:bg-[#c9eb65] mr-2">
                    <FaRegEdit />
                  </button>
                  <button className="btn btn-square hover:bg-emerald-500 mr-2">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-[#c9eb65]"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
