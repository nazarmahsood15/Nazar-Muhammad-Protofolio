"use client";
import { useState, useRef, useCallback, useMemo } from "react";
import { Code, Globe, Server, Database, Cpu, Award, MapPin, BookOpen, Briefcase, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";
import PhotoCard from "./PhotoCard";
import Image from "next/image";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Constants for better maintainability
const SKILLS = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "JavaScript", level: 93 },
    { name: "HTML/CSS", level: 98 },
    { name: "Tailwind CSS", level: 90 }
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 85 },
    { name: "MongoDB", level: 82 },
    { name: "REST APIs", level: 90 },
    { name: "Authentication", level: 85 }
  ],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 75 },
    { name: "Postman", level: 85 },
    { name: "Vercel/Netlify", level: 88 }
  ]
};

const STATS = [
  { value: 50, label: "Projects Completed", suffix: "+" },
  { value: 5, label: "Years Experience", suffix: "+" },
  { value: 36, label: "Happy Clients", suffix: "" },
  { value: 12, label: "YouTube Subs", suffix: "K" }
];

const TECH_STACK = [
  { name: "React", icon: "⚛️", color: "from-blue-400 to-cyan-400" },
  { name: "Next.js", icon: "▲", color: "from-gray-100 to-gray-400" },
  { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-400" },
  { name: "Express.js", icon: "🚀", color: "from-gray-300 to-gray-100" },
  { name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-400" },
  { name: "JavaScript", icon: "📜", color: "from-yellow-400 to-yellow-300" },
  { name: "HTML5", icon: "🌐", color: "from-orange-500 to-orange-400" },
  { name: "CSS3", icon: "🎨", color: "from-blue-500 to-blue-400" },
  { name: "Tailwind", icon: "💨", color: "from-cyan-400 to-teal-400" },
  { name: "Git", icon: "📦", color: "from-orange-600 to-orange-500" }
];

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const sectionRef = useRef(null);
  const animationRef = useRef({ triggers: [] });

  // Clean up GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current.triggers.length) {
        animationRef.current.triggers.forEach(trigger => {
          if (trigger && trigger.kill) trigger.kill();
        });
      }
    };
  }, []);

  // Single optimized useEffect for all animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate progress bars
      const progressBars = gsap.utils.toArray(".progress-bar");
      progressBars.forEach((bar) => {
        const trigger = ScrollTrigger.create({
          trigger: bar,
          start: "top 85%",
          toggleActions: "play none none reset",
          animation: gsap.fromTo(bar,
            { width: "0%" },
            {
              width: () => bar.dataset.width + "%",
              duration: 1.5,
              ease: "power2.out"
            }
          )
        });
        animationRef.current.triggers.push(trigger);
      });

      // Animate counters with improved performance
      const counters = gsap.utils.toArray(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        
        const trigger = ScrollTrigger.create({
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none reset",
          animation: gsap.fromTo(counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              onUpdate: function() {
                counter.textContent = Math.round(this.targets()[0].innerText) + suffix;
              }
            }
          )
        });
        animationRef.current.triggers.push(trigger);
      });

      // Fade in animation for elements
      const animateElements = gsap.utils.toArray(".animate-on-scroll");
      animateElements.forEach((el) => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reset",
          animation: gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          )
        });
        animationRef.current.triggers.push(trigger);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Memoized tab content to prevent unnecessary re-renders
  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "skills":
        return (
          <div>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Code className="text-green-400 mr-2" size={20} />
                Frontend Development
              </h4>
              {SKILLS.frontend.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Server className="text-green-400 mr-2" size={20} />
                Backend Development
              </h4>
              {SKILLS.backend.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Cpu className="text-green-400 mr-2" size={20} />
                Tools & Technologies
              </h4>
              {SKILLS.tools.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-6">
            <ExperienceItem 
              title="Self-Taught Developer"
              period="2019 - Present"
              description="Intensive self-study through documentation, online courses, and building real-world projects."
            />
            
            <ExperienceItem 
              title="Computer Science Fundamentals"
              period="Ongoing"
              description="Continuous learning of algorithms, data structures, and software architecture principles."
            />
            
            <ExperienceItem 
              title="Local Technical Education"
              period="South Waziristan"
              description="Early foundation in mathematics and problem-solving that paved the way for my development career."
            />
          </div>
        );
      
      case "experience":
        return (
          <div className="space-y-6">
            <ExperienceItem 
              title="Freelance Full-Stack Developer"
              period="2021 - Present"
              description="Developed web applications for clients using MERN stack, focusing on responsive design and clean code."
            />
            
            <ExperienceItem 
              title="Personal Projects"
              period="2020 - Present"
              description="Created multiple full-stack applications including e-commerce platforms, content management systems, and interactive web apps."
            />
            
            <ExperienceItem 
              title="Open Source Contributor"
              period="2022 - Present"
              description="Contributed to various open source projects, focusing on React components and Node.js utilities."
            />
          </div>
        );
      
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Particles as background */}
      <Particles count={40} className="absolute inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll">
          About <span className="text-green-400">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Personal Story */}
          <div className="animate-on-scroll">
            <div className="mb-8">
              <div className="flex justify-center items-center min-h-[60vh]">
                <HoverImage />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="text-green-400 mr-2" size={24} />
                My Journey from GamicaCloud Institute
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer originally from South Waziristan, a region known for its 
                rich cultural heritage and resilient people. My journey into technology began with curiosity 
                about how digital platforms work and evolved into a dedicated career path.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Growing up in a region with limited access to technology resources, I developed a strong 
                determination to overcome challenges and master software development through self-learning 
                and persistent practice.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, I specialize in building modern, responsive web applications using cutting-edge 
                technologies like React, Node.js, and MongoDB. I'm committed to creating solutions that 
                not only look great but also deliver exceptional user experiences.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
                  <div 
                    className="text-2xl font-bold text-green-400 counter" 
                    data-target={stat.value} 
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 animate-on-scroll">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Award className="text-green-400 mr-2" size={20} />
                My Philosophy
              </h4>
              <p className="text-gray-300 italic">
                "I believe that great code is not just about functionality, but about creating solutions 
                that are efficient, maintainable, and make a positive impact on people's lives."
              </p>
            </div>
          </div>
          
          {/* Skills & Expertise */}
          <div className="animate-on-scroll">
            <div className="flex border-b border-gray-700 mb-8">
              <TabButton 
                active={activeTab === "skills"} 
                onClick={() => setActiveTab("skills")}
                icon={<Code size={18} />}
                label="Skills"
              />
              <TabButton 
                active={activeTab === "education"} 
                onClick={() => setActiveTab("education")}
                icon={<BookOpen size={18} />}
                label="Education"
              />
              <TabButton 
                active={activeTab === "experience"} 
                onClick={() => setActiveTab("experience")}
                icon={<Briefcase size={18} />}
                label="Experience"
              />
            </div>
            
            {renderTabContent}
          </div>
        </div>
        
        {/* Tech Stack Icons */}
        <div className="mt-20 animate-on-scroll">
          <h3 className="text-2xl font-bold text-center mb-10">Tech Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {TECH_STACK.map((tech, index) => (
              <TechIcon key={index} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted components for better readability and performance

const SkillBar = ({ skill }) => (
  <div className="mb-4 group">
    <div className="flex justify-between mb-2">
      <span className="group-hover:text-green-300 transition-colors">{skill.name}</span>
      <span className="text-green-400">{skill.level}%</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full progress-bar" 
        data-width={skill.level}
        style={{ width: "0%" }}
      ></div>
    </div>
  </div>
);

const ExperienceItem = ({ title, period, description }) => (
  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-400 transition-colors group">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-green-400 group-hover:text-green-300 transition-colors">{title}</h4>
        <p className="text-sm text-gray-400">{period}</p>
        <p className="mt-2 text-gray-300 group-hover:text-gray-200 transition-colors">
          {description}
        </p>
      </div>
      <ChevronRight className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    className={`py-2 px-4 font-medium flex items-center ${active ? "text-green-400 border-b-2 border-green-400" : "text-gray-400"}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const TechIcon = ({ tech }) => (
  <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 group">
    <span className={`text-3xl mb-2 bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
      {tech.icon}
    </span>
    <span className="text-sm group-hover:text-green-300 transition-colors">{tech.name}</span>
  </div>
);

const HoverImage = () => (
  <div
    style={{
      display: "inline-block",
      borderRadius: "16px",
      border: "8px solid #06D6A0",
      boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
      transform: "translate(12px, 12px)",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      transition: "box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease",
      filter: "grayscale(40%) brightness(85%) contrast(110%)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = "none";
      e.currentTarget.style.transform = "translate(12px, 0) scale(1.05)";
      e.currentTarget.style.boxShadow = "0 25px 60px rgba(0,0,0,0.5)";
      e.currentTarget.style.borderColor = "#00FFA3";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = "grayscale(60%) brightness(85%) contrast(110%)";
      e.currentTarget.style.transform = "translate(12px, 12px) scale(1)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.35)";
      e.currentTarget.style.borderColor = "#06D6A0";
    }}
  >
    <Image
      src="/imag11.jpg"
      alt="My portrait"
      width={250}
      height={250}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.5s ease",
      }}
    />
  </div>
);