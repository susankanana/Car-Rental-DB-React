import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { carAPI } from "../../../features/cars/carsAPI";
import { toast } from "sonner";

type CreateCarInputs = {
  carModel: string;
  year: string;
  color?: string;
  rentalRate: number;
  availability: boolean;
  locationID?: number;
};

const schema: yup.ObjectSchema<CreateCarInputs> = yup.object({
  carModel: yup.string().max(100).required("Car model is required"),
  year: yup.string().required("Manufacture year is required"),
  color: yup.string().max(30).optional(), // ✅ Marked as optional
  rentalRate: yup
    .number()
    .typeError("Rental rate must be a number")
    .positive("Rental rate must be positive")
    .required("Rental rate is required"),
  availability: yup.boolean().default(true),
  locationID: yup
    .number()
    .positive("Location ID must be positive")
    .integer("Location ID must be an integer")
    .optional(), // ✅ Marked as optional
});

type CreateCarProps = {
  refetch: () => void;
};

const CreateCar = ({ refetch }: CreateCarProps) => {
  const [createCar, { isLoading }] = carAPI.useCreateCarMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCarInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateCarInputs> = async (data) => {
  try {
    const payload = {
      ...data,
      rentalRate: data.rentalRate.toString(),
    };

    await createCar(payload).unwrap();
    toast.success("Car added successfully!");
    reset();
    refetch();
    (document.getElementById("create_car_modal") as HTMLDialogElement)?.close();
  } catch (error) {
    console.error("Error creating car:", error);
    toast.error("Failed to add car. Please try again.");
  }
};

  return (
    <dialog id="create_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Add New Car</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("carModel")}
            placeholder="Car Model"
            className="input w-full p-2 bg-white text-gray-800"
          />
          {errors.carModel && <span className="text-sm text-red-700">{errors.carModel.message}</span>}

          <input
            type="date"
            {...register("year")}
            placeholder="Manufacture Year"
            className="input w-full p-2 bg-white text-gray-800"
          />
          {errors.year && <span className="text-sm text-red-700">{errors.year.message}</span>}

          <input
            type="text"
            {...register("color")}
            placeholder="Color (Optional)"
            className="input w-full p-2 bg-white text-gray-800"
          />
          {errors.color && <span className="text-sm text-red-700">{errors.color.message}</span>}

          <input
            type="number"
            step="0.01"
            {...register("rentalRate")}
            placeholder="Rental Rate (e.g. 1500.00)"
            className="input w-full p-2 bg-white text-gray-800"
          />
          {errors.rentalRate && <span className="text-sm text-red-700">{errors.rentalRate.message}</span>}

          <input
            type="number"
            {...register("locationID")}
            placeholder="Location ID (Optional)"
            className="input w-full p-2 bg-white text-gray-800"
          />
          {errors.locationID && <span className="text-sm text-red-700">{errors.locationID.message}</span>}

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-white mr-4">Availability</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="true"
                    {...register("availability")}
                    className="radio radio-success"
                    defaultChecked
                  />
                  Available
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="false"
                    {...register("availability")}
                    className="radio radio-error"
                  />
                  Unavailable
                </label>
              </div>
            </label>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Adding...
                </>
              ) : (
                "Add Car"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("create_car_modal") as HTMLDialogElement)?.close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateCar;
