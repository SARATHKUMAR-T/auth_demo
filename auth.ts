import NextAuth, { AuthError } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { fetchCall } from "./lib/utils";




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
        const user = await fetchCall('/login', 'POST', credentials)
        if (!user.isError) {
          return { ...user }
        }
        else {
          throw new AuthError(user.message)
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
        if (account.provider === "google") {
          const userName = user?.name.split(" ")
          const exisistingGuest = await fetchCall('/checkUser', 'POST', { email: user.email })
          console.log(exisistingGuest, "ex guest");
          if (exisistingGuest.isError) await fetchCall('/addUser', 'POST', { email: user.email, firstName: userName[0], lastName: userName[1], profileImg: user.image, password: '', authProvider: "google" })
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