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
    <form action="" className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      {/* In the className for tailwind , we first do it for the mobile screens and then for the pc */}
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500 text-sm font-normal">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500 text-sm font-normal">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500 text-sm font-normal">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be greater than 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 text-sm font-normal">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) return "This field is required";
              else if (watch("password") !== val)
                return "Your passwords do no match";
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm font-normal">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm ">
          Already Registered?{" "}
          <Link className="underline" to="/sign-in">
            Click here to Login
          </Link>
        </span>

        <button className="bg-yellow-600 text-white p-2 font-bold hover:bg-yellow-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
