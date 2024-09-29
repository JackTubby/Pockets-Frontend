import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";

interface BankAccount {
  id: string;
  name: string;
  balance: number;
}

const useFetchAccounts = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation<BankAccount, AxiosError, void>({
    mutationFn: async () => {
      const response = await api.get<BankAccount>("/bankaccount");
      console.log("Bank Accounts: ", response.data);
      return response.data;
    },
    onMutate: () => {},
    onError: (error) => {
      console.error("Error", error);
      console.error("Error Message: ", (error.response?.data as { message: string })?.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const fetchAccounts = useCallback(() => {
    mutation.mutate()
  }, [mutation])

  return {fetchAccounts, ...mutation}
};

export default useFetchAccounts;
