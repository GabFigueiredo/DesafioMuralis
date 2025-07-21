import { userSignInType } from "@/interfaces/user/userSchema";
import { ValidationError } from "@/interfaces/validation-error";
import { createToken } from "@/services/user/createToken";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useCreateToken() {
  const mutation = useMutation({
    mutationFn: (data: userSignInType) => createToken(data),
    onSuccess: (data) => {
      sessionStorage.setItem("Token", data.token);
      toast.success("Você tem acesso ao sistema.");
    },
    onError: (error: AxiosError<ValidationError[]>) => {
      if (error?.response?.status === 403) {
        toast.error("Você não tem acesso ao sistema.");
      } else {
        toast.error("Não foi possível criar o token");
      }
    },
  });

  return {
    mutate: mutation.mutate,
    status: mutation.status,
  };
}
