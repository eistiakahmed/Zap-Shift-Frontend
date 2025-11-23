import { createBrowserRouter } from 'react-router';
import Mainlayouts from '../layouts/Mainlayouts';
import HomePage from '../Pages/Home/HomePage';
import Coverage from '../Pages/Coverage/Coverage/Coverage';
import AboutUs from '../Pages/About/AboutUs';
import ErrorPage from '../Pages/Error/ErrorPage';
import AuthLayouts from '../layouts/AuthLayouts';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import Rider from '../Pages/BeARider/Rider';
import PrivateRoutes from './PrivateRoutes';
import ForgetPassword from '../Pages/Auth/ForgetPassword/ForgetPassword';
import SendParcel from '../Pages/SendParcel/SendParcel';
import DashboardLayout from '../layouts/DashboardLayout';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentSuccess from '../Pages/Dashboard/Payment/PaymentSuccess';
import PaymentCancelled from '../Pages/Dashboard/Payment/PaymentCancelled';
import PaymentHistory from '../Pages/Dashboard/Payment/PaymentHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/coverage',
        element: <Coverage />,
        loader: () => fetch('/warehouses.json').then((res) => res.json()),
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/rider',
        element: (
          <PrivateRoutes>
            <Rider />
          </PrivateRoutes>
        ),
      },
      {
        path: '/sendParcel',
        element: (
          <PrivateRoutes>
            <SendParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch('/warehouses.json').then((res) => res.json()),
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayouts />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgetPassword',
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: 'my-parcels',
        element: <MyParcels />,
      },
      {
        path: 'payment/:parcelId',
        element: <Payment />,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled />
      },
      {
        path:'payment-history',
        element: <PaymentHistory />
      }
    ],
  },
]);
