import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import clsx from "clsx";
import TopBar from "@/components/TopBar/TopBar";
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
      <body className={clsx("antialiased ", jost.className)}>
        <div className="grid min-h-screen w-full lg:grid-cols-[10.938rem_1fr]">
          <Sidebar />
          <TopBar>
            <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
          </TopBar>
        </div>
      </body>
    </html>
  );
}
