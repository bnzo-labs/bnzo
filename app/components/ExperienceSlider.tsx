'use client';

import { Experience } from '../types';

interface ExperienceSliderProps {
  experiences: Experience[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onExperienceSelect: (experience: Experience) => void;
}

export function ExperienceSlider({ 
  experiences, 
  currentIndex, 
  onIndexChange, 
  onExperienceSelect 
}: ExperienceSliderProps) {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {experiences.map((exp, j) => (
            <div key={j} className="w-1/3 flex-shrink-0 px-2">
              <div 
                className="bg-background/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors duration-200 cursor-pointer h-full" 
                onClick={() => onExperienceSelect(exp)}
              >
                <h3 className="font-semibold text-foreground mb-1 text-lg">{exp.company}</h3>
                <p className="text-primary text-sm font-medium mb-2">{exp.position}</p>
                <p className="text-muted-foreground text-xs mb-3">{exp.duration}</p>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {exp.tech.slice(0, 3).map((tech, k) => (
                    <span key={k} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {exp.tech.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{exp.tech.length - 3}
                    </span>
                  )}
                </div>
                <div className="text-primary hover:text-primary/80 text-xs font-medium">
                  Click for details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slider Navigation */}
      {experiences.length > 3 && (
        <>
          <button
            onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            ←
          </button>
          <button
            onClick={() => onIndexChange(Math.min(Math.ceil(experiences.length / 3) - 1, currentIndex + 1))}
            disabled={currentIndex >= Math.ceil(experiences.length / 3) - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            →
          </button>
        </>
      )}
      
      {/* Dots Indicator */}
      {experiences.length > 3 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(experiences.length / 3) }).map((_, j) => (
            <button
              key={j}
              onClick={() => onIndexChange(j)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                j === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

