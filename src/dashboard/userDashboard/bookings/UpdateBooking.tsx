import { bookingAPI, type TBooking } from "../../../features/bookings/bookingsAPI";
import { toast } from "sonner";

type UpdateBookingProps = {
    booking: TBooking | null;
    refetch: () => void;
};

const UpdateBooking = ({ booking, refetch }: UpdateBookingProps) => {
    const [updateBooking, { isLoading }] = bookingAPI.useUpdateBookingMutation({ fixedCacheKey: "updateBooking" });

    if (!booking) return null;

    const handleDateExtension = async () => {
        try {
            const newEndDate = new Date(booking.rentalEndDate);
            newEndDate.setDate(newEndDate.getDate() + 3); // Extend by 3 days as an example

            const result = await updateBooking({
                bookingID: booking.bookingID,
                rentalEndDate: newEndDate.toISOString().split("T")[0] // Format to yyyy-mm-dd
            });

            console.log("Booking updated successfully:", result);
            toast.success("Rental end date extended by 3 days!");
            refetch();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating booking:", error);
            toast.error("Failed to update booking. Please try again.");
        }
    };

    return (
        <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Extend Booking</h3>
                <p className="mb-6">
                    Do you want to extend booking for <span className="font-semibold">Car #{booking.carID}</span> from{" "}
                    <span className="text-yellow-300">{new Date(booking.rentalEndDate).toLocaleDateString()}</span> to{" "}
                    <span className="text-green-300">
                        {new Date(new Date(booking.rentalEndDate).setDate(new Date(booking.rentalEndDate).getDate() + 3)).toLocaleDateString()}
                    </span>?
                </p>
                <div className="modal-action flex flex-col sm:flex-row gap-2">
                    <button
                        className="btn btn-success w-full sm:w-auto"
                        onClick={handleDateExtension}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Extend by 3 Days"}
                    </button>
                    <button
                        className="btn w-full sm:w-auto"
                        type="button"
                        onClick={() => (document.getElementById('update_modal') as HTMLDialogElement)?.close()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateBooking;
