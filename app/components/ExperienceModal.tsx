'use client';

import { Experience } from '../types';
import { useEffect, useState } from 'react';
import { ScreenshotSlider } from './ScreenshotSlider';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (experience) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [experience]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!experience) return null;

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
          {/* Modal Header with Screenshots */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6 animate-fadeInDown">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-16 w-1.5 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      {experience.company}
                    </h2>
                    <p className="text-xl md:text-2xl text-primary font-semibold mt-1">{experience.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground ml-5 text-base flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {experience.duration}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-all duration-300 text-2xl hover:scale-110 hover:rotate-90 border border-border"
              >
                ×
              </button>
            </div>

            {/* Screenshots Slider - Right after header */}
            {experience.screenshots && experience.screenshots.length > 0 && (
              <div className="animate-fadeInUp opacity-0 animate-delay-200">
                <ScreenshotSlider
                  screenshots={experience.screenshots}
                  companyName={experience.company}
                />
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp opacity-0 animate-delay-300">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              About This Role
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {experience.description}
            </p>
          </div>

          {/* Key Achievements */}
          <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp opacity-0 animate-delay-400">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Achievements
            </h3>
            <ul className="space-y-2.5">
              {experience.achievements.map((achievement, k) => (
                <li
                  key={k}
                  className="flex items-start gap-3 group"
                >
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{achievement}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-6 animate-fadeInUp opacity-0 animate-delay-500">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((tech, k) => (
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
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border animate-fadeInUp opacity-0 animate-delay-600">
            {experience.companyUrl && (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Company
              </a>
            )}
            {experience.linkedinUrl && (
              <a
                href={experience.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-border hover:bg-muted text-foreground rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

