import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";


const fraunces = Fraunces({ subsets: ["latin"], weight: ["300","400","500"], style: ["normal","italic"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "Hearth — Home Panel",
  description: "Wall-mounted home automation hub",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-sans antialiased`}>
        <div className="ambient" />
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}