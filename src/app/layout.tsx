import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { signIn, auth } from "@/auth.config";

import UserButton from "@/components/UserButton";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS ChatGPT App",
  description: "ChatGPT brought to you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en">
        <body className="mx-2 md:mx-5">
          <header className="text-white font-bold bg-green-900 text-2xl mt-4 p-2 mb-3 rounded-b-lg shadow-gray-700 shadow-lg flex">
            <div className="flex flex-grow">
              <Link href="/">GPT Chat</Link>
              <Link href="/about" className="ml-5 font-light">
                About
              </Link>
            </div>
            <UserButton
              onSignIn={async () => {
                "use server";
                await signIn();
              }}
            />
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}