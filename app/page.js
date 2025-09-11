"use client";

import { useEffect, useRef } from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import Testimonials from "./Components/Testimonials";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import gsap from "gsap";
import SpermAnimation from "./Components/SpermAnimation"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Components/Particles";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const testimonialsRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);
  const spermRef = useRef (null);




  // Function to scroll to a specific section
  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Expose the scroll function globally so Header can access it
  useEffect(() => {
    window.scrollToSection = scrollToSection;
    window.sectionRefs = {
      about: aboutRef,
      projects: projectsRef,
      experience: experienceRef,
      testimonials: testimonialsRef,
      resume: resumeRef,
      contact: contactRef
    };
    return () => {
      delete window.scrollToSection;
      delete window.sectionRefs;
    };
  }, []);

  // GSAP animations for sections
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
            toggleActions: "play none none reset"
          }
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
            toggleActions: "play none none reset"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative bg-black text-white" ref={mainRef}>
      {/* Particle Background */}
      <div
        id="particles-js"
        className="absolute inset-0 -z-10"
        style={{ width: "100%", height: "100%" }}
      ></div>

      <Hero />
      <section ref={aboutRef}><About /></section>
      <section ref={projectsRef}><Projects /></section>
      <section ref={experienceRef}><Experience /></section>
      <section ref={testimonialsRef}><Testimonials /></section>
      <section ref={resumeRef}><Resume /></section>
      <section ref={contactRef}><Contact /></section>
           {/* <section ref={projectsRef}><ProjectsSnapScroll /></section> */}


            
    </main>
  );
}
