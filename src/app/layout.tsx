import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="text-amber font-bold bg-emerald-400 text-2xl p-2 mb-3 rounded-b-lg shadow-gray-700 shadow-lg">
          <div className="my-4 mx-4 flex gap-4 justify-end">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
