import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
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
        if (!user) {
          throw new AuthError("No User Found")
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
        if (account.provider === "google") {
          await dbConnect();
          const userName = user?.name.split(" ")
          const exisistingGuest = await User.findOne({ email: user.email })
          if (!exisistingGuest) await new User({ email: user.email, firstName: userName[0], lastName: userName[1], profileImg: user.image, password: '', authProvider: "google" }).save()
          return true
        }
        return true
      } catch (error) {
        console.log(error, "from signin");
        return false
      }
    },

    async session({ session, user }: any) {
      // await dbConnect();
      // const guest = await User.find({ email: session.user.email })
      // session.user.user_id = guest[0]._id
      // console.log(session, "session");

      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}


export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)