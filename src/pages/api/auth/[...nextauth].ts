import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //       const adminEmails = process.env.ADMIN_EMAIL as string
  //       if (adminEmails.includes(email as string)) {
  //         return true
  //       } else {
  //         // Return false to display a default error message
  //         return false
  //         // Or you can return a URL to redirect to:
  //         // return '/unauthorized'
  //       }
  //     }
  // },
  adapter: MongoDBAdapter(clientPromise)
})