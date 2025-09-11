"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Particles only if needed
const Particles = dynamic(() => import("./Particles"), {
  ssr: false,
  loading: () => null
});

// Testimonials data - moved outside component to prevent recreation on every render
const TESTIMONIALS_DATA = [
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
    content: "Working with Nazar on our mobile application was a great experience. He&apos;s proactive, communicates clearly, and delivers high-quality code. I would definitely hire him again for future projects.",
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
    content: "Nazar&apos;s technical expertise and creativity helped us transform our vision into a fully functional web application. His ability to understand complex requirements and implement them is impressive.",
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
    content: "I&apos;ve collaborated with Nazar on multiple projects, and he consistently delivers exceptional work. His full-stack development skills and dedication to quality make him a valuable asset to any team.",
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

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);
  const titleRef = useRef(null);
  const intervalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoized navigation functions
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS_DATA.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToTestimonial = useCallback((index) => {
    if (isAnimating || index === currentTestimonial) return;
    setIsAnimating(true);
    setCurrentTestimonial(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentTestimonial]);

  // Animation setup with Intersection Observer as fallback
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe testimonial items
    const testimonialItems = testimonialsRef.current?.querySelectorAll('.testimonial-item');
    if (testimonialItems) {
      testimonialItems.forEach(item => observer.observe(item));
    }

    // Auto-rotate testimonials
    intervalRef.current = setInterval(nextTestimonial, 5000);

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextTestimonial]);

  // Render star ratings
  const renderStars = useCallback((rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i}
        size={20}
        className={i < rating 
          ? "text-yellow-400 fill-yellow-400" 
          : "text-gray-300 dark:text-gray-600"
        }
      />
    ));
  }, []);

  // Truncate text for grid items
  const truncateText = useCallback((text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }, []);

  return (
    <section id="testimonials" className="relative py-20 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Particles Background - Only render if Particles component exists */}
      <div className="absolute inset-0 z-0">
        <Particles count={40} className="absolute inset-0 z-0" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-4 observe-me">
          Client <span className="text-green-500 dark:text-green-400">Testimonials</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Here&apos;s what clients and colleagues have to say about working with me.
        </p>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {TESTIMONIALS_DATA.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="flex-shrink-0 w-full"
                >
                  <div className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md p-8 md:p-10 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Quote className="w-12 h-12 text-green-500 dark:text-green-400 mb-6 opacity-30" />
                    
                    <div className="flex items-start mb-6">
                      <div className="flex-1">
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                        
                        <div className="flex items-center mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        <div className="flex items-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white/30"
                            loading="lazy"
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
                        aria-label={`Connect with ${testimonial.name} on LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={testimonial.social.twitter}
                        className="p-2 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full hover:bg-green-500 dark:hover:bg-green-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow ${testimonial.name} on Twitter`}
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
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 dark:border-gray-700/30 hover:bg-green-500 dark:hover:bg-green-600 hover:text-white transition-all z-20"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all ${
                  index === currentTestimonial
                    ? "bg-green-500 dark:bg-green-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-green-400 dark:hover:bg-green-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div ref={testimonialsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30 hover:border-green-500 dark:hover:border-green-400 transition-colors"
            >
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                &ldquo;{truncateText(testimonial.content, 120)}&rdquo;
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

      <style jsx>{`
        .observe-me {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .observe-me.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}