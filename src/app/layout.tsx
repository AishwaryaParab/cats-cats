import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/layout-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cats Cats Everywhere 🐾 | Explore Cat Breeds & More",
  description:
    "Discover cat breeds, view adorable images, save favourites and compare cat breeds — all powered by The Cat API. Explore the world of cats like never before!",
  keywords: [
    "cats",
    "cat breeds",
    "cute cats",
    "cat images",
    "favourite cats",
    "The Cat API",
    "cat facts",
    "pet lovers",
    "adopt a cat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
