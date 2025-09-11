"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Download, FileText, Briefcase, Calendar, MapPin, Award, BookOpen, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const [activeTab, setActiveTab] = useState("experience");
  const resumeRef = useRef(null);
  const titleRef = useRef(null);
  
  // Resume data
  const resumeData = {
    experience: [
      {
        id: 1,
        title: "Full-Stack Developer",
        company: "GamicaCloud",
        period: "2023 - Present",
        location: "Remote",
        description: "Developing cloud-based gaming solutions and scalable backend infrastructure.",
        achievements: [
          "Built RESTful APIs handling 10,000+ daily requests",
          "Implemented real-time multiplayer functionality",
          "Optimized database queries reducing response time by 40%"
        ]
      },
      {
        id: 2,
        title: "Freelance Web Developer",
        company: "Self-Employed",
        period: "2022 - 2023",
        location: "Remote",
        description: "Worked with various clients to develop web applications and e-commerce sites.",
        achievements: [
          "Delivered 15+ projects with 100% client satisfaction",
          "Developed responsive websites with modern UI/UX principles",
          "Integrated payment gateways and third-party APIs"
        ]
      },
      {
        id: 3,
        title: "Web Development Intern",
        company: "Tech Solutions Inc.",
        period: "2022 (6 months)",
        location: "Karachi, Pakistan",
        description: "Learned industry best practices and contributed to real-world projects.",
        achievements: [
          "Assisted in developing company&apos;s main product features",
          "Participated in code reviews and agile development process",
          "Fixed bugs and implemented new features in existing codebase"
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Self-Taught Developer",
        institution: "Online Courses & Documentation",
        period: "2019 - Present",
        description: "Intensive self-study through documentation, online courses, and building real-world projects.",
        courses: ["React Mastery", "Node.js Advanced Concepts", "Database Design", "System Architecture"]
      },
      {
        id: 2,
        degree: "Computer Science Fundamentals",
        institution: "Various Online Platforms",
        period: "Ongoing",
        description: "Continuous learning of algorithms, data structures, and software architecture principles.",
        courses: ["Data Structures", "Algorithms", "Software Design Patterns", "Computer Networks"]
      },
      {
        id: 3,
        degree: "Local Technical Education",
        institution: "South Waziristan",
        period: "2018 - 2019",
        description: "Early foundation in mathematics and problem-solving that paved the way for development career.",
        courses: ["Mathematics", "Problem Solving", "Basic Programming Concepts"]
      }
    ],
    skills: {
      technical: [
        { name: "React/Next.js", level: 95 },
        { name: "Node.js/Express", level: 90 },
        { name: "JavaScript/TypeScript", level: 93 },
        { name: "MongoDB/PostgreSQL", level: 85 },
        { name: "HTML/CSS/Tailwind", level: 98 },
        { name: "RESTful APIs", level: 92 }
      ],
      soft: [
        "Problem Solving",
        "Communication",
        "Team Collaboration",
        "Project Management",
        "Adaptability",
        "Creativity"
      ]
    },
    certifications: [
      {
        id: 1,
        name: "Advanced React & Next.js",
        issuer: "Udemy",
        date: "2023"
      },
      {
        id: 2,
        name: "Node.js Backend Development",
        issuer: "Coursera",
        date: "2022"
      },
      {
        id: 3,
        name: "MongoDB Database Design",
        issuer: "MongoDB University",
        date: "2022"
      },
      {
        id: 4,
        name: "AWS Cloud Essentials",
        issuer: "Amazon Web Services",
        date: "2023"
      }
    ]
  };

  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate resume sections
    const resumeItems = resumeRef.current?.querySelectorAll(".resume-item");
    if (resumeItems) {
      resumeItems.forEach((item, index) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
            delay: index * 0.2,
            ease: "power3.out"
          }
        );
      });
    }

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeTab]);

  return (
    <section id="resume" className="py-20 bg-white dark:bg-black text-black dark:text-white">
      <Particles count={40} className="absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-4">
          My <span className="text-green-500 dark:text-green-400">Resume</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Here&apos;s a summary of my experience, education, and skills. Download my full CV for more details.
        </p>

        {/* Download Button */}
        <div className="text-center mb-16">
          <button
            onClick={downloadCV}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 dark:bg-green-600 text-white rounded-lg font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-colors group"
          >
            <Download size={20} />
            Download CV
            <FileText size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Resume Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "experience", label: "Experience", icon: Briefcase },
            { id: "education", label: "Education", icon: BookOpen },
            { id: "skills", label: "Skills", icon: Award },
            { id: "certifications", label: "Certifications", icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-green-500 dark:bg-green-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resume Content */}
        <div ref={resumeRef} className="max-w-4xl mx-auto">
          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              {resumeData.experience.map((item) => (
                <div key={item.id} className="resume-item bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 dark:border-green-400">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-green-500 dark:text-green-400 font-medium">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      <Calendar size={16} />
                      <span>{item.period}</span>
                      <MapPin size={16} className="ml-2" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {resumeData.education.map((item) => (
                <div key={item.id} className="resume-item bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500 dark:border-blue-400">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.degree}</h3>
                      <p className="text-blue-500 dark:text-blue-400 font-medium">{item.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      <Calendar size={16} />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div className="resume-item bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-center">Technical Skills</h3>
                <div className="space-y-6">
                  {resumeData.skills.technical.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-green-500 dark:text-green-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="resume-item bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-center">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {resumeData.skills.soft.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <div className="grid md:grid-cols-2 gap-6">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="resume-item bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500 dark:bg-green-600 rounded-full">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cert.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 mt-2">
                        <Calendar size={14} />
                        <span className="text-sm">Issued {cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Interested in working together?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 dark:bg-green-600 rounded-lg text-white font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
          >
            <Send size={18} />
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}