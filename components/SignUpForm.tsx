"use client";
import { createUserAccount } from "@/lib/actions";
import {
  ACCOUNT_CREATION_SUCCEESSFUL,
  EXISISTING_USER_MESSAGE,
  REDIRECT_TO_SIGNIN,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SubmittingButton from "./SubmittingButton";
import { Badge } from "./ui/badge";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
                <Badge variant="destructive">
                  {state?.message?.firstName[0]}
                </Badge>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Last Name</Label>
              <Input name="lastName" required type="text" id="lastName" />
              {state?.message?.lastName && (
                <Badge variant="destructive">
                  {state?.message?.lastName[0]}
                </Badge>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" required type="email" id="email" />
              {state?.message?.email && (
                <Badge variant="destructive">{state?.message?.email[0]}</Badge>
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
                <Badge variant="destructive">
                  {state?.message?.password[0]}
                </Badge>
              )}
            </div>
          </div>
          {state?.message?.error && <Badge>${state.message.error}</Badge>}
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
