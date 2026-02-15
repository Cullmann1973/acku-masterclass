import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACKU-AI Masterclass: Practical AI for Manufacturing & Supply Chain Leaders",
  description:
    "From AI Theater to Real Results. A practitioner's guide to building an AI program that actually works in regulated manufacturing and supply chain operations.",
  openGraph: {
    title: "ACKU-AI Masterclass",
    description: "Practical AI Strategy for Regulated Industries",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="bg-[#08080d] text-[#f0ebe4] overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
