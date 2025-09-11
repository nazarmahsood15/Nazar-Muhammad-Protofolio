"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ProjectCard from "./ProjectCard"


import {
  ExternalLink,
  Github,
  Filter,
  ChevronDown,
  X,
  Star,
  Search,
  Calendar,
  Users,
  Award,
  Eye,
  Heart,
  Share2,
  Download,
  Play,
  Code,
  Zap,
  TrendingUp,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Palette,
  Database,
  Brain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------ Constants ------------------ */
const projectCategories = [
  { id: "all", name: "All Projects", icon: Globe, count: 0 },
  { id: "fullstack", name: "Full Stack", icon: Monitor, count: 0 },
  { id: "frontend", name: "Frontend", icon: Palette, count: 0 },
  { id: "backend", name: "Backend", icon: Database, count: 0 },
  { id: "ai/ml", name: "AI/ML", icon: Brain, count: 0 },
  { id: "mobile", name: "Mobile", icon: Smartphone, count: 0 },
  { id: "design", name: "Design", icon: Palette, count: 0 },
];

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "popular", name: "Most Popular" },
  { id: "featured", name: "Featured First" },
];

const getDemoImage = (id, title) => {
  const baseUrl = "https://picsum.photos/seed";
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("e-commerce") || lowerTitle.includes("fashion"))
    return `${baseUrl}/business/600/400/${id}`;
  if (lowerTitle.includes("ai") || lowerTitle.includes("content"))
    return `${baseUrl}/technology/600/400/${id}`;
  if (lowerTitle.includes("mobile") || lowerTitle.includes("fitness"))
    return `${baseUrl}/phone/600/400/${id}`;
  if (lowerTitle.includes("design") || lowerTitle.includes("ui"))
    return `${baseUrl}/design/600/400/${id}`;

  return `${baseUrl}/project/600/400/${id}`;
};

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with product management, payments, and admin dashboard.",
    longDescription: "This comprehensive e-commerce platform features a modern React frontend with a robust Node.js backend. It includes advanced features like real-time inventory management, multi-payment gateway integration, and detailed analytics dashboard.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "JWT"],
    image: getDemoImage(1, "E-Commerce Platform"),
    gallery: [
      getDemoImage(1, "E-Commerce Platform"),
      getDemoImage(11, "E-Commerce Dashboard"),
      getDemoImage(12, "E-Commerce Mobile"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: true,
    status: "completed",
    duration: "3 months",
    teamSize: 4,
    views: 1250,
    likes: 89,
    createdAt: "2024-01-15",
    highlights: ["Payment integration", "Admin dashboard", "User authentication"],
    awards: ["Best UI Design", "Innovation Award"],
    demoVideo: "#",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Advocate Connect",
    description: "A platform connecting clients with legal professionals, featuring video consultations.",
    longDescription: "Revolutionary legal consultation platform that bridges the gap between clients and legal professionals through secure video conferencing, document sharing, and case management tools.",
    category: "fullstack",
    technologies: ["Next.js", "Express", "PostgreSQL", "WebRTC", "Twilio"],
    image: getDemoImage(2, "Advocate Connect"),
    gallery: [
      getDemoImage(2, "Advocate Connect"),
      getDemoImage(21, "Legal Dashboard"),
      getDemoImage(22, "Video Call Interface"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: true,
    status: "in-progress",
    duration: "4 months",
    teamSize: 3,
    views: 980,
    likes: 67,
    createdAt: "2024-02-20",
    highlights: ["Video consultations", "Appointment system", "Secure messaging"],
    awards: ["Tech Innovation"],
    demoVideo: "#",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "An AI-powered content generation tool with natural language processing capabilities.",
    longDescription: "Advanced AI content generation platform leveraging cutting-edge NLP models to create high-quality, contextually relevant content for various industries and use cases.",
    category: "ai/ml",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "OpenAI API"],
    image: getDemoImage(3, "AI Content Generator"),
    gallery: [
      getDemoImage(3, "AI Content Generator"),
      getDemoImage(31, "AI Dashboard"),
      getDemoImage(32, "Content Templates"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: false,
    status: "completed",
    duration: "2 months",
    teamSize: 2,
    views: 756,
    likes: 45,
    createdAt: "2024-03-10",
    highlights: ["AI text generation", "Content templates", "API integration"],
    awards: [],
  },
  {
    id: 4,
    title: "Fitness Mobile App",
    description: "A cross-platform mobile application for tracking workouts and nutrition.",
    longDescription: "Comprehensive fitness tracking application with personalized workout plans, nutrition tracking, progress analytics, and social features to keep users motivated.",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    image: getDemoImage(4, "Fitness Mobile App"),
    gallery: [
      getDemoImage(4, "Fitness Mobile App"),
      getDemoImage(41, "Workout Tracker"),
      getDemoImage(42, "Nutrition Dashboard"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: false,
    status: "completed",
    duration: "5 months",
    teamSize: 3,
    views: 1100,
    likes: 78,
    createdAt: "2023-12-05",
    highlights: ["Workout tracking", "Progress analytics", "Meal planning"],
    awards: ["Best Mobile App"],
  },
  {
    id: 5,
    title: "UI Design System",
    description: "A comprehensive design system with reusable components and documentation.",
    longDescription: "Modern design system built for scalability and consistency across multiple products, featuring comprehensive component library, design tokens, and accessibility guidelines.",
    category: "design",
    technologies: ["Figma", "Storybook", "CSS", "JavaScript"],
    image: getDemoImage(5, "UI Design System"),
    gallery: [
      getDemoImage(5, "UI Design System"),
      getDemoImage(51, "Component Library"),
      getDemoImage(52, "Design Tokens"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: false,
    status: "completed",
    duration: "2 months",
    teamSize: 2,
    views: 890,
    likes: 56,
    createdAt: "2024-01-30",
    highlights: ["Component library", "Design tokens", "Accessibility guidelines"],
    awards: [],
  },
  {
    id: 6,
    title: "API Gateway",
    description: "A high-performance API gateway with rate limiting and authentication.",
    longDescription: "Enterprise-grade API gateway solution providing secure, scalable, and high-performance API management with advanced features like rate limiting, request transformation, and comprehensive monitoring.",
    category: "backend",
    technologies: ["Go", "Redis", "Docker", "Kubernetes", "JWT"],
    image: getDemoImage(6, "API Gateway"),
    gallery: [
      getDemoImage(6, "API Gateway"),
      getDemoImage(61, "API Dashboard"),
      getDemoImage(62, "Monitoring Interface"),
    ],
    liveLink: "#",
    githubLink: "#",
    featured: false,
    status: "completed",
    duration: "3 months",
    teamSize: 2,
    views: 654,
    likes: 34,
    createdAt: "2024-02-15",
    highlights: ["Rate limiting", "Request logging", "Microservices integration"],
    awards: [],
  },
];

/* ------------------ Main Component ------------------ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [isMobile, setIsMobile] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const projectsRef = useRef([]);
  const filterRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return projectCategories.map(cat => ({
      ...cat,
      count: cat.id === "all" 
        ? projectsData.length 
        : projectsData.filter(p => p.category === cat.id).length
    }));
  }, []);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = activeFilter === "all" 
      ? projectsData 
      : projectsData.filter(p => p.category === activeFilter);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "popular":
          return b.views - a.views;
        case "featured":
          return b.featured - a.featured;
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  // Pagination
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredAndSortedProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredAndSortedProjects, currentPage, projectsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);

  // Statistics
  const stats = useMemo(() => ({
    totalProjects: projectsData.length,
    totalViews: projectsData.reduce((sum, p) => sum + p.views, 0),
    totalLikes: projectsData.reduce((sum, p) => sum + p.likes, 0),
    featuredProjects: projectsData.filter(p => p.featured).length,
  }), []);

  /* ------------------ GSAP Animations ------------------ */
  useEffect(() => {
    // Title and subtitle animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    // Stats animation
    if (statsRef.current && showStats) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }

    // Filter buttons animation
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current.children,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.6,
          ease: "power3.out",
        }
      );
    }

    // Project cards animations
    projectsRef.current.forEach((el, index) => {
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 80, rotationY: 10 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // 3D hover effect for non-mobile
      if (!isMobile) {
        let timeout;
        const handleMove = (e) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            const rect = el.getBoundingClientRect();
            const angleY = (e.clientX - rect.left - rect.width / 2) / 25;
            const angleX = (rect.height / 2 - (e.clientY - rect.top)) / 25;

            gsap.to(el, {
              rotationY: angleY,
              rotationX: angleX,
              transformPerspective: 1000,
              duration: 0.4,
            });
          }, 16);
        };

        const handleLeave = () =>
          gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.5 });

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
          el.removeEventListener("mousemove", handleMove);
          el.removeEventListener("mouseleave", handleLeave);
        };
      }
    });
  }, [activeFilter, isMobile, showStats, paginatedProjects]);

  /* ------------------ Event Handlers ------------------ */
  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };
  
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const handleFilterClick = (category) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveFilter(category);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
    if (isMobile) setShowFilters(false);
  };

  const handleLike = useCallback((projectId, e) => {
    e.stopPropagation();
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback((project, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-400 bg-green-400/20";
      case "in-progress": return "text-yellow-400 bg-yellow-400/20";
      case "planning": return "text-blue-400 bg-blue-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  /* ------------------ Render ------------------ */
  return (
    <section
      id="projects"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Projects</span>
          </h2>
          <p ref={subtitleRef} className="text-gray-400 max-w-3xl mx-auto mb-8 text-lg">
            A showcase of innovative solutions, creative designs, and cutting-edge technology implementations.
          </p>
          
          {/* Stats Toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700/50 transition-all"
          >
            <TrendingUp size={18} />
            {showStats ? "Hide Stats" : "Show Stats"}
          </button>

          {/* Stats Display */}
          {showStats && (
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">{stats.totalProjects}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-blue-400">{stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Views</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-pink-400">{stats.totalLikes}</div>
                <div className="text-sm text-gray-400">Total Likes</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">{stats.featuredProjects}</div>
                <div className="text-sm text-gray-400">Featured</div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Controls */}
        <div className="mb-8 space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl focus:border-green-400 focus:outline-none transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl focus:border-green-400 focus:outline-none transition-colors"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id} className="bg-gray-800">
                    {option.name}
                  </option>
                ))}
              </select>
              
              <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${viewMode === "grid" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <Monitor size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${viewMode === "list" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  <Filter size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div ref={filterRef} className="flex flex-col items-center">
            <button
              className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl mb-4 md:hidden border border-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filter Projects</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            <div className={`flex flex-wrap justify-center gap-3 transition-all duration-300 ${
              showFilters ? "flex max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            } md:flex md:max-h-full md:opacity-100`}>
              {categoriesWithCounts.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleFilterClick(category.id)}
                    className={`group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-sm ${
                      activeFilter === category.id
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30 scale-105"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-gray-600"
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === category.id ? "bg-white/20" : "bg-gray-700"
                    }`}>
                      {category.count}
                    </span>
                    {activeFilter === category.id && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        )}

        {/* Projects Grid/List */}
        {!isLoading && (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {paginatedProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                viewMode={viewMode}
                isLiked={likedProjects.has(project.id)}
                onLike={handleLike}
                onShare={handleShare}
                onClick={() => openProjectModal(project)}
                ref={(el) => (projectsRef.current[i] = el)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !paginatedProjects.length && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
              className="px-6 py-3 bg-green-500 rounded-xl hover:bg-green-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Project Modal */}
      {selectedProject && (
        <EnhancedProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

