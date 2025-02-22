import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SessionProvider } from "@/components/SessionProvider";
import UserButton from "@/components/UserButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS ChatGPT Clone",
  description: "A chatbot clone using NextJS, Shadcn, Lucid, and Vercel AI SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center py-4 px-4 gap-4 justify-between text-amber font-bold bg-emerald-400 text-2xl p-2 mb-3 rounded-b-lg shadow-gray-700 shadow-lg">
          <div>
            <UserButton />
          </div>
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mx-[100px] my-[50px]">{children}</div>
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
