import type { Metadata } from "next";
import "./globals.css";
import NavbarHero from "@/components/NavbarHero";
import Footer from "@/components/footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "IDesign Immobilien",
  description: "",
  icons: {
    icon: "./favicon.ico", // this will show in the tab
    shortcut: "./favicon.ico",
    apple: "./favicon.png", // for Apple devices
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" dir="ltr">
      <body>
            <NavbarHero />
            <main className="min-h-[61vh]">
              {children}
            </main>
            <BackToTop />
            <Footer />
      </body>
    </html>
  );
}
