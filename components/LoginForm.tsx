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

// export type LoginUser = {
//   email: string;
//   password: string;
// };

const initialState = {
  message: "",
};

export default function LoginForm() {
  const [state, formAction] = useFormState(credentialsSignIn, initialState);
  console.log(state, "state");
  return (
    <>
      <form action={formAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" required type="email" id="email" />
              {state.message.email && (
                <span className="text-red-500">{state?.message?.email[0]}</span>
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
              {state.message.password && (
                <span className="text-red-500">
                  {state?.message?.password[0]}
                </span>
              )}
            </div>
          </div>
          {state?.message && (
            <span className="text-red-400">{state.message}</span>
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
