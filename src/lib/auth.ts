// src/lib/auth.ts

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          // Validasi input
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Cari user berdasarkan email
          const admin = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },

            include: {
              role: true,
            },
          });

          // Jika user tidak ditemukan
          if (!admin) {
            return null;
          }

          // Validasi password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password,
          );

          if (!isPasswordValid) {
            return null;
          }

          // Return data user untuk disimpan ke JWT
          return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role.name,
          };
        } catch (error) {
          console.error("AUTH_ERROR:", error);
          return null;
        }
      },
    }),
  ],

  // Gunakan JWT session
  session: {
    strategy: "jwt",
  },

  // Custom halaman login
  pages: {
    signIn: "/auth/sign-in",
  },

  callbacks: {
    // Simpan data ke JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
      }

      return token;
    },

    // Kirim data token ke session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  // Secret NextAuth
  secret: process.env.NEXTAUTH_SECRET,
};
