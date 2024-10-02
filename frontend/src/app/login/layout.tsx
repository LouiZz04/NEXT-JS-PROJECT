import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginLayout({
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