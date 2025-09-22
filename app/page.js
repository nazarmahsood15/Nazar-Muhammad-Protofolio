"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Particles from "./Components/Particles";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import Testimonials from "./Components/Testimonials";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const testimonialsRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollToSection = scrollToSection;
    window.sectionRefs = {
      about: aboutRef,
      projects: projectsRef,
      experience: experienceRef,
      testimonials: testimonialsRef,
      resume: resumeRef,
      contact: contactRef,
    };
    return () => {
      delete window.scrollToSection;
      delete window.sectionRefs;
    };
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    const sections = mainRef.current.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    const headings = mainRef.current.querySelectorAll("h2, h3");
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
     
      <main
        className="relative bg-black text-white pt-24" // padding to avoid header overlap
        ref={mainRef}
      >
        <Particles />
        <Hero />
        <section ref={aboutRef}><About /></section>
        <section ref={projectsRef}><Projects /></section>
        <section ref={experienceRef}><Experience /></section>
        <section ref={testimonialsRef}><Testimonials /></section>
        <section ref={resumeRef}><Resume /></section>
        <section ref={contactRef}><Contact /></section>
      </main>
    </>
  );
}
