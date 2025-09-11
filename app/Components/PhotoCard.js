"use client";

import React from "react";
import Image from "next/image";

export default function PhotoCard({
  src = "/imag.jpeg",
  alt = "Profile photo",
  size = 320,
  color = "#06D6A0",
}) {
  return (
    <div
      className="relative"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Offset frame */}
      <div
        className="absolute rounded-lg"
        style={{
          inset: 0,
          transform: "translate(12px, 12px)",
          borderRadius: "12px",
          border: `4px solid ${color}`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.35)`,
          zIndex: 0,
        }}
      />

      {/* Image container */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{ inset: 0, zIndex: 10 }}
      >
        <Image
          src={src}          // Must start with "/" for public folder
          alt={alt}
          fill               // Responsive image inside parent
          className="object-cover"
          priority           // Optional: for faster LCP
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: color,
            mixBlendMode: "multiply",
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}
