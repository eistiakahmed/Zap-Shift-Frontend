import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id');
  // console.log(sessionId)
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          // console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center animate-fadeIn">
        <FaCheckCircle className="text-green-500 w-20 h-20 mx-auto mb-5 animate-bounceShort" />

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Thank you! Your payment has been confirmed.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            <span className="text-green-700">Transaction ID:</span>{' '}
            {paymentInfo.transactionId}
          </h3>

          <h3 className="text-sm font-semibold text-gray-800">
            <span className="text-green-700">Tracking ID:</span>{' '}
            {paymentInfo.trackingId}
          </h3>
        </div>

        <Link to="/dashboard/my-parcels" className='btn bg-green-500 text-white rounded-3xl mt-5'>Check Your Parcel Status</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
