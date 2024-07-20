import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type SignInFormData = {
  email: string;
  password: string;
};
function SignIn() {
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
        message: "Sign in Succesful",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
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
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span>
        <button className="bg-yellow-600 text-white p-2 font-bold hover:bg-yellow-500 text-xl">
          Login
        </button>
      </span>
    </form>
  );
}

export default SignIn;
