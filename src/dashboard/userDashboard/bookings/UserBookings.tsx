import { bookingAPI, type TBooking } from "../../../features/bookings/bookingsAPI";
import { type RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import UpdateBooking from "./UpdateBooking";
import { 
  Calendar, 
  Car, 
  DollarSign, 
  Edit, 
  Trash2, 
  XCircle, 
  CheckCircle, 
  Clock,
  MapPin,
  User,
  CreditCard
} from "lucide-react";

const UserBookings = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const customerID = user?.customerID;

  const { data: bookingsData, isLoading, error, refetch } =
    bookingAPI.useGetBookingsByCustomerIdQuery(customerID ?? 0, {
      skip: !customerID,
      refetchOnMountOrArgChange: true,
    });

  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [deleteBooking, { isLoading: isDeleting }] = bookingAPI.useDeleteBookingMutation();

  const handleCancelBooking = async (id: number) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success("Booking canceled successfully!");
      refetch();
    } catch (err) {
      console.error("Error canceling booking:", err);
      toast.error("Failed to cancel booking. Try again.");
    }
  };

  const getBookingStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return { status: 'upcoming', color: 'blue', label: 'Upcoming' };
    if (now >= start && now <= end) return { status: 'active', color: 'green', label: 'Active' };
    return { status: 'completed', color: 'gray', label: 'Completed' };
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
        <p className="text-red-700 text-lg font-semibold">Error fetching bookings</p>
        <p className="text-red-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="h-7 w-7 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
        </div>
        <p className="text-gray-600">
          Manage your car rental bookings - {bookingsData?.length || 0} total bookings
        </p>
      </div>

      {/* Update Booking Modal */}
      <UpdateBooking booking={selectedBooking} refetch={refetch} />

      {/* Bookings Grid */}
      {bookingsData && bookingsData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookingsData.map((booking: TBooking) => {
            const bookingStatus = getBookingStatus(booking.rentalStartDate, booking.rentalEndDate);
            const duration = calculateDuration(booking.rentalStartDate, booking.rentalEndDate);
            
            return (
              <div
                key={booking.bookingID}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Booking #{booking.bookingID}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Car ID: {booking.carID}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      bookingStatus.status === 'upcoming' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      bookingStatus.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {bookingStatus.label}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                  {/* Dates Section */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">Start Date:</span>
                        <div className="text-sm text-gray-900">
                          {new Date(booking.rentalStartDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">End Date:</span>
                        <div className="text-sm text-gray-900">
                          {new Date(booking.rentalEndDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        <span className="font-medium">Duration:</span> {duration} day{duration !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Amount Section */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Total Amount</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          Ksh {parseFloat(booking.totalAmount).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ksh {(parseFloat(booking.totalAmount) / duration).toFixed(2)}/day
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                      }}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-blue-200"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.bookingID)}
                      disabled={isDeleting}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
          <p className="text-gray-600 mb-6">You haven't made any car rental bookings yet. Start exploring our fleet!</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto">
            <Car className="h-5 w-5" />
            Browse Available Cars
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {bookingsData && bookingsData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {bookingsData.length}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {bookingsData.filter(booking => {
                  const status = getBookingStatus(booking.rentalStartDate, booking.rentalEndDate);
                  return status.status === 'active';
                }).length}
              </div>
              <div className="text-sm text-gray-600">Active Rentals</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {bookingsData.filter(booking => {
                  const status = getBookingStatus(booking.rentalStartDate, booking.rentalEndDate);
                  return status.status === 'upcoming';
                }).length}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                Ksh {bookingsData.reduce((total, booking) => total + parseFloat(booking.totalAmount), 0).toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;