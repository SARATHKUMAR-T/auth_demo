'use server'

import { signIn, signOut } from "@/auth";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { z } from 'zod';
import { ACCOUNT_CREATION_SUCCEESSFUL, EXISISTING_USER_MESSAGE } from "./constants";
import { fetchCall } from "./utils";

const userValidationSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string({
    invalid_type_error: 'Invalid Password'
  }).min(6, "Mininum 6 Characters Required").max(40, "Maximum 40 Characters Allowed")
})


const newAccountValidationSchema = z.object({
  firstName: z.string({ required_error: "First Name Is Required" }).max(40, "Maximum 40 Characters Allowed"),
  lastName: z.string({ required_error: "Last Name Is Required" }).max(40, "Maximum 40 Characters Allowed"),
  email: z.string().email("Invalid Email"),
  password: z.string({
    invalid_type_error: 'Invalid Password'
  }).min(6, "Mininum 6 Characters Required").max(40, "Maximum 40 characters Allowed")
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
    console.log(res, "res");

    if (res) {
      redirect('/account')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error, "error from auth");
    console.log(error.message, "auth error");
    return { message: { error: error.message.split('.')[0] } }
  }
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

export async function createUserAccount(prevState: any, formData: FormData): Promise<any> {
  try {
    const validatedFileds = newAccountValidationSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password')
    })
    if (!validatedFileds.success) {
      const errors = validatedFileds.error.flatten().fieldErrors
      return {
        message: errors
      }
    }
    const userData = validatedFileds.data
    const user = await fetchCall('/user/userDetails', 'POST', { email: userData.email })
    if (!user.isError) {
      throw new Error(EXISISTING_USER_MESSAGE)
    }
    else {
      const hashedPassword = bcrypt.hashSync(userData.password, 10)
      const res = await fetchCall('/user/newUser', 'POST', { ...userData, password: hashedPassword })
      if (!res.isError) {
        return { message: { info: ACCOUNT_CREATION_SUCCEESSFUL } }
      } else {
        return { message: { info: "Unable To Create Account" } }
      }
    }
  } catch (error: any) {
    return { message: { error: error.message } }
  }
}






