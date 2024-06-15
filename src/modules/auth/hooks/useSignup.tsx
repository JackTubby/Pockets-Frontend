import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface SignupData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<void, AxiosError, SignupData>({
    mutationFn: async (data: SignupData) => {
      console.log("Data", data);
      await api.post("/signup", data);
    },
    onMutate: () => {
      console.log("Signing up...");
    },
    onError: (error) => {
      console.error("Error", error);
      console.error("Error Message: ", (error.response?.data as { message: string })?.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    },
  });

  const signup = useCallback(
    (data: SignupData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return { signup, ...mutation };
};

export default useSignup;
