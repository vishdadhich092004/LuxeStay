import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validate-token");
      showToast({
        message: "Signed out successfully!",
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

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="bg-white text-yellow-600 px-4 py-2 font-bold rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
