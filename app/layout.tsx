import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headline Canvas Editor",
  description: "Welcome to CanvasBel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("antialiased w-full", raleway.className)}>
        <div>{children}</div>
      </body>
    </html>
  );
}
