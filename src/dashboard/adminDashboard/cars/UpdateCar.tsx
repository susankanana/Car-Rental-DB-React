import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { carAPI, type TCar } from "../../../features/cars/carsAPI";
import { toast } from "sonner";

type UpdateCarProps = {
  car: TCar | null;
  refetch: () => void;
};

type UpdateCarInputs = {
  carModel: string;
  year: string;
  color?: string;
  rentalRate: number;
  availability: boolean;
  locationID?: number;
};

const schema:yup.ObjectSchema<UpdateCarInputs> = yup.object({ //necessary when optional fields are invloved
  carModel: yup.string().max(100).required("Car model is required"),
  year: yup.string().required("Manufacture year is required"),
  color: yup.string().max(30).optional(),
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
    .optional(),
});

const UpdateCar = ({ car, refetch}: UpdateCarProps) => {
  const [updateCar, { isLoading }] = carAPI.useUpdateCarMutation({ fixedCacheKey: "updateCar" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateCarInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (car) {
      setValue("carModel", car.carModel);
      setValue("year", car.year.slice(0, 10));
      setValue("color", car.color || "");
      setValue("rentalRate", parseFloat(car.rentalRate));
      setValue("availability", car.availability);
      setValue("locationID", car.locationID ?? undefined);
    } else {
      reset();
    }
  }, [car, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateCarInputs> = async (data) => {
    try {
      if (!car) {
        toast.error("No car selected for update.");
        return;
      }

      const payload = {
        ...data,
        rentalRate: data.rentalRate.toString(),
        carID: car.carID,
      };

      await updateCar(payload).unwrap();
      toast.success("Car updated successfully!");
      refetch();
      reset();
      (document.getElementById("update_car_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  return (
    <dialog id="update_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Car</h3>
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
            placeholder="Rental Rate"
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
                    defaultChecked={car?.availability === true}
                  />
                  Available
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="false"
                    {...register("availability")}
                    className="radio radio-error"
                    defaultChecked={car?.availability === false}
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
                  <span className="loading loading-spinner text-primary" /> Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                (document.getElementById("update_car_modal") as HTMLDialogElement)?.close();
                reset();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateCar;
