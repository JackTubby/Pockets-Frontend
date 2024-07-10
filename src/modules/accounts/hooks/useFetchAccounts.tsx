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

  const mutation = useMutation<BankAccount[], AxiosError, void>({
    mutationFn: async () => {
      const response = await api.get<BankAccount[]>("/bankaccount");
      return response.data;
    },
    onMutate: () => {
      console.log("Fetching bank accounts...");
    },
    onError: (error) => {
      console.error("Error fetching bank accounts: ", error?.response?.data?.message || error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("Fetched bank accounts: ", data);
    },
  });

  const fetchAccounts = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return { fetchAccounts, ...mutation };
};

export default useFetchAccounts;
