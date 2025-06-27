import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { usersAPI } from '../../src/features/users/usersAPI';

import { User, Mail, Phone, Lock, Eye, EyeOff, Car, ArrowRight, Shield, Clock, Award } from 'lucide-react';

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().max(50).required('First name is required'),
  lastName: yup.string().max(50).required('Last name is required'),
  phoneNumber: yup.string().max(15).required('Phone number is required'),
  email: yup.string().email('Invalid email').max(100).required('Email is required'),
  password: yup.string().min(6).max(255).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [createUser] = usersAPI.useCreateUsersMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await createUser(userData).unwrap();
      console.log("response here...", response);

      toast.success("Registration successful! Please check your email.");
      
      setTimeout(() => {
        navigate('/register/verify', {
          state: { email: data.email },
        });
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error?.data?.message || "Registration failed. Please try again.");
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
                            Join Thousands of Happy Customers
                        </h2>
                        
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                            Experience the freedom of the road with Kenya's most trusted car rental service. 
                            Premium vehicles, competitive prices, and exceptional service await you.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Shield className="h-6 w-6 text-blue-200" />
                                <span className="text-blue-100">100% Secure & Insured</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="h-6 w-6 text-blue-200" />
                                <span className="text-blue-100">24/7 Customer Support</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Award className="h-6 w-6 text-blue-200" />
                                <span className="text-blue-100">500+ Premium Vehicles</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <div className="max-w-md mx-auto">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                            <Car className="h-8 w-8 text-blue-600" />
                            <div className="text-2xl font-bold text-gray-900">
                                RENT<span className="text-blue-600">CAR</span>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                            <p className="text-gray-600">Start your journey with us today</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register('firstName')}
                                            placeholder="John"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <span className="text-red-600 text-sm mt-1 block">{errors.firstName.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register('lastName')}
                                            placeholder="Doe"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <span className="text-red-600 text-sm mt-1 block">{errors.lastName.message}</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="john@example.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        {...register('phoneNumber')}
                                        placeholder="+254700123456"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <span className="text-red-600 text-sm mt-1 block">{errors.phoneNumber.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
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
                                {errors.password && (
                                    <span className="text-red-600 text-sm mt-1 block">{errors.password.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register('confirmPassword')}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <span className="text-red-600 text-sm mt-1 block">{errors.confirmPassword.message}</span>
                                )}
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
                                        <span>Create Account</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    Sign in here
                                </a>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;