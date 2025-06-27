import { carAPI, type TCar } from "../../../features/cars/carsAPI";
import { Edit, Trash2, Car, Calendar, Palette, DollarSign, CheckCircle, XCircle, Plus } from "lucide-react";
import { useState } from "react";
import CreateCar from "./CreateCar";
import UpdateCar from "./UpdateCar";
import DeleteCar from "./DeleteCar";

const Cars = () => {
    const { data: carsData, isLoading, error, refetch } = carAPI.useGetCarsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
    const [carToDelete, setCarToDelete] = useState<TCar | null>(null);

    const handleEdit = (car: TCar) => {
        setSelectedCar(car);
        (document.getElementById('update_car_modal') as HTMLDialogElement)?.showModal();
    };

    const handleDelete = (car: TCar) => {
        setCarToDelete(car);
        (document.getElementById('delete_car_modal') as HTMLDialogElement)?.showModal();
    };

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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Car className="h-7 w-7 text-blue-600" />
                            Fleet Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your car rental fleet - {carsData?.data?.length || 0} vehicles total
                        </p>
                    </div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md"
                        onClick={() => (document.getElementById('create_car_modal') as HTMLDialogElement)?.showModal()}
                    >
                        <Plus className="h-5 w-5" />
                        Add New Car
                    </button>
                </div>
            </div>

            {/* Modals */}
            <CreateCar refetch={refetch} />
            <UpdateCar car={selectedCar} refetch={refetch} />
            <DeleteCar car={carToDelete} refetch={refetch} />

            {/* Cars Grid */}
            {carsData && carsData.data && carsData.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {carsData.data.map((car: TCar) => (
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
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                        car.availability 
                                            ? 'bg-green-100 text-green-800 border border-green-200' 
                                            : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                        {car.availability ? (
                                            <>
                                                <CheckCircle className="h-3 w-3" />
                                                Available
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-3 w-3" />
                                                Unavailable
                                            </>
                                        )}
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

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(car)}
                                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-blue-200"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car)}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-red-200"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars in your fleet</h3>
                    <p className="text-gray-600 mb-6">Get started by adding your first vehicle to the system</p>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                        onClick={() => (document.getElementById('create_car_modal') as HTMLDialogElement)?.showModal()}
                    >
                        <Plus className="h-5 w-5" />
                        Add Your First Car
                    </button>
                </div>
            )}

            {/* Summary Stats */}
            {carsData && carsData.data && carsData.data.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {carsData.data.length}
                            </div>
                            <div className="text-sm text-gray-600">Total Cars</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                {carsData.data.filter((car: TCar) => car.availability).length}
                            </div>
                            <div className="text-sm text-gray-600">Available</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                                {carsData.data.filter((car: TCar) => !car.availability).length}
                            </div>
                            <div className="text-sm text-gray-600">Unavailable</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">
                                Ksh {carsData.data.reduce((avg: number, car: TCar) => avg + parseFloat(car.rentalRate), 0) / carsData.data.length}
                            </div>
                            <div className="text-sm text-gray-600">Avg. Rate</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cars;