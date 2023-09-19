import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// Database
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import clientPromise from "@/utils/mongodb";

export const options: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id ?? profile.sub,
          image: profile.picture ?? "/assets/icons/default_avatar.jpeg",
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.image ?? "/assets/icons/default_avatar.jpeg",
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, request) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (
          user &&
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: sessionUser._id.toString(),
          role: sessionUser.role,
        },
      };
    },
    async signIn({ user, profile }) {
      if (profile) {
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
              password: "SSSaaa123123",
              role: "user",
            });
          }

          return true;
        } catch (error) {
          console.log(error.message);
          return false;
        }
      } else {
        return user ? true : false;
      }
    },
    async redirect({ baseUrl, url }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login-register",
  },
};
