import { toast } from "sonner";
import { carAPI, type TCar } from "../../../features/cars/carsAPI";

type DeleteCarProps = {
  car: TCar | null;
  refetch: () => void;
};

const DeleteCar = ({ car, refetch }: DeleteCarProps) => {
  const [deleteCar, { isLoading }] = carAPI.useDeleteCarMutation(
    { fixedCacheKey: "deleteCar" }
  );

  const handleDelete = async () => {
    try {
      if (!car) {
        toast.error("No car selected for deletion.");
        return;
      }

      await deleteCar(car.carID).unwrap();
      toast.success("Car deleted successfully!");

      refetch();
      (document.getElementById("delete_car_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car. Please try again.");
    }
  };

  return (
    <dialog id="delete_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Car</h3>
        <p className="mb-6">
          Are you sure you want to delete <span className="font-semibold">{car?.carModel}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" /> Deleting...
              </>
            ) : "Yes, Delete"}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => (document.getElementById("delete_car_modal") as HTMLDialogElement)?.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteCar;
