import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: `Registration Failed, ${error}`, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              First Name
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Last Name
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-2 px-3 mt-1"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-2 px-3 mt-1"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be greater than 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-2 px-3 mt-1"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) return "This field is required";
                else if (watch("password") !== val)
                  return "Your passwords do not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-3">
            Already Registered?{" "}
            <Link className="underline text-blue-500" to="/sign-in">
              Click here to Login
            </Link>
          </span>
          <button
            type="submit"
            className="bg-yellow-600 text-white p-2 font-bold rounded hover:bg-yellow-500 text-xl"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
