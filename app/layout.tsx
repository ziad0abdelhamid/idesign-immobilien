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
    "Discover your dream property with Idesign Immobilien. We offer a curated selection of premium real estate in Austria, including apartments, houses, and commercial spaces. Our expert team is dedicated to providing personalized service and expert guidance to help you find the perfect property that meets your needs and exceeds your expectations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-(--font-montserrat)">
        <RouteSkeleton duration={3000} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}