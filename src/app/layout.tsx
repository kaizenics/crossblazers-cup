import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AnimatedLayout from "@/components/animated-layout";
import { Toaster } from "sonner";
import { ReactLenis } from 'lenis/react'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({
  weight: ["100", "400", "500", "600", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raceSport = localFont({
  src: "./fonts/RaceSport.ttf",
  variable: "--font-race-sport",
});

export const metadata: Metadata = {
  title: {
    default: "Cross Blazers Cup",
    template: "%s | Cross Blazers Cup",
  },
  description:
    "Join us for an unforgettable experience filled with excitement, sportsmanship, and community pride!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.3,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  }

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${raceSport.variable} antialiased`}
      >
        <AnimatedLayout>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ReactLenis root options={lenisOptions}>
              {children}
            </ReactLenis>
          </ThemeProvider>
        </AnimatedLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
