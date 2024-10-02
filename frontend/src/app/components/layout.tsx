import "../globals.css";
import React, { ReactNode, ReactElement } from "react";

export default function ComponentLayout({
  children,

}: Readonly< { children: ReactNode }>) {
  return (
      <div className="bg-black">
        {children}
      </div>
  );
}
