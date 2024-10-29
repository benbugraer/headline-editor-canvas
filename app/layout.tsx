import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headline Editor Canvas",
  description: "Welcome to Headline Editor Canvas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`h-screen bg-white ${jost.className}`}>
        <main className="flex h-full">{children}</main>
      </body>
    </html>
  );
}
