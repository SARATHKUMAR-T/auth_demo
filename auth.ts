import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { createGuest, getGuest } from "./data-service"
import Credentials from 'next-auth/providers/credentials';
import { NextResponse } from "next/server";
import dbConnect from "./lib/dbConnection";
import User, { Users } from "./models/User";




const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email })
        console.log(user, "from db");
        if (user) {
          console.log("user triggered");
          return { ...user, _id: String(user._id) }
        } else {
          throw new Error("No user Found")
        }
      },
    })
  ],
  callbacks: {
    authorized({ auth, request }: any) {
      if (auth?.user?.email && request.nextUrl.pathname == '/login') {
        return NextResponse.redirect(new URL("/account", request.url))
      }
      return !!auth?.user
    },
    async signIn({ user, account, profile }: any) {
      try {
        await dbConnect();
        if (account.provider === "google") {
          console.log(user, "user");
          const userName = user?.name.split(" ")
          const exisistingGuest = await User.findOne({ email: user.email })
          if (!exisistingGuest) await User.create({ email: user.email, firstName: userName[0], lastName: userName[1], profileImg: user.profileImg, password: '', authProvider: "google" })
          return true
        }
        if (account.provider === "credentials") {
          return true
        }
        return true
      } catch (error) {
        console.log(error, "from signin");
        return false
      }
    },
    async session({ session, user }: any) {
      await dbConnect();
      const guest = await User.findOne({ email: session.user.email })
      session.user.user_id = guest._id
      console.log(session, "session");

      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}


export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)