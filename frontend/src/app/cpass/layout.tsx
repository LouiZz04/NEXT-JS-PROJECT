import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Change Password"
};

export default function CpassLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body className="bg-gray-100">
        <main className="max-w-4xl" >
          {children}
        </main>
      </body>
  );
}