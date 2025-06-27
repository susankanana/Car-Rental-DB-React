import { carAPI, type TCar } from "../../../features/cars/carsAPI";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Car, Calendar, Palette, DollarSign, CheckCircle, XCircle, Star, Fuel, Users, Settings } from "lucide-react";

const UserCars = () => {
    const { data: carsData, isLoading, error} = carAPI.useGetCarsQuery();
    const [availableCars, setAvailableCars] = useState<TCar[]>([]);

    useEffect(() => {
        if (carsData?.data) {
            const filtered = carsData.data.filter((car: TCar) => car.availability);
            setAvailableCars(filtered);
        }
    }, [carsData]);

    useEffect(() => {
        if (error) toast.error("Error fetching cars. Please try again.");
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-700 text-lg font-semibold">Error fetching cars</p>
                <p className="text-red-600 mt-2">Please try again later</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                    <Car className="h-7 w-7 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Available Cars for Rent</h2>
                </div>
                <p className="text-gray-600">
                    Browse our premium fleet - {availableCars.length} vehicles available for booking
                </p>
            </div>

            {/* Cars Grid */}
            {availableCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {availableCars.map((car: TCar) => (
                        <div
                            key={car.carID}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group"
                        >
                            {/* Car Image Placeholder */}
                            <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
                                <Car className="h-16 w-16 text-blue-400" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                
                                {/* Availability Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                        <CheckCircle className="h-3 w-3" />
                                        Available
                                    </span>
                                </div>

                                {/* Car ID Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                                        ID: {car.carID}
                                    </span>
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="p-6">
                                {/* Car Model */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {car.carModel}
                                </h3>

                                {/* Car Info Grid */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">
                                            <span className="font-medium">Year:</span> {new Date(car.year).getFullYear()}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Palette className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">
                                            <span className="font-medium">Color:</span> {car.color || "Not specified"}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <DollarSign className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">
                                            <span className="font-medium">Rate:</span> 
                                            <span className="text-lg font-bold text-blue-600 ml-1">
                                                Ksh {parseFloat(car.rentalRate).toFixed(2)}
                                            </span>
                                            <span className="text-gray-500">/day</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        <span className="text-xs">5 Seats</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Settings className="h-4 w-4 text-gray-400" />
                                        <span className="text-xs">Auto</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Fuel className="h-4 w-4 text-gray-400" />
                                        <span className="text-xs">Petrol</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-xs">4.8</span>
                                    </div>
                                </div>

                                {/* Book Now Button */}
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                    <Car className="h-4 w-4" />
                                    Book This Car
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cars Available</h3>
                    <p className="text-gray-600">All cars are currently booked. Please check back later or contact us for availability updates.</p>
                </div>
            )}

            {/* Summary Stats */}
            {availableCars.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {availableCars.length}
                            </div>
                            <div className="text-sm text-gray-600">Available Cars</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                Ksh {Math.min(...availableCars.map(car => parseFloat(car.rentalRate))).toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Starting From</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                                Ksh {Math.max(...availableCars.map(car => parseFloat(car.rentalRate))).toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Premium Rate</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">
                                Ksh {(availableCars.reduce((avg, car) => avg + parseFloat(car.rentalRate), 0) / availableCars.length).toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">Average Rate</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCars;