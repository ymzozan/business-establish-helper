import { createHash } from "node:crypto";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// Deny credentials exposed by earlier setup and seed scripts.
const exposedPasswordDigests = new Set([
  "6c89746c3a12494c17f0f82cbbf68926f088626a8a89139968d0b7956c3d3461",
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
]);

function passwordVersion(hash: string) {
  return createHash("sha256").update(hash).digest("hex");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.KUYUMCU_AUTH_SECRET || process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (typeof credentials?.email !== "string" || typeof credentials.password !== "string"
            || Buffer.byteLength(credentials.password) > 72
            || exposedPasswordDigests.has(passwordVersion(credentials.password))) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch {
          // Database not available
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const id = user?.id ?? token.id;
      if (typeof id !== "string") return null;

      const current = await prisma.user.findUnique({
        where: { id },
        select: { password: true, role: true },
      });
      if (!current) return null;
      const version = passwordVersion(current.password);
      if (!user && token.passwordVersion !== version) return null;

      token.id = id;
      token.role = current.role;
      token.passwordVersion = version;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/giris",
  },
  session: {
    strategy: "jwt",
  },
});
