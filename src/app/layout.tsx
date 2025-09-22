import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IM_Fell_DW_Pica, Lato } from "next/font/google";
import "./globals.css";

const headingFont = IM_Fell_DW_Pica({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "WDD430 - Handcrafted Haven Project",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headingFont.variable} ${bodyFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
