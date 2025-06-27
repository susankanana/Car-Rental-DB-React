import { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { logout } from '../../features/login/userSlice';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const isLoggedIn = !!token;
  const firstName = user?.firstName;
  const role = user?.role;

  const dashboardPath = role === 'admin'
    ? '/admin/dashboard/users'
    : role === 'user'
    ? '/user/dashboard/cars'
    : '/login';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Mini navbar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 790 519306</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Kenya, Nairobi</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <span>24/7 Customer Support</span>
              <span>Free Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigateTo('/')}>
            RENT<span className="text-gray-900">CAR</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/#home" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Home</a>
            <a href="/#services" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Services</a>
            <a href="/#testimonials" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Reviews</a>

            {isLoggedIn && (
              <a onClick={() => navigateTo(dashboardPath)} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Dashboard</a>
            )}
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 font-medium whitespace-nowrap">Welcome, {firstName || 'User'}!</span>
                <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <a onClick={() => navigateTo('/login')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Login</a>
                <a onClick={() => navigateTo('/register')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Register</a>
              </>
            )}
            <button onClick={() => navigateTo('/booking')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Book Now
            </button>
          </div>

          {/* Mobile nav trigger */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoggedIn ? (
              <span className="text-gray-700 font-medium whitespace-nowrap">Welcome, {firstName || 'User'}!</span>
            ) : (
              <button onClick={() => navigateTo('/login')} className="text-gray-700 hover:text-blue-600 font-medium">Login</button>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a onClick={() => navigateTo('/#home')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Home</a>
              <a onClick={() => navigateTo('/#services')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Services</a>
              <a onClick={() => navigateTo('/#testimonials')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Reviews</a>
              {isLoggedIn && (
                <a onClick={() => navigateTo(dashboardPath)} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Dashboard</a>
              )}
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 font-medium text-left">Logout</button>
              ) : (
                <a onClick={() => navigateTo('/register')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Register</a>
              )}
              <button onClick={() => navigateTo('/booking')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium w-fit">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
