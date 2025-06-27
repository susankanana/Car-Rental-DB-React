import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/users/usersAPI";
import { toast } from "sonner";
import { useEffect } from "react";

type UpdateProfileInputs = {
  firstName: string;
  lastName: string;
  image_url: string;
};

const schema = yup.object({
  firstName: yup.string().max(50, "Max 50 characters").required("First name is required"),
  lastName: yup.string().max(50, "Max 50 characters").required("Last name is required"),
  image_url: yup.string().url("Invalid URL").required("Image URL is required"),
});

interface User {
  customerID: number;
  firstName?: string;
  lastName?: string;
  image_url?: string;
}

interface UpdateProfileProps {
  user: User;
  refetch?: () => void;
}

const UpdateProfile = ({ user, refetch }: UpdateProfileProps) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation({ fixedCacheKey: "updateUser" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      image_url: user?.image_url || "",
    },
  });

  // Reset form with new user data
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("image_url", user.image_url || "");
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
    try {
      await updateUser({ id: user.customerID, ...data });
      toast.success("Profile updated successfully!");
      refetch?.();
      reset();
      (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <dialog id="update_profile_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        {/* 👇 Image preview */}
        {watch("image_url") && (
          <img
            src={watch("image_url")}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border mx-auto"
            onError={(e) => {
              e.currentTarget.src =
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            }}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.firstName && <span className="text-sm text-red-700">{errors.firstName.message}</span>}

          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.lastName && <span className="text-sm text-red-700">{errors.lastName.message}</span>}

          <input
            type="text"
            {...register("image_url")}
            placeholder="Image URL"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.image_url && <span className="text-sm text-red-700">{errors.image_url.message}</span>}

          <div className="modal-action flex flex-col sm:flex-row gap-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn w-full sm:w-auto"
              type="button"
              onClick={() => {
                (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProfile;
