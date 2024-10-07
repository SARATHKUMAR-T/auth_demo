import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { createGuest, getGuest } from "./data-service"
import Credentials from 'next-auth/providers/credentials';
import { NextResponse } from "next/server";
import dbConnect from "./lib/dbConnection";
import User from "./models/User";




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
        if (!user || user?.length === 0) {
          throw new Error("No user Found")
        }
        return user
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
          console.log(profile);
          // const exisistingGuest = await User.find({ email: user.email })
          // if (!exisistingGuest) await User.create({ email: user.email, fullName: user.name })

        }
        // if (account.provider === "credentials") {
        //   console.log(profile, "from credentials", user, account);
        //   // const exisistingGuest = await User.find({ email: user.email })
        //   // console.log(exisistingGuest, "guest");
        // }

        return true
      } catch (error) {
        console.log(error, "from signin");

        return false
      }
    },
    async session({ session, user }: any) {
      // const guest = await getGuest(session.user.email)
      // session.user.guestId = guest.id
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}


export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)