import NextAuth, { type NextAuthConfig } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === "JediDevYury";
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
