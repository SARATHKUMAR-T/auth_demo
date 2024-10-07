'use server'

import { signIn, signOut } from "@/auth";
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

    await signIn("credentials", validatedFileds.data)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { message: "Invalid Credentails Either email or password is wrong" }
  }
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}