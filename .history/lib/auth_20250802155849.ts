import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import { sendMagicLinkEmail } from "./email"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url }) {
        await sendMagicLinkEmail(email, url)
        return true
      },
    }),
  ],

  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Update user's status to online
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isOnline: true,
            lastSeenAt: new Date(),
          },
        })
      }
      return session
    },
    async signIn() {
      return true
    },
  },

  events: {
    async signOut({ token }) {
      if (token?.sub) {
        await prisma.user.update({
          where: { id: token.sub },
          data: { isOnline: false },
        })
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
}
