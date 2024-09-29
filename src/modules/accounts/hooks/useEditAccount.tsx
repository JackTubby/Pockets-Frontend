import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";
// import { useNavigate } from "react-router";

interface EditAccountData {
  id: string;
  digits: string;
  balance: string;
  color: string;
  name: string;
}

const useEditAccount = () => {
  const { api } = useAppContext();
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const mutation = useMutation<void, AxiosError, EditAccountData>({
    mutationFn: async (data: EditAccountData) => {
      console.log("Edit data:", data);
      await api.put(`/bankaccount/${data.id}`, data);
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

  const editAccount = useCallback(
    (data: EditAccountData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return { editAccount, ...mutation };
};

export default useEditAccount;
