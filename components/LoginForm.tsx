"use client";
import React from "react";
import { CardContent, CardDescription, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmittingButton from "./SubmittingButton";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInAction } from "@/lib/actions";

export type LoginUser = {
  email: string;
  password: string;
};

export default function LoginForm() {
  return (
    <>
      <form action={() => {}}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input required type="email" id="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" type="password" />
            </div>
          </div>
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
