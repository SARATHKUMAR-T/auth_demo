'use server'

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { z } from 'zod'
import dbConnect from "./dbConnection";
import User from "@/models/User";
import bcrypt from 'bcrypt'
import { ACCOUNT_CREATION_SUCCEESSFUL, EXISISTING_USER_MESSAGE } from "./constants";

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
      redirectTo: "/account"
    })
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
    await dbConnect()
    const user = await User.findOne({ email: userData.email })
    if (user) {
      throw new Error(EXISISTING_USER_MESSAGE)
    }
    else {
      const hashedPassword = bcrypt.hashSync(userData.password, 10)
      await User.create({ ...userData, password: hashedPassword })
      return { message: { info: ACCOUNT_CREATION_SUCCEESSFUL } }
    }
  } catch (error: any) {
    return { message: { error: error.message } }
  }
}