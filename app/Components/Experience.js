"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Briefcase, Calendar, ExternalLink, Award, Code, Building, Folder, Database, Settings } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Constants for better maintainability
const EXPERIENCES = {
  gamicacloud: {
    company: "GamicaCloud",
    position: "Full-Stack Developer",
    period: "2023 - Present",
    description: "Developing cloud-based gaming solutions and scalable backend infrastructure for gaming platforms.",
    achievements: [
      "Built RESTful APIs handling 10,000+ requests daily",
      "Implemented real-time multiplayer functionality using WebSockets",
      "Optimized database queries reducing response time by 40%",
      "Developed admin dashboard with analytics and user management"
    ],
    technologies: ["Node.js", "React", "MongoDB", "AWS", "Socket.io", "Docker"],
    link: "#"
  },
  freelance: {
    company: "Freelance Projects",
    position: "Full-Stack Developer",
    period: "2022 - 2023",
    description: "Worked with various clients to develop web applications, e-commerce sites, and custom solutions.",
    achievements: [
      "Delivered 15+ projects with 100% client satisfaction",
      "Developed responsive websites with modern UI/UX principles",
      "Integrated payment gateways and third-party APIs",
      "Provided ongoing maintenance and support for clients"
    ],
    technologies: ["React", "Next.js", "Express", "Firebase", "Stripe", "Tailwind CSS"],
    link: "#"
  },
  internship: {
    company: "Tech Solutions Inc.",
    position: "Web Development Intern",
    period: "2022 (6 months)",
    description: "Learned industry best practices and contributed to real-world projects under senior developers.",
    achievements: [
      "Assisted in developing company's main product features",
      "Participated in code reviews and agile development process",
      "Fixed bugs and implemented new features in existing codebase",
      "Gained experience with version control and team collaboration"
    ],
    technologies: ["JavaScript", "HTML/CSS", "React", "Git", "REST APIs"],
    link: "#"
  }
};

const SKILLS = {
  frontend: ["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Redux"],
  backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "Socket.io"],
  tools: ["Git", "Docker", "AWS", "Firebase", "Figma", "Webpack"]
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState("gamicacloud");
  const experienceRef = useRef(null);
  const titleRef = useRef(null);
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
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate timeline items using GSAP context for better performance
    const ctx = gsap.context(() => {
      const timelineItems = gsap.utils.toArray(".timeline-item");
      
      timelineItems.forEach((item, index) => {
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reset",
          animation: gsap.fromTo(item, 
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out"
            }
          )
        });
        animationRef.current.triggers.push(trigger);
      });
    }, experienceRef);

    return () => ctx.revert();
  }, []);

  // Memoize the active experience to prevent unnecessary re-renders
  const activeExperience = useMemo(() => EXPERIENCES[activeTab], [activeTab]);

  // Memoize tab buttons to prevent unnecessary re-renders
  const tabButtons = useMemo(() => (
    Object.keys(EXPERIENCES).map((key) => (
      <TabButton
        key={key}
        id={key}
        activeTab={activeTab}
        onClick={() => setActiveTab(key)}
      />
    ))
  ), [activeTab]);

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <Particles count={40} className="absolute inset-0 z-0" />
        
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-4">
          My <span className="text-green-400">Experience</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          {`Over 2 years of hands-on experience in web development, working with various technologies and delivering successful projects.`}
        </p>

        {/* Experience Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabButtons}
        </div>

        {/* Experience Details */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-16">
          <ExperienceDetails experience={activeExperience} />
        </div>

        {/* Timeline */}
        <div ref={experienceRef} className="relative">
          <h3 className="text-2xl font-bold text-center mb-12">Career Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-green-500/30 -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              <TimelineItem 
                experience={EXPERIENCES.gamicacloud}
                date="2023 - Present"
                position="Full-Stack Developer"
                company="GamicaCloud"
                isRight={false}
              />
              
              <TimelineItem 
                experience={EXPERIENCES.freelance}
                date="2022 - 2023"
                position="Freelance Developer"
                company="Various Clients"
                isRight={true}
              />
              
              <TimelineItem 
                experience={EXPERIENCES.internship}
                date="2022 (6 months)"
                position="Web Development Intern"
                company="Tech Solutions Inc."
                isRight={false}
              />
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <SkillsSummary />
      </div>
    </section>
  );
}

// Extracted components for better performance and readability

const TabButton = ({ id, activeTab, onClick }) => {
  const getIcon = () => {
    switch(id) {
      case "gamicacloud": return <Building size={18} />;
      case "freelance": return <Folder size={18} />;
      case "internship": return <Award size={18} />;
      default: return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
        activeTab === id
          ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {getIcon()}
      <span className="capitalize">
        {id === "gamicacloud" ? "GamicaCloud" : id}
      </span>
    </button>
  );
};

const ExperienceDetails = ({ experience }) => (
  <div className="grid md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-2xl font-bold mb-2">{experience.company}</h3>
      <div className="flex items-center gap-2 text-gray-400 mb-4">
        <Briefcase size={18} />
        <span>{experience.position}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400 mb-6">
        <Calendar size={18} />
        <span>{experience.period}</span>
      </div>
      <p className="text-gray-300 mb-6">{experience.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {experience.technologies.map((tech, index) => (
          <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      
      <a
        href={experience.link}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink size={16} />
        View Projects
      </a>
    </div>
    
    <div>
      <h4 className="text-xl font-semibold mb-4 text-green-400">Key Achievements</h4>
      <ul className="space-y-3">
        {experience.achievements.map((achievement, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TimelineItem = ({ experience, date, position, company, isRight }) => (
  <div className="timeline-item relative flex flex-col md:flex-row items-start gap-6">
    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-green-500 rounded-full -translate-x-1/2 z-10"></div>
    
    {isRight ? (
      <>
        <div className="md:w-1/2 md:pr-12 md:text-right md:ml-auto order-2 md:order-1">
          <p className="text-gray-300">
            {experience.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-end">
            {experience.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
          <span className="text-sm text-green-400 font-medium">{date}</span>
          <h4 className="text-xl font-bold mt-1">{position}</h4>
          <p className="text-green-400">{company}</p>
        </div>
      </>
    ) : (
      <>
        <div className="md:w-1/2 md:pr-12 md:text-right md:ml-auto">
          <span className="text-sm text-green-400 font-medium">{date}</span>
          <h4 className="text-xl font-bold mt-1">{position}</h4>
          <p className="text-green-400">{company}</p>
        </div>
        <div className="md:w-1/2 md:pl-12">
          <p className="text-gray-300">
            {experience.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {experience.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);

const SkillsSummary = () => (
  <div className="mt-20">
    <h3 className="text-2xl font-bold text-center mb-12">Skills Summary</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <SkillCategory 
        icon={<Code className="text-green-400" size={24} />}
        title="Frontend"
        skills={SKILLS.frontend}
      />
      
      <SkillCategory 
        icon={<Database className="text-green-400" size={24} />}
        title="Backend"
        skills={SKILLS.backend}
      />
      
      <SkillCategory 
        icon={<Settings className="text-green-400" size={24} />}
        title="Tools & Others"
        skills={SKILLS.tools}
      />
    </div>
  </div>
);

const SkillCategory = ({ icon, title, skills }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h4 className="text-xl font-semibold">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
          {skill}
        </span>
      ))}
    </div>
  </div>
);