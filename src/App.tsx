import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import { type RootState } from './app/store'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import VerifyUser from './pages/verifyUser'
import Login from './pages/Login'
import About from './components/about/About'
import Error from './components/error/Error'
import Booking from './components/booking/Booking'
import Users from './dashboard/adminDashboard/manageUsers/Users'
import Profile from './dashboard/adminDashboard/Profile'
import UserProfile from './dashboard/userDashboard/UserProfile'
import AdminDashboard from './dashboard/adminDashboard/AdminDashboard'
import UserDashboard from './dashboard/userDashboard/UserDashboard'
import UserCars from './dashboard/userDashboard/cars/UserCars'
import Cars from './dashboard/adminDashboard/cars/Cars'
import { Toaster } from 'sonner'
import UserBookings from './dashboard/userDashboard/bookings/UserBookings'
import Analytics from './dashboard/adminDashboard/analytics/Analytics'
import UserAnalytics from './dashboard/userDashboard/analytics/UserAnalytics'

function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/verify',
      element: <VerifyUser />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/booking',
      element: <Booking />
    },
    // Admin Dashboard Routes
    {
      path: '/admin/dashboard',
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: 'analytics',
          element: <Analytics />
        },
        {
          path: 'cars',
          element: <Cars />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'profile',
          element: <Profile />
        },
      ]
    },

    // User dashboard routes
    {
      path: '/user/dashboard',
      element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
          path: 'analytics',
          element: <UserAnalytics />
        },
        {
          path: 'cars',
          element: <UserCars />
        },
        {
          path: 'bookings',
          element: <UserBookings />
        },
        {
          path: 'profile',
          element: <UserProfile />
        },
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',

        }

      }} />
    </>
  )
}

export default App
