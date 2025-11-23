import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentsHistory = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-white px-6 py-5 shadow-md rounded-3xl">
      <h1 className="text-5xl font-extrabold">
        {' '}
        Payment History
        <span className="bg-lime-500 text-xl py-2 px-4 rounded-full text-white">
          {paymentsHistory.length}
        </span>
      </h1>
      <div className="py-10">
        <div className="overflow-x-auto mt-2">
          <table className="table table-sm text-black rounded-xl border border-gray-300 shadow-md">
            <thead>
              <tr className="text-black">
                <th>Parcel Info</th>
                <th>customerEmail</th>
                <th>Tracking Number</th>
                <th>Transaction ID</th>
                <th>Payment Info</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentsHistory.map((history) => (
                <tr className="font-semibold" key={history._id}>
                  <td>{history.parcelName}</td>
                  <td>{history.customerEmail}</td>
                  <td>{history.trackingId}</td>
                  <td>{history.transactionId}</td>
                  <td>{history.amount}</td>
                  <td>{history.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
