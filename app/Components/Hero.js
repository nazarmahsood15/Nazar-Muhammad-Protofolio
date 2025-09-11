"use client";

import Header from "./Header";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  ChevronDown, Sparkles, Github, Linkedin, Twitter, Mail,
  Play, Code, Camera, Mic
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔹 Static Data (memoized outside render)
const SKILLS = [
  { icon: <Code size={14} className="text-green-400" />, text: "Full-Stack Development" },
  { icon: <Camera size={14} className="text-green-400" />, text: "UI/UX Design" },
  { icon: <Mic size={14} className="text-green-400" />, text: "Content Creation" }
];

const SOCIALS = [
  { icon: <Github size={20} />, href: "https://github.com/nazarmahsood15", label: "GitHub" },
  { icon: <Linkedin size={20} />, href: "https://linkedin.com/Nazarmahsood15", label: "LinkedIn" },
  { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Mail size={20} />, href: "Nazarmahsood15@gmail.com", label: "Email" }
];

const STATS = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 36, suffix: "", label: "Happy Clients" },
  { value: 12, suffix: "K", label: "YouTube Subs" }
];

// 🔹 Counter component (requestAnimationFrame-based)
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 2000;
    const totalFrames = Math.round(duration / (1000 / 60));

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.round(value * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

export default function Hero() {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const nameRef = useRef(null);

  // 🔹 Typing effect
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const text = textElement.textContent;
    textElement.textContent = "";
    let i = 0;

    const animateTyping = () => {
      if (i < text.length) {
        textElement.textContent += text.charAt(i++);
        requestAnimationFrame(animateTyping);
      }
    };

    animateTyping();
  }, []);

  // 🔹 Scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => setScrollIndicatorVisible(window.scrollY <= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!nameRef.current) return;
      const offsetX = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 20;
      const offsetY = ((e.clientY - window.innerHeight / 2) / window.innerHeight) * -20;
      nameRef.current.style.transform = `perspective(1000px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🔹 Canvas animation (optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const sperms = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.8 + Math.random() * 1.2,
      angle: Math.random() * Math.PI * 2,
      length: 30 + Math.random() * 25,
      freq: 0.08 + Math.random() * 0.15,
      amplitude: 4 + Math.random() * 4,
      headSize: 5 + Math.random() * 2,
      tailWidth: 2,
      color: `hsl(${120 + Math.random() * 10}, 80%, 60%)`,
      tailSegments: 12 + Math.floor(Math.random() * 8),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      sperms.forEach((s) => {
        s.angle += (Math.random() - 0.5) * 0.05;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        // Wrap screen
        if (s.x < -50) s.x = canvas.width + 50;
        if (s.x > canvas.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        // Head
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.headSize * 1.2, s.headSize, 0, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = s.color;
        ctx.fill();

        // Nucleus
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.headSize * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${120 + Math.random() * 10}, 90%, 40%)`;
        ctx.fill();

        // Tail
        ctx.beginPath();
        let prevX = s.x, prevY = s.y;
        for (let i = 0; i < s.tailSegments; i++) {
          const segProgress = i / s.tailSegments;
          const segLength = s.length / s.tailSegments;
          const tailX = s.x - Math.cos(s.angle) * segLength * i;
          const tailY = s.y - Math.sin(s.angle) * segLength * i +
            Math.sin((now / 100 + i) * s.freq) * s.amplitude * segProgress;

          if (i === 0) ctx.moveTo(prevX, prevY);
          else ctx.quadraticCurveTo(prevX, prevY, (prevX + tailX) / 2, (prevY + tailY) / 2);

          prevX = tailX;
          prevY = tailY;
          ctx.lineWidth = s.tailWidth * (1 - segProgress * 0.8);
          ctx.strokeStyle = s.color;
          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 🔹 GSAP animations
  useEffect(() => {
    gsap.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 });
    gsap.fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
    gsap.fromTo(".hero-buttons", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
    gsap.fromTo(".hero-social", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen 
                        bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-100/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      <div className="absolute top-3/4 left-1/3 w-48 h-48 md:w-64 md:h-64 bg-sky-200/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>

      <Header />

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 mt-24 md:mt-32 flex flex-col items-center text-center z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-800/50 backdrop-blur-sm 
                     rounded-full border border-gray-700 animate-fadeIn hover:scale-105 transition-transform"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sparkles size={16} className={`text-green-400 ${isHovered ? "animate-spin" : ""}`} />
          <span className="text-sm">Available for new projects</span>
        </div>

        {/* Name */}
        <div ref={nameRef} className="relative">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-green-400 animate-pulse font-serif">Nazar Muhammad</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mt-4 h-12 overflow-hidden">
          <p ref={textRef} className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-300 font-mono drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
            Software Engineer & Content Creator
          </p>
        </div>

        {/* Buttons */}
        <div className="hero-buttons mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-green-500 rounded-xl text-base md:text-lg font-semibold 
                             shadow-[0_0_20px_rgba(34,197,94,0.8)] hover:shadow-[0_0_35px_rgba(34,197,94,1)] 
                             hover:bg-green-600 transition-all duration-300 overflow-hidden">
           <span
  onClick={() => {
    if (window.scrollToSection && window.sectionRefs?.projects) {
      window.scrollToSection(window.sectionRefs.projects);
    }
  }}
  className="relative z-10 flex items-center justify-center gap-2 cursor-pointer"
>
  <Play size={20} className="group-hover:animate-bounce" /> View My Work
</span>

            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

        <button
  onClick={() => {
    if (window.scrollToSection && window.sectionRefs?.contact) {
      window.scrollToSection(window.sectionRefs.contact);
    }
  }}
  className="group relative px-6 py-3 md:px-8 md:py-4 bg-transparent border border-green-500/50 rounded-xl text-base md:text-lg font-semibold 
             hover:border-green-400 hover:bg-green-500/10 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
>
  <Mail size={20} />
  Let's Talk
  <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>

        </div>

        {/* Skills */}
        <div className="hero-badges mt-8 md:mt-10 flex flex-wrap justify-center gap-3 max-w-2xl">
          {SKILLS.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
              {skill.icon}<span className="text-sm">{skill.text}</span>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="hero-social mt-8 md:mt-10 flex gap-4 md:gap-5">
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="group relative p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 
                         hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:rotate-3"
              aria-label={s.label}>
              {s.icon}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-800 px-2 py-1 rounded whitespace-nowrap transition-opacity">
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="hero-stats mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group p-2 md:p-0">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-xs md:text-sm mt-1 group-hover:text-green-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      {scrollIndicatorVisible && (
        <div className="absolute bottom-6 md:bottom-8 z-10 animate-bounce">
          <ChevronDown size={28} className="text-gray-400 md:size-8" />
        </div>
      )}
    </section>
  );
}
