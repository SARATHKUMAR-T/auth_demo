import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import { createGuest, getGuest } from "./data-service"
import Credentials from 'next-auth/providers/credentials'


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
      authorize: async (credentials) => {
        console.log("authorize called", credentials);

        const user = {}
        if (!user) {
          return { message: 'no user found' }
        }
        return user
      },
    })
  ],
  callbacks: {
    authorized({ auth, request }: any) {
      console.log("authorized triggered");
      if (auth?.user?.email && request.nextUrl.pathname == '/login') {
        return NextResponse.redirect(new URL("/account", request.url))
      }
      return !!auth?.user
    },
    async signIn({ user, account, profile }: any) {
      try {
        if (account.provider === "google") {
          console.log(profile);
        }

        // const exisistingGuest = await getGuest(user.email)
        // if (!exisistingGuest) await createGuest({ email: user.email, fullName: user.name })
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