import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { usersAPI } from '../features/users/usersAPI';
import { toast } from 'sonner';
import { Mail, Shield, Clock, Award, CheckCircle } from 'lucide-react';

type VerifyInputs = {
  email: string;
  code: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  code: yup
    .string()
    .matches(/^\d{6}$/, 'Code must be a 6 digit number')
    .required('Verification code is required'),
});

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const [verifyUser] = usersAPI.useVerifyUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromState,
    },
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    try {
      const response = await verifyUser(data).unwrap();
      console.log('Verification response:', response);

      toast.success('Account verified successfully!');
      setTimeout(() => {
        navigate('/login', { state: { email: data.email } });
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please check your code and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Verify and Access Your Account
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Just one step away! Enter the 6-digit code sent to your email to confirm your
              identity and get full access to RentCar’s premium services.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Secure Verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Quick and Easy Setup</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-200" />
                <span className="text-blue-100">Trusted by Thousands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
              <p className="text-gray-600">We’ve sent you a 6-digit verification code</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    readOnly={!!emailFromState}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-600 text-sm mt-1 block">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  {...register('code')}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.code && (
                  <span className="text-red-600 text-sm mt-1 block">{errors.code.message}</span>
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
                    <span>Verify Account</span>
                    <CheckCircle className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
