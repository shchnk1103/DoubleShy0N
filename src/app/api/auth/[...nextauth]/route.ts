import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      return {
        ...session,
        user: {
          ...session.user,
          id: sessionUser._id.toString(),
        },
      };
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // check if user exists
        const userExists = await User.findOne({ email: profile.email });

        // if user does not exist, create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };