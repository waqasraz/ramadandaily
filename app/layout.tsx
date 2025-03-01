import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Amiri } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Ramadan Daily Giving - Support Those in Need",
  description: "Make daily donations during Ramadan 2025 to support those in need. Set up a recurring donation that runs only during the blessed month.",
  keywords: ["Ramadan", "charity", "donation", "daily giving", "sadaqah", "zakat"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
