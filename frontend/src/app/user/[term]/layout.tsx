import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
    title: "User Profile"
  };

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-white min-h-full">
            {children}
        </div>
    );
}
