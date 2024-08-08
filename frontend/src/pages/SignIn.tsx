import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        message: "Sign in Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validate-token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: `Sign in Failed: ${error.message}`,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

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

        <div className="flex flex-col items-center gap-4">
          <span className="text-sm">
            Not Registered?{" "}
            <Link className="underline text-blue-500" to="/register">
              Create an account here
            </Link>
          </span>
          <button
            type="submit"
            className="bg-yellow-600 text-white p-2 font-bold rounded hover:bg-yellow-500 text-xl"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
