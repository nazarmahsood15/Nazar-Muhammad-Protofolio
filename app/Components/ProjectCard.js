"use client";
"use client";

import React, { useState, useEffect } from "react"; // <--- Add this
import { Eye, Users, Clock, Star, Heart, Share2, Monitor, Calendar, Award, Info, Code, Maximize2, ChevronLeft, ChevronRight, X, Zap, Play, ExternalLink, Github } from "lucide-react"; 


/* ------------------ Project Card Component ------------------ */
export const ProjectCard = React.forwardRef(({ 
  project, 
  index, 
  viewMode, 
  isLiked, 
  onLike, 
  onShare, 
  onClick 
}, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-400 bg-green-400/20";
      case "in-progress": return "text-yellow-400 bg-yellow-400/20";
      case "planning": return "text-blue-400 bg-blue-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  if (viewMode === "list") {
    return (
      <div
        ref={ref}
        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-500 cursor-pointer overflow-hidden"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                <Monitor className="text-gray-500" size={32} />
              </div>
            )}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = `https://picsum.photos/seed/${project.id}/600/400`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent"></div>
            
            {/* Status Badge */}
            <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>
              
              {project.featured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-700/50 rounded-full text-xs border border-gray-600/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs border border-gray-600/50">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  {project.views}
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  {project.teamSize}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {project.duration}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => onLike(project.id, e)}
                  className={`p-2 rounded-full transition-all ${
                    isLiked ? 'text-red-400 bg-red-400/20' : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                  }`}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={(e) => onShare(project, e)}
                  className="p-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-green-400/50 transition-all duration-500 transform hover:-translate-y-2 relative cursor-pointer ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full">
          <Star size={12} fill="currentColor" />
          Featured
        </div>
      )}

      {/* Status Badge */}
      <div className={`absolute top-4 right-4 z-20 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(project.status)}`}>
        {project.status.replace('-', ' ').toUpperCase()}
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <Monitor className="text-gray-500" size={32} />
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/${project.id}/600/400`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <button
            onClick={(e) => onLike(project.id, e)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked 
                ? 'text-red-400 bg-red-400/20 scale-110' 
                : 'text-white bg-black/30 hover:bg-red-400/20 hover:text-red-400'
            }`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => onShare(project, e)}
            className="p-2 rounded-full backdrop-blur-sm text-white bg-black/30 hover:bg-blue-400/20 hover:text-blue-400 transition-all"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Awards */}
        {project.awards && project.awards.length > 0 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 bg-purple-500/20 backdrop-blur-sm text-purple-300 text-xs rounded-full">
            <Award size={12} />
            {project.awards.length} Award{project.awards.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-700/50 rounded-full text-xs border border-gray-600/50 hover:border-green-400/50 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs border border-gray-600/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              {project.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              {project.likes + (isLiked ? 1 : 0)}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(project.createdAt).getFullYear()}
          </div>
        </div>

        {/* Progress Bar for In-Progress Projects */}
        {project.status === "in-progress" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

/* ------------------ Enhanced Modal Component ------------------ */
function EnhancedProjectModal({ project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: Info },
    { id: "gallery", name: "Gallery", icon: Monitor },
    { id: "tech", name: "Technology", icon: Code },
    { id: "team", name: "Team & Stats", icon: Users },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={project.gallery?.[currentImageIndex] || project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
              
              {/* Navigation Arrows */}
              {project.gallery && project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                  {currentImageIndex + 1} / {project.gallery.length}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Status and Featured Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {project.featured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full">
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}
              <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                project.status === "completed" ? "text-green-400 bg-green-400/20" :
                project.status === "in-progress" ? "text-yellow-400 bg-yellow-400/20" :
                "text-blue-400 bg-blue-400/20"
              }`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-lg">{project.description}</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                {project.demoVideo && (
                  <a
                    href={project.demoVideo}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded-lg text-white font-medium hover:bg-purple-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={16} />
                    Demo
                  </a>
                )}
                <a
                  href={project.liveLink}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? "border-green-400 text-green-400"
                          : "border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <IconComponent size={16} />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-h-96 overflow-y-auto">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Project Description</h4>
                    <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.highlights?.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.awards && project.awards.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Awards & Recognition</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.awards.map((award, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg">
                            <Award size={16} />
                            {award}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery?.map((image, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => {
                          setCurrentImageIndex(i);
                          setIsImageModalOpen(true);
                        }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Technologies Used</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {project.technologies.map((tech, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          <Zap size={16} className="text-green-400" />
                          <span className="text-gray-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{project.teamSize}</div>
                      <div className="text-sm text-gray-400">Team Members</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{project.duration}</div>
                      <div className="text-sm text-gray-400">Duration</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{project.views.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Views</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-pink-400">{project.likes}</div>
                      <div className="text-sm text-gray-400">Likes</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-400">Project Timeline</h4>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      <span>Started: {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-60 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <img
            src={project.gallery[currentImageIndex]}
            alt={`${project.title} full size`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
}

export default ProjectCard