"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Linkedin, Github, Twitter, Instagram, 
  X, ChevronRight, Sparkles, Globe, Calendar, Zap, Clock, TrendingUp, Users
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./Particles";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const successRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    // Enhanced title animation with 3D perspective
    gsap.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 100, 
        rotationX: -45,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        scale: 1,
        duration: 1.8, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reset"
        }
      }
    );

    // Enhanced 3D card effect for the form
    if (formRef.current) {
      const formCard = formRef.current;
      
      const handleMouseMove = (e) => {
        const rect = formCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        
        gsap.to(formCard, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1200,
          ease: "power2.out",
          duration: 0.3
        });

        // Parallax effect for form elements
        const formElements = formCard.querySelectorAll('.form-element');
        formElements.forEach((element, index) => {
          gsap.to(element, {
            x: rotateY * (index + 1) * 0.5,
            y: rotateX * (index + 1) * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(formCard, {
          rotationY: 0,
          rotationX: 0,
          ease: "power3.out",
          duration: 1.2
        });

        const formElements = formCard.querySelectorAll('.form-element');
        formElements.forEach((element) => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
          });
        });
      };
      
      formCard.addEventListener("mousemove", handleMouseMove);
      formCard.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        formCard.removeEventListener("mousemove", handleMouseMove);
        formCard.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Staggered animation for contact items
    const contactItems = contactRef.current?.querySelectorAll(".contact-item");
    if (contactItems) {
      gsap.fromTo(contactItems, 
        { 
          opacity: 0, 
          y: 60, 
          rotationY: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          ease: "back.out(1.4)"
        }
      );
    }

    // Enhanced floating animation for social icons
    const socialIcons = contactRef.current?.querySelectorAll(".social-icon");
    if (socialIcons) {
      socialIcons.forEach((icon, index) => {
        // Initial animation
        gsap.fromTo(icon, 
          { opacity: 0, scale: 0, rotation: -180 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(2)"
          }
        );

        // Continuous floating
        gsap.to(icon, {
          y: -8,
          rotation: 5,
          duration: 2 + (index * 0.3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }

    // Stats counter animation
    const statElements = contactRef.current?.querySelectorAll(".stat-value");
    if (statElements) {
      statElements.forEach((stat, index) => {
        gsap.fromTo(stat,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reset"
            }
          }
        );
      });
    }
  }, []);

  // Enhanced confetti effect
  const createConfetti = () => {
    if (!formRef.current) return;
    
    setShowConfetti(true);
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(confettiContainer);

    const colors = ["#10B981", "#22C55E", "#84CC16", "#FBBF24", "#F59E0B", "#EF4444", "#8B5CF6"];
    const shapes = ["circle", "square", "triangle"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.className = `absolute w-3 h-3 ${shape === 'circle' ? 'rounded-full' : shape === 'triangle' ? 'triangle' : ''}`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-10px`;
      
      if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = `6px solid transparent`;
        confetti.style.borderRight = `6px solid transparent`;
        confetti.style.borderBottom = `10px solid ${color}`;
      }
      
      confettiContainer.appendChild(confetti);
      
      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: Math.random() * 2 + 2,
        ease: "power2.out",
        onComplete: () => confetti.remove()
      });
    }

    // Cleanup confetti container
    setTimeout(() => {
      confettiContainer.remove();
      setShowConfetti(false);
    }, 4000);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
    
    // Animate field focus
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      gsap.to(field.parentElement, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleBlur = (fieldName) => {
    setActiveField(null);
    
    // Animate field blur
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      gsap.to(field.parentElement, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake form on validation error
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.out"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Create enhanced confetti effect
      createConfetti();
      
      // Animate success message
      if (successRef.current) {
        gsap.fromTo(successRef.current,
          { opacity: 0, scale: 0.8, y: 20 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            duration: 0.8,
            ease: "back.out(2)"
          }
        );
      }
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "hello@nazarkhan.dev",
      link: "mailto:hello@nazarkhan.dev",
      color: "from-red-500 to-pink-500",
      description: "Drop me a line anytime"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+92 123 456 7890",
      link: "tel:+921234567890",
      color: "from-green-500 to-emerald-500",
      description: "Available during business hours"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "South Waziristan, Pakistan",
      link: "https://maps.google.com/?q=South+Waziristan",
      color: "from-blue-500 to-cyan-500",
      description: "Remote work worldwide"
    },
    {
      icon: <Globe size={24} />,
      title: "Timezone",
      content: "PST (UTC+5)",
      link: "#",
      color: "from-purple-500 to-indigo-500",
      description: "Pakistan Standard Time"
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: "GitHub",
      url: "https://github.com",
      color: "hover:bg-gray-800 dark:hover:bg-gray-700",
      followers: "1.2K"
    },
    {
      icon: <Linkedin size={20} />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "hover:bg-blue-600",
      followers: "2.5K"
    },
    {
      icon: <Twitter size={20} />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:bg-blue-400",
      followers: "890"
    },
    {
      icon: <Instagram size={20} />,
      name: "Instagram",
      url: "https://instagram.com",
      color: "hover:bg-pink-600",
      followers: "1.8K"
    }
  ];

  const stats = [
    { 
      value: "< 24h", 
      label: "Avg. Response Time", 
      icon: <Clock size={18} />,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      value: "100%", 
      label: "Response Rate", 
      icon: <TrendingUp size={18} />,
      color: "from-green-500 to-emerald-500"
    },
    { 
      value: "1-2", 
      label: "Business Days", 
      icon: <Calendar size={18} />,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white overflow-hidden relative"
    >
                       <Particles count={40} className="absolute inset-0 z-0" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="text-green-600 dark:text-green-400 animate-pulse" size={20} />
            <span className="ml-2 text-sm font-semibold text-green-600 dark:text-green-400">Let's Connect & Create</span>
          </div>
          
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6 transform-gpu">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 animate-gradient">
              Touch
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Have a project in mind or want to discuss potential opportunities? 
            I'm always excited to collaborate on innovative ideas and bring visions to life.
          </p>
          
          {/* Enhanced Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-value group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
                <div className="relative flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={contactRef} className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <div className="contact-item">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Let's create something amazing together!
              </p>
            </div>

            {/* Enhanced Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="contact-item group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500 rounded-2xl"></div>
                  <a
                    href={item.link}
                    target={item.title === "Location" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="relative flex items-start gap-5 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className={`p-4 rounded-2xl text-white bg-gradient-to-br ${item.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-medium mb-1">
                        {item.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight 
                      size={20} 
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-500 transform group-hover:translate-x-1" 
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div className="contact-item">
              <h4 className="font-bold text-xl mb-6">Follow My Journey</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon group flex items-center gap-3 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md ${social.color} text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50`}
                    aria-label={social.name}
                  >
                    <div className="transform group-hover:rotate-12 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{social.name}</div>
                      <div className="text-xs opacity-75">{social.followers} followers</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div 
            ref={formRef}
            className="contact-item relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Enhanced 3D effect elements */}
            <div className="absolute -z-10 -inset-3 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 opacity-20 blur-2xl rounded-3xl"></div>
            
            <div className="relative" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white">
                  <Send size={24} />
                </div>
                <h3 className="text-3xl font-bold">Send Me a Message</h3>
              </div>
              
              {isSubmitted ? (
                <div 
                  ref={successRef}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-8 rounded-2xl mb-6 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-bold text-xl mb-2">Message Sent Successfully! 🎉</p>
                    <p className="text-lg">Thank you for reaching out! I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="form-element relative">
                      <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                        Your Name *
                      </label>
                      <div className={`relative transition-all duration-300 ${activeField === 'name' ? 'transform -translate-y-1' : ''}`}>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl opacity-0 ${activeField === 'name' ? 'opacity-30' : ''} transition-opacity blur-sm`}></div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={() => handleBlur('name')}
                          className={`relative w-full px-5 py-4 bg-white dark:bg-gray-700 border-2 ${formErrors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg`}
                          placeholder="Enter your full name"
                          aria-describedby={formErrors.name ? "name-error" : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <X size={14} />
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="form-element relative">
                      <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <div className={`relative transition-all duration-300 ${activeField === 'email' ? 'transform -translate-y-1' : ''}`}>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl opacity-0 ${activeField === 'email' ? 'opacity-30' : ''} transition-opacity blur-sm`}></div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={() => handleBlur('email')}
                          className={`relative w-full px-5 py-4 bg-white dark:bg-gray-700 border-2 ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg`}
                          placeholder="your.email@example.com"
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <X size={14} />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Subject Field */}
                  <div className="form-element relative">
                    <label htmlFor="subject" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'transform -translate-y-1' : ''}`}>
                      <div className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl opacity-0 ${activeField === 'subject' ? 'opacity-30' : ''} transition-opacity blur-sm`}></div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={() => handleBlur('subject')}
                        className={`relative w-full px-5 py-4 bg-white dark:bg-gray-700 border-2 ${formErrors.subject ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg`}
                        placeholder="What's this about?"
                        aria-describedby={formErrors.subject ? "subject-error" : undefined}
                      />
                      {formErrors.subject && (
                
                        <p id="subject-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <X size={14} />
                          {formErrors.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="form-element relative">
                    <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                      Your Message *
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'transform -translate-y-1' : ''}`}>
                      <div className={`absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl opacity-0 ${activeField === 'message' ? 'opacity-30' : ''} transition-opacity blur-sm`}></div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                        rows={6}
                        className={`relative w-full px-5 py-4 bg-white dark:bg-gray-700 border-2 ${formErrors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg resize-none`}
                        placeholder="Tell me about your project, ideas, or how we can work together..."
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                      ></textarea>
                      {formErrors.message && (
                        <p id="message-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <X size={14} />
                          {formErrors.message}
                        </p>
                      )}
                      <div className="text-right mt-2">
                        <span className={`text-sm ${formData.message.length < 10 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="form-element w-full relative overflow-hidden bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-green-600 hover:via-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
                    
                    <span className="relative z-10 flex items-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} className="transform group-hover:translate-x-1 transition-transform" />
                          <span>Send Message</span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity"></div>
                        </>
                      )}
                    </span>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-30 transform scale-0 group-active:scale-100 transition-all duration-300 rounded-full"></div>
                    </div>
                  </button>

                  {/* Form Footer */}
                  <div className="form-element text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      By sending this message, you agree to our privacy policy
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Usually responds within 24h
                      </span>
                      <span>•</span>
                      <span>Secure & Encrypted</span>
                    </div>
                  </div>
                </form>
              )}
              
              {/* Alternative Contact Methods */}
              <div className="form-element mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h5 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Prefer other ways to connect?</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a 
                    href="mailto:hello@nazarkhan.dev" 
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
                  >
                    <Mail size={16} className="text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Direct Email</span>
                  </a>
                  <a 
                    href="https://calendly.com/nazarkhan" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <Calendar size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Schedule Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Map Section */}
        <div className="contact-item mt-20 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-20 group-hover:opacity-30 blur-2xl rounded-3xl transition-all duration-500"></div>
          
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 relative">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <div className="text-center text-white z-10 relative">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <MapPin size={40} className="animate-bounce" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">Based in South Waziristan</h3>
                <p className="text-white/90 text-lg mb-4">Pakistan • Available for remote work worldwide</p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Remote Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>PST (UTC+5)</span>
                  </div>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Map interaction hint */}
            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for collaboration
              </span>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* FAQ Quick Links */}
          <div className="contact-item bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-blue-500" />
              Quick Questions?
            </h4>
            <div className="space-y-3">
              <a href="#faq" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                → What's your typical project timeline?
              </a>
              <a href="#faq" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                → Do you work with international clients?
              </a>
              <a href="#faq" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                → What technologies do you specialize in?
              </a>
            </div>
          </div>

          {/* Availability Status */}
          <div className="contact-item bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Users size={20} className="text-green-500" />
              Current Availability
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Available for new projects</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Next available: <span className="font-medium">Immediately</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Capacity: <span className="font-medium">2-3 projects</span>
              </div>
            </div>
          </div>

          {/* Testimonial Preview */}
          <div className="contact-item bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-purple-500" />
              Client Feedback
            </h4>
            <blockquote className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
              "Exceptional work quality and communication. Highly recommended!"
            </blockquote>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <div className="text-xs">
                <div className="font-medium">John Doe</div>
                <div className="text-gray-500">CEO, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .triangle {
          width: 0;
          height: 0;
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          .animate-spin {
            animation: none;
          }
          
          .group:hover .transform {
            transform: none;
          }
        }
        
        /* Focus styles for better accessibility */
        input:focus,
        textarea:focus,
        button:focus {
          outline: 2px solid #10B981;
          outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-r {
            background: #10B981;
          }
        }
      `}</style>
    </section>
  );
}
