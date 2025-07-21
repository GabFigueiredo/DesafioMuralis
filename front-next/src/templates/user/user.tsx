'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateToken } from "@/hooks/user/useCreateToken";
import { userSignInSchema, userSignInType } from "@/interfaces/user/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const { mutate } = useCreateToken()

  const { handleSubmit, register, reset, formState: { errors }, } = useForm<userSignInType>({
    resolver: zodResolver(userSignInSchema),
    mode: "onChange",
  });

  async function handleSubmitAction(formData: userSignInType) {
    mutate(formData)
    reset()
  }

  function handleFormError() {
    if (!errors.username?.message && !errors.password?.message) {
      return;
    }

    Object.values(errors).forEach((error) => {
      toast.loading(error?.message);
    });
  }

  return (
    <main className="flex items-center justify-center flex-col gap-7 h-screen">
      <User size={100} />
      <form 
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleSubmitAction, handleFormError)}>
        <div>
          <Label>Username</Label>
          <Input
            placeholder="Username"
            {...register("username")}
            />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            {...register("password")}
          />
        </div>
        <Button>Entrar</Button>
      </form>
    </main>
  );
}
