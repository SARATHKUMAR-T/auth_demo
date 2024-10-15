"use client";
import React from "react";
import { CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmittingButton from "./SubmittingButton";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  createUserAccount,
  credentialsSignIn,
  signInAction,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import {
  ACCOUNT_CREATION_SUCCEESSFUL,
  EXISISTING_USER_MESSAGE,
  NO_USER_FOUND,
  REDIRECT_TO_SIGNIN,
  REDIRECT_TO_SIGNUP,
} from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// export type LoginUser = {
//   email: string;
//   password: string;
// };

const initialState = {
  message: "",
};

export default function SignUpForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createUserAccount, initialState);
  if (state.message.error === EXISISTING_USER_MESSAGE) {
    setTimeout(() => toast.warning(REDIRECT_TO_SIGNIN), 800);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
  if (state.message.info === ACCOUNT_CREATION_SUCCEESSFUL) {
    setTimeout(() => toast.success(REDIRECT_TO_SIGNIN), 800);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
  return (
    <>
      <form action={formAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input name="firstName" required type="text" id="firstName" />
              {state?.message?.firstName && (
                <span className="text-red-500">
                  {state?.message?.firstName[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Last Name</Label>
              <Input name="lastName" required type="text" id="lastName" />
              {state?.message?.lastName && (
                <span className="text-red-500">
                  {state?.message?.lastName[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" required type="email" id="email" />
              {state?.message?.email && (
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
              {state?.message?.password && (
                <span className="text-red-500">
                  {state?.message?.password[0]}
                </span>
              )}
            </div>
          </div>
          <p className="text-red-500">
            {state?.message?.error ? `${state.message.error}` : ""}
          </p>
        </CardContent>
        <CardFooter>
          <SubmittingButton pendingLabel="Creating ...">
            Create Account
          </SubmittingButton>
        </CardFooter>
      </form>
    </>
  );
}
