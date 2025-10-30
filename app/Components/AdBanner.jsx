"use client";


import { useEffect, useRef } from "react";

export default function AdBanner() {
  // We don't need the pushedRef if we only run the effect once

  useEffect(() => {
    // Check if the adsbygoogle array exists before trying to push
    if (window.adsbygoogle) {
      try {
        // Use a short delay to give the external script time to initialize
        setTimeout(() => {
          window.adsbygoogle.push({});
        }, 100);
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, []); // Empty dependency array ensures it runs only once

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }} // Added text-align center as a suggestion
      data-ad-client="ca-pub-6965971637321938"
      data-ad-slot="9959708544"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
