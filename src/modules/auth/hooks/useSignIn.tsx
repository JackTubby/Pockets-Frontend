import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../core/utils/app-provider";
import { AxiosError } from "axios";
import { useCallback } from "react";

interface SignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: {
    authorisedAccounts: {
      id: string;
    }[];
  };
}

const useSignIn = () => {
  const { api, setToken, setAccountId } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation<SignInResponse, AxiosError, SignInData>({
    mutationFn: async (data: SignInData) => {
      console.log("Data", data);
      const response = await api.post("/signin", data);
      return response.data;
    },
    onMutate: () => {
      console.log("Signing in...");
    },
    onError: (error) => {
      console.error("Error", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setToken(data.token);
      setAccountId(data.user.authorisedAccounts[0].id);
    },
  });

  const signIn = useCallback(
    (data: SignInData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return { signIn, ...mutation };
};

export default useSignIn;
