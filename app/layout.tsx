import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import authOptions from "@/auth";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTMS | Theme Creator",
  description:
    "Starter kit that has step by step easy to follow instructions to help you configure your next project with authentication and a database ready to go!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {/* <FirebaseAuthProvider> */}
          {/* <Header /> */}
          {children}
          {/* </FirebaseAuthProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
