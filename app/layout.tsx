import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import TopBar from "@/components/TopBar/TopBar";
import clsx from "clsx";
import Sidebar from "@/components/Sidebar/Sidebar";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headline Editor Canvas",
  description: "Welcome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx("antialiased bg-primary text-primary", jost.className)}
      >
        <TopBar />
        <Sidebar />
        <div className="mx-auto px-6 pb-24 pt-16 md:px-6 md:pb-44 md:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
