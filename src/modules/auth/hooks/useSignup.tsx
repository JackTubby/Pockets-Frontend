import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
