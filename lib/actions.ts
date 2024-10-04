'use server'

import { signIn, signOut } from "@/auth"
import { LoginUser } from "@/components/LoginForm";

export async function credentialsSignIn(formData: LoginUser) {
  try {
    const res = await signIn("credentials", formData)
    console.log(res);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { message: error.message }
  }
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}