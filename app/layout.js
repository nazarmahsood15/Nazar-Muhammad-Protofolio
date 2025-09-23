import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Particles from "./Components/Particles";
import MouseCursor from "./Components/MouseCursorParticles";
import ClientWrapper from "./Components/ClientWrapper"; // loader wrapper

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
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-y-auto`}
      >
        <Header />

        {/* Original particles */}
        <Particles />

        {/* Custom mouse cursor particles */}
        <MouseCursor />

        {/* Wrap children with loader */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
