import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";

interface TotalBalance {
  total: string;
}

const useAccountTotal = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation<TotalBalance, AxiosError, void>({
    mutationFn: async () => {
      const response = await api.get<TotalBalance>("/totalbalance");
      console.log("Total Balance: ", response.data);
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

  const fetchTotal = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return { fetchTotal, ...mutation };
};

export default useAccountTotal;