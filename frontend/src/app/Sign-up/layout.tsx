import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign-up"
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="min-w-full bg-gray-100" >
          {children}
        </main>
  );
}
