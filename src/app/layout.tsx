import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudais Khan — 3D Website Builder & FullStack MERN Developer",
  description:
    "Portfolio of Sudais Khan — 3D Website Builder, AI Driven DevOps and FullStack MERN Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${outfit.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="font-outfit min-h-full bg-[#121110] text-[#E8E4DC] selection:bg-[#FF5C1A]/20">
        {children}
      </body>
    </html>
  );
}
