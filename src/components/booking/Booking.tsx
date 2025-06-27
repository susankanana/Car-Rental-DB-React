import React, { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar,  Car, User, CheckCircle, ArrowRight, ArrowLeft, Star, Users, Fuel, Settings, Shield, Phone, Mail, Home } from 'lucide-react';
import type { BookingFormData, CarWithLocation,} from './schemaExtract';
import { mockCars } from './mockCars'; 
import { mockLocations } from './mockLocations';


// Validation schema
const bookingSchema = yup.object({
  carID: yup.number().required('Please select a car'),
  rentalStartDate: yup
    .string()
    .required('Pickup date is required')
    .test('future-date', 'Pickup date must be in the future', function(value) {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const pickupDate = new Date(value);
      return pickupDate >= today;
    }),
  rentalEndDate: yup
    .string()
    .required('Return date is required')
    .test('after-pickup', 'Return date must be after pickup date', function(value) {
      const { rentalStartDate } = this.parent;
      if (!value || !rentalStartDate) return false;
      return new Date(value) > new Date(rentalStartDate);
    }),
  firstName: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .max(100, 'Max 100 characters')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required'),
  address: yup
    .string()
    .max(255, 'Max 255 characters')
    .required('Address is required'),
  pickupLocationID: yup.number().required('Pickup location is required'),
  returnLocationID: yup.number().required('Return location is required'),
  
});

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<CarWithLocation | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      pickupLocationID: 1,
      returnLocationID: 1
    }
  });

  const watchedValues = watch();

  // Calculate total days and amount
  useEffect(() => {
    if (watchedValues.rentalStartDate && watchedValues.rentalEndDate && selectedCar) {
      const startDate = new Date(watchedValues.rentalStartDate);
      const endDate = new Date(watchedValues.rentalEndDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setTotalDays(diffDays);
      setTotalAmount(diffDays * parseFloat(selectedCar.rentalRate));
    }
  }, [watchedValues.rentalStartDate, watchedValues.rentalEndDate, selectedCar]);

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    try {
      // Here you would make the API call to create the booking
      console.log('Booking Data:', {
        ...data,
        totalAmount: totalAmount.toFixed(2),
        totalDays
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['rentalStartDate', 'rentalEndDate', 'pickupLocationID', 'returnLocationID'];
        break;
      case 2:
        fieldsToValidate = ['carID'];
        break;
      case 3:
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phoneNumber', 'address'];
        break;
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const selectCar = (car: CarWithLocation) => {
    setSelectedCar(car);
    setValue('carID', car.carID);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for choosing RentCar. Your booking has been successfully submitted.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Car:</span> {selectedCar?.carModel}
                </div>
                <div>
                  <span className="font-semibold">Duration:</span> {totalDays} days
                </div>
                <div>
                  <span className="font-semibold">Total Amount:</span> ${totalAmount.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold">Booking ID:</span> #BK{Date.now()}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setSelectedCar(null);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Rental Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Rental Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      {...register('rentalStartDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.rentalStartDate && (
                      <span className="text-red-600 text-sm">{errors.rentalStartDate.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <input
                      type="date"
                      {...register('rentalEndDate')}
                      min={watchedValues.rentalStartDate || new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.rentalEndDate && (
                      <span className="text-red-600 text-sm">{errors.rentalEndDate.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <select
                      {...register('pickupLocationID', { valueAsNumber: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {/* Using the imported mockLocations */}
                      {mockLocations.map((location) => (
                        <option key={location.locationID} value={location.locationID}>
                          {location.locationName}
                        </option>
                      ))}
                    </select>
                    {errors.pickupLocationID && (
                      <span className="text-red-600 text-sm">{errors.pickupLocationID.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Location
                    </label>
                    <select
                      {...register('returnLocationID', { valueAsNumber: true })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {/* Using the imported mockLocations */}
                      {mockLocations.map((location) => (
                        <option key={location.locationID} value={location.locationID}>
                          {location.locationName}
                        </option>
                      ))}
                    </select>
                    {errors.returnLocationID && (
                      <span className="text-red-600 text-sm">{errors.returnLocationID.message}</span>
                    )}
                  </div>
                </div>

                {totalDays > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800 font-semibold">
                      Rental Duration: {totalDays} day{totalDays !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Car Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Car className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Select Your Car</h2>
                </div>

                <div className="grid gap-6">
                  {/* Using the imported mockCars */}
                  {mockCars.map((car) => (
                    <div
                      key={car.carID}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedCar?.carID === car.carID
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => selectCar(car)}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={car.imageUrl}
                          alt={car.carModel}
                          className="w-full md:w-64 h-48 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{car.carModel}</h3>
                              <p className="text-gray-600">{car.year} • {car.color}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                ${car.rentalRate}/day
                              </div>
                              {totalDays > 0 && (
                                <div className="text-sm text-gray-600">
                                  Total: ${(parseFloat(car.rentalRate) * totalDays).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{car.rating}</span>
                              <span className="text-sm text-gray-600">({car.reviewCount} reviews)</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">5 Seats</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Settings className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Automatic</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Fuel className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Petrol</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Shield className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Insured</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {car.features?.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.carID && (
                  <span className="text-red-600 text-sm">{errors.carID.message}</span>
                )}
              </div>
            )}

            {/* Step 3: Customer Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName')}
                      placeholder="John"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.firstName && (
                      <span className="text-red-600 text-sm">{errors.firstName.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName')}
                      placeholder="Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.lastName && (
                      <span className="text-red-600 text-sm">{errors.lastName.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="john@example.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && (
                      <span className="text-red-600 text-sm">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phoneNumber')}
                      placeholder="+254700123456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Home className="h-4 w-4 inline mr-1" />
                      Address
                    </label>
                    <textarea
                      {...register('address')}
                      placeholder="Your full address"
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.address && (
                      <span className="text-red-600 text-sm">{errors.address.message}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Confirm Your Booking</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Rental Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Pickup Date:</span>
                          <span className="font-medium">{watchedValues.rentalStartDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return Date:</span>
                          <span className="font-medium">{watchedValues.rentalEndDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pickup Location:</span>
                          <span className="font-medium">
                            {/* Using the imported mockLocations */}
                            {mockLocations.find(l => l.locationID === watchedValues.pickupLocationID)?.locationName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return Location:</span>
                          <span className="font-medium">
                            {/* Using the imported mockLocations */}
                            {mockLocations.find(l => l.locationID === watchedValues.returnLocationID)?.locationName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="font-medium">{watchedValues.firstName} {watchedValues.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">{watchedValues.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="font-medium">{watchedValues.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedCar && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Selected Vehicle</h3>
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={selectedCar.imageUrl}
                            alt={selectedCar.carModel}
                            className="w-20 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{selectedCar.carModel}</div>
                            <div className="text-sm text-gray-600">{selectedCar.year} • {selectedCar.color}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Pricing Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Daily Rate:</span>
                          <span>${selectedCar?.rentalRate}/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total Amount:</span>
                            <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                          Secure booking with instant confirmation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Previous</span>
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold ${
                    currentStep === 2 && !selectedCar
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 transition-colors'
                  }`}
                  disabled={currentStep === 2 && !selectedCar}
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
              {currentStep === 4 && (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Confirm & Book Now
                </button>
              )}
            </div>
          </div>
        </form>
  );
};

export default Booking;