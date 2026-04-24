import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./ClientLayout";
import RouteSkeleton from "@/components/ui/RouteSkeleton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-montserrat",
});
export const metadata: Metadata = {
  title: "Idesign Immobilien - Premium Real Estate in Austria",
  description:
    "Wir machen Ihre Immobilie erlebbar. Mit professionellen Foto, Drohnenaufnahmen, Home Staging uvm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-(--font-montserrat)">
        <RouteSkeleton
          duration={500} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}