"use client";
import React from "react";
import { CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmittingButton from "./SubmittingButton";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { credentialsSignIn, signInAction } from "@/lib/actions";
import { useFormState } from "react-dom";
import { NO_USER_FOUND, REDIRECT_TO_SIGNUP } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

// export type LoginUser = {
//   email: string;
//   password: string;
// };

const initialState = {
  message: "",
};

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(credentialsSignIn, initialState);
  if (state.message.error === NO_USER_FOUND) {
    setTimeout(() => toast.warning(REDIRECT_TO_SIGNUP), 800);
    setTimeout(() => {
      router.push("/signup");
    }, 2000);
  }
  return (
    <>
      <form action={formAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" required type="email" id="email" />
              {state?.message?.email && (
                <Badge className="mt-4" variant="destructive">
                  {state?.message?.email[0]}
                </Badge>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                maxLength={35}
                required
                id="password"
                type="password"
              />
              {state?.message?.password && (
                <Badge className="mt-4" variant="destructive">
                  {state?.message?.password[0]}
                </Badge>
              )}
            </div>
          </div>
          {state?.message?.error && (
            <Badge className="mt-6" variant="destructive">
              {state.message.error}
            </Badge>
          )}
        </CardContent>
        <CardFooter>
          <SubmittingButton pendingLabel="Logging In ...">
            Login
          </SubmittingButton>
        </CardFooter>
      </form>
      <CardDescription className="text-center mb-3">or</CardDescription>
      <CardFooter>
        <form action={signInAction} className="w-full">
          <Button className="flex w-full items-center justify-center gap-3">
            <FcGoogle className="h-6 w-6" />
            <p>Sign In With Google</p>
          </Button>
        </form>
      </CardFooter>
    </>
  );
}
