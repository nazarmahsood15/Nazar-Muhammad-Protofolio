import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* ✅ Google AdSense main script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6965971637321938"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-y-auto`}
      >
        <Header />
        <Particles />
        <MouseCursor />

        {/* ✅ AdSense ad block */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6965971637321938"
          data-ad-slot="9221341946"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        {/* ✅ Initialize ads after interactive */}
        <Script id="adsbygoogle-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>

        {/* ✅ Wrapped children */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
