import { signOutAction } from "@/lib/actions";
import { ArrowRightCircleIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button>
        <ArrowRightCircleIcon className="h-6 w-6 text-primary-600" />
        <span>Sign out</span>
      </Button>
    </form>
  );
}
