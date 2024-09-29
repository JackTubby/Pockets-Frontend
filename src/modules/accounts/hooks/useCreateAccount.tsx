import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";
// import { useNavigate } from "react-router";

interface CreateAccountData {
  digits: string;
  balance: string;
  color: string;
  name: string;
}

const useCreateAccount = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const mutation = useMutation<void, AxiosError, CreateAccountData>({
    mutationFn: async (data: CreateAccountData) => {
      console.log("Data:", data);
      await api.post("/bankaccount", data);
    },
    onMutate: () => {
      console.log("Creating bank account...");
    },
    onError: (error) => {
      console.error("Error", error);
      console.error("Error Message: ", (error.response?.data as { message: string })?.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // navigate("accounts");
    },
  });

  const createAccount = useCallback(
    (data: CreateAccountData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return { createAccount, ...mutation };
};

export default useCreateAccount;
