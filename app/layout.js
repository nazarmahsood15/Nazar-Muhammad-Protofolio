import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Particles from "./Components/Particles";
import Header from "./Components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nazar Muhammad",
  description: "Portfolio of Nazar Muhammad – Software Engineer & Developer",
  icons: {
    icon: "/favicon.ico", // Make sure this file exists in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-y-auto`}
      >
        {/* Header always visible */}
        <Header />

        {/* Particle Background */}
        <Particles />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
