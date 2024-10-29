import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import clsx from "clsx";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headline Editor Canvas",
  description: "Welcome to Headline Editor Canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("antialiased bg-secondary", jost.className)}>
        {children}
      </body>
    </html>
  );
}
