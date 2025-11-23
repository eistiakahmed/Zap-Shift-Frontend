import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">
        Payment is cancelled.Please try again
      </h2>
      <Link to="/dashboard/my-parcels" className="btn btn-secondary">
        Try again
      </Link>
    </div>
  );
};

export default PaymentCancelled;