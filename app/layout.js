import { Geist, Geist_Mono } from "next/font/google";
// *** Removed: import Script from "next/script"; ***
import "./globals.css";
import Header from "./Components/Header";
import Particles from "./Components/Particles";
import MouseCursor from "./Components/MouseCursorParticles";
import ClientWrapper from "./Components/ClientWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Nazar Muhammad",
  description: "Portfolio of Nazar Muhammad – Software Engineer & Developer",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  // Use a standard <script> tag via JSX to bypass the Next.js Script component
  // Next.js will render this as part of the initial HTML payload.
  const adSenseScript = (
    <script
      id="adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6965971637321938"
      crossOrigin="anonymous"
    ></script>
  );

  return (
    <html lang="en">
      <head>{/* The standard <script> tag should ideally be in the <head> */ adSenseScript}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-y-auto`}
      >
        <Header />
        <Particles />
        <MouseCursor />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
