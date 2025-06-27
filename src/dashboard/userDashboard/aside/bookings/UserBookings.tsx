import { bookingAPI, type TBooking } from "../../../../features/bookings/bookingsAPI";
import { type RootState } from "../../../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import UpdateBooking from "./UpdateBooking";
import { Edit, Trash2} from "lucide-react";

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

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* 🔷 Header Card */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Bookings</h2>
        <p className="text-sm text-gray-600">View and manage your existing car rental bookings below.</p>
      </div>

      {/* 🔁 Update Booking Modal */}
      <UpdateBooking booking={selectedBooking} refetch={refetch} />

      {/* 🔄 Loading/Error */}
      {isLoading && (
        <div className="text-center text-gray-600 animate-pulse">Loading bookings...</div>
      )}
      {error && (
        <div className="text-red-500 text-center">Error fetching bookings</div>
      )}

      {/* ✅ Bookings Data */}
      {bookingsData && bookingsData.length > 0 ? (
        <>
          {/* 💻 Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
            <table className="min-w-full table-auto text-sm text-left text-gray-800">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Booking ID</th>
                  <th className="px-6 py-3">Car ID</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {bookingsData.map((booking) => (
                  <tr key={booking.bookingID} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4">
                     <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                      #{booking.bookingID}
                     </span>
                    </td>
                    <td className="px-6 py-4">
                     <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                      Car #{booking.carID}
                     </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {new Date(booking.rentalStartDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {new Date(booking.rentalEndDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                        Ksh {parseFloat(booking.totalAmount).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-blue-200"
                        onClick={() => {
                          setSelectedBooking(booking);
                          (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-red-200"
                        disabled={isDeleting}
                        onClick={() => handleCancelBooking(booking.bookingID)}
                      >
                        {isDeleting ? "..." : (
                          <>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Cancel
                          </>
                        )}

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {bookingsData.map((booking) => (
              <div key={booking.bookingID} className="border rounded-xl shadow-sm p-4 bg-white">
                <div className="mb-2 flex justify-between">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                    #{booking.bookingID}
                  </span>
                  <span className="text-gray-900 font-medium">{booking.bookingID}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-500 text-xs">Car ID</span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Car #{booking.carID}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-500 text-xs">Start</span>
                  <span className="text-blue-700 font-semibold text-sm">
                    {new Date(booking.rentalStartDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-500 text-xs">End</span>
                  <span className="text-purple-700 font-semibold text-sm">
                    {new Date(booking.rentalEndDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-4 flex justify-between">
                  <span className="text-gray-500 text-xs">Amount</span>
                  <span className="bg-green-100 text-green-800 font-bold px-2 py-1 text-sm rounded-full">
                    Ksh {parseFloat(booking.totalAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-blue-200"
                    onClick={() => {
                      setSelectedBooking(booking);
                      (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-red-200"
                    disabled={isDeleting}
                    onClick={() => handleCancelBooking(booking.bookingID)}
                  >
                    {isDeleting ? "..." : (
                          <>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Cancel
                          </>
                        )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">You have no bookings yet.</div>
      )}
    </div>
  );
};

export default UserBookings;
