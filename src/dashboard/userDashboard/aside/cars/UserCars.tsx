import { carAPI, type TCar } from "../../../../features/cars/carsAPI";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Car, Calendar, Palette, DollarSign } from "lucide-react";

const UserCars = () => {
  const { data: carsData, isLoading, error } = carAPI.useGetCarsQuery();
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

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Available Cars</h2>
        <p className="text-sm text-gray-600">Choose from our fleet of available vehicles for rent.</p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center min-h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!isLoading && availableCars.length === 0 && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200 text-center">
          No cars are currently available. Please check back later.
        </div>
      )}

      {availableCars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableCars.map((car: TCar) => (
            <div
              key={car.carID}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group"
            >
              {/* Placeholder Image Section */}
              <div className="h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
                <Car className="h-12 w-12 text-blue-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Car Details Section */}
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {car.carModel}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>
                      <span className="font-medium">Year:</span> {new Date(car.year).getFullYear()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-blue-500" />
                    <span>
                      <span className="font-medium">Color:</span> {car.color || "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span>
                      <span className="font-medium">Rate:</span>{" "}
                      <span className="text-blue-700 font-bold">Ksh {parseFloat(car.rentalRate).toFixed(2)}</span> /day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCars;
