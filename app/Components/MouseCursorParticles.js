"use client";

import { useEffect, useRef, useState } from "react";

const UltraProCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/tablet
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable custom cursor on mobile

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trailContainer = trailContainerRef.current;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const lerp = (start, end, amt) => start + (end - start) * amt;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create particle trail
      const particle = document.createElement("div");
      particle.className = "cursor-trail";
      particle.style.left = `${mouseX}px`;
      particle.style.top = `${mouseY}px`;
      trailContainer.appendChild(particle);

      setTimeout(() => particle.remove(), 500);
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.45);
      ringY = lerp(ringY, mouseY, 0.45);

      if (dot)
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (ring)
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isMobile]);

  if (isMobile) return null; // Hide on mobile

  return (
    <>
      <div ref={trailContainerRef} className="cursor-trail-container" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default UltraProCursor;
