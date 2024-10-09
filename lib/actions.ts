'use server'

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { z } from 'zod'

const userValidationSchema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email'
  }).email("Invalid Email"),
  password: z.string({
    invalid_type_error: 'Invalid Password'
  })
})

export async function credentialsSignIn(prevState: any, formData: FormData): Promise<any> {
  try {
    const validatedFileds = userValidationSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    })


    if (!validatedFileds.success) {
      const errors = validatedFileds.error.flatten().fieldErrors
      return {
        message: errors
      }
    }

    const res = await signIn("credentials", {
      email: validatedFileds.data.email,
      password: validatedFileds.data.password,
      redirect: false
    })
    if (res) {
      redirect('/account')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error, "error from auth");
    console.log(error.message, "auth error");
    return { message: error.message.split('.')[0] }
  }
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}