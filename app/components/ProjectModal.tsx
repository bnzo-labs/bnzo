'use client';

import { Project } from '../types';
import { useEffect, useState } from 'react';
import { SITE_TEXT } from '../constants/siteText';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [project]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10">
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3 animate-fadeInDown flex-1">
              <div className="h-16 w-1.5 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {project.name}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-all duration-300 text-2xl hover:scale-110 hover:rotate-90 border border-border"
            >
              ×
            </button>
          </div>

          {/* Project Screenshot */}
          {project.screenshot && (
            <div className="mb-6 animate-fadeInUp opacity-0 animate-delay-200">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] group bg-gray-100 dark:bg-gray-800">
                <img
                  src={project.screenshot}
                  alt={`${project.name} screenshot`}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/50 transition-colors duration-500"></div>
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp opacity-0 animate-delay-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6 animate-fadeInUp opacity-0 animate-delay-400">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {SITE_TEXT.projectModal.techStackLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, k) => (
                <span
                  key={k}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg font-medium border border-blue-200 dark:border-blue-700 hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border animate-fadeInUp opacity-0 animate-delay-500">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {SITE_TEXT.projectModal.viewDemo}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {SITE_TEXT.projectModal.viewCode}
              </a>
            )}
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-border hover:bg-muted text-foreground rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              {SITE_TEXT.projectModal.closeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

