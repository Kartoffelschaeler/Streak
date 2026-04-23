import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Streak",
  description: "A minimal daily streak counter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={oswald.className}>{children}</body>
    </html>
  );
}
