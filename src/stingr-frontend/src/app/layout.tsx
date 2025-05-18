import type { Metadata } from "next";
import { Montserrat, Raleway, Righteous } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stingr",
  description: "Discover and connect with tattoo artists effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${raleway.variable} ${righteous.variable} bg-background text-foreground font-body`}
    >
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
