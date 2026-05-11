// src/lib/auth.ts
import type { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// 1. Buat tipe khusus untuk Session User kita
interface CustomUser {
  id: string;
  name?: string | null;
  image?: string | null;
  email: string;
  role: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true },
        });

        if (!admin) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        if (!isPasswordValid) return null;

        // Gunakan as unknown as User untuk mengakali tipe bawaan NextAuth dengan aman
        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role.name,
        } as unknown as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cast user ke tipe CustomUser
        const customUser = user as unknown as CustomUser;
        token.id = customUser.id;
        token.email = customUser.email;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Cast session.user ke tipe CustomUser, bukan any
        const sessionUser = session.user as CustomUser;
        sessionUser.id = token.id as string;
        sessionUser.email = token.email as string;
        sessionUser.role = token.role as string;
      }
      return session;
    },
  },
};
