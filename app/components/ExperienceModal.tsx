'use client';

import { Experience } from '../types';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">{experience.company}</h2>
              <p className="text-xl text-primary font-medium mt-1">{experience.position}</p>
              <p className="text-muted-foreground mt-1">{experience.duration}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground transition-colors duration-200 text-xl"
            >
              ×
            </button>
          </div>
          
          {/* Job Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">About This Role</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {experience.description}
            </p>
          </div>
          
          {/* Key Achievements */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Key Achievements</h3>
            <ul className="space-y-3">
              {experience.achievements.map((achievement, k) => (
                <li key={k} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{achievement}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((tech, k) => (
                <span key={k} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {experience.companyUrl && (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200 flex items-center justify-center gap-2"
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 border border-border hover:bg-muted text-foreground rounded-lg font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

