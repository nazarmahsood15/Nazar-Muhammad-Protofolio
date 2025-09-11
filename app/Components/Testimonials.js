"use client";
import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "./SpermAnimation";
import Particles from "./Particles";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);
  const titleRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO at TechSolutions Inc.",
      content: "Nazar delivered an exceptional e-commerce platform for our company. His attention to detail and problem-solving skills are remarkable. The project was completed ahead of schedule and exceeded our expectations.",
      rating: 5,
      image: "/api/placeholder/80/80",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at StartupHub",
      content: "Working with Nazar on our mobile application was a great experience. He's proactive, communicates clearly, and delivers high-quality code. I would definitely hire him again for future projects.",
      rating: 5,
      image: "/api/placeholder/80/80",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Director at DesignStudio",
      content: "Nazar's technical expertise and creativity helped us transform our vision into a fully functional web application. His ability to understand complex requirements and implement them is impressive.",
      rating: 4,
      image: "/api/placeholder/80/80",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "David Wilson",
      role: "CTO at InnovateTech",
      content: "I've collaborated with Nazar on multiple projects, and he consistently delivers exceptional work. His full-stack development skills and dedication to quality make him a valuable asset to any team.",
      rating: 5,
      image: "/api/placeholder/80/80",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Founder at CreativeAgency",
      content: "Nazar developed a complex dashboard for our analytics platform. His technical skills, combined with his understanding of user experience, resulted in a product that our clients love to use.",
      rating: 5,
      image: "/api/placeholder/80/80",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate testimonials
    const testimonialItems = testimonialsRef.current?.querySelectorAll(".testimonial-item");
    if (testimonialItems) {
      testimonialItems.forEach((item, index) => {
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

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section id="testimonials" className="relative py-20 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Particles Background */}
      
      <div className="absolute inset-0 z-0">
                 <Particles count={40} className="absolute inset-0 z-0" />
        
    
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-4">
          Client <span className="text-green-500 dark:text-green-400">Testimonials</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Here's what clients and colleagues have to say about working with me.
        </p>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="flex-shrink-0 w-full testimonial-item"
                >
                  <div className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md p-8 md:p-10 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Quote className="w-12 h-12 text-green-500 dark:text-green-400 mb-6 opacity-30" />
                    
                    <div className="flex items-start mb-6">
                      <div className="flex-1">
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              size={20}
                              className={i < testimonial.rating 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300 dark:text-gray-600"
                              }
                            />
                          ))}
                        </div>
                        
                        <div className="flex items-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white/30"
                          />
                          <div>
                            <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <a 
                        href={testimonial.social.linkedin}
                        className="p-2 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full hover:bg-green-500 dark:hover:bg-green-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={testimonial.social.twitter}
                        className="p-2 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full hover:bg-green-500 dark:hover:bg-green-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 dark:border-gray-700/30 hover:bg-green-500 dark:hover:bg-green-600 hover:text-white transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 dark:border-gray-700/30 hover:bg-green-500 dark:hover:bg-green-600 hover:text-white transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all ${
                  index === currentTestimonial
                    ? "bg-green-500 dark:bg-green-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-green-400 dark:hover:bg-green-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div ref={testimonialsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-item bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30 hover:border-green-500 dark:hover:border-green-400 transition-colors"
            >
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/30"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    className={i < testimonial.rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                "{testimonial.content.length > 120 
                  ? `${testimonial.content.substring(0, 120)}...` 
                  : testimonial.content
                }"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Want to share your experience working with me?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 dark:bg-green-600 rounded-lg text-white font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-colors backdrop-blur-sm"
          >
            Add Your Testimonial
          </a>
        </div>
      </div>
    </section>
  );
}

