import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { loginSuccess } from '../features/login/userSlice';
import { loginAPI } from '../features/login/loginAPI';
import { Mail, Lock, Eye, EyeOff, Car, ArrowRight, Shield, Clock, Award } from 'lucide-react';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = loginAPI.useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log('Login data:', data);

        try {
            const response = await loginUser(data).unwrap()
            // dispatch(loginSuccess(response))
            dispatch(
              loginSuccess({
               token: response.token,
               user: {
               customerID: response.user.user_id,
               firstName: response.user.first_name,
               lastName: response.user.last_name,
               email: response.user.email,
               role: response.user.role,
               isVerified: response.user.isVerified
               },
              })
              
);


            console.log("Login response:", response);
            toast.success("Login successful!");

            if (response.user.role === 'admin') {
                navigate('/admin/dashboard/users');
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard/cars');
            }

        } catch (error) {
            console.log("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <Car className="h-10 w-10 text-white" />
              <div className="text-3xl font-bold text-white">
                RENT<span className="text-blue-200">CAR</span>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Welcome Back to RentCar
            </h2>

            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Sign in to access your account and continue your journey with Kenya's 
              premier car rental service. Your next adventure is just a click away.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Secure Login Process</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Instant Access to Bookings</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Exclusive Member Benefits</span>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="text-2xl font-bold p-2">10,000+</div>
                  <div className="text-blue-200 text-sm">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold p-2">500+</div>
                  <div className="text-blue-200 text-sm">Premium Cars</div>
                </div>
                <div>
                  <div className="text-2xl font-bold p-2">5.0</div>
                  <div className="text-blue-200 text-sm">Star Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <Car className="h-8 w-8 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">
                RENT<span className="text-blue-600">CAR</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                {errors.email && <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <span className="text-red-600 text-sm mt-1 block">{errors.password.message}</span>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">
                Don’t have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">Create one here</a>
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <p className="text-gray-600">
                <a href="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">← Back to Home</a>
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">Your data is protected with enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
