'use client';

import { Project } from '../types';

interface ProjectSliderProps {
    projects: Project[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
    onProjectSelect: (project: Project) => void;
}

export function ProjectSlider({
    projects,
    currentIndex,
    onIndexChange,
    onProjectSelect
}: ProjectSliderProps) {
    return (
        <div className="relative">
            <div className="overflow-hidden rounded-xl">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                >
                    {projects.map((project, j) => (
                        <div key={j} className="w-1/3 flex-shrink-0 px-2">
                            <div
                                className="bg-background/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors duration-200 cursor-pointer h-full"
                                onClick={() => onProjectSelect(project)}
                            >
                                <h3 className="font-semibold text-foreground mb-2 text-lg">{project.name}</h3>
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.tech.slice(0, 3).map((tech, k) => (
                                        <span key={k} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                            +{project.tech.length - 3}
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
            {projects.length > 3 && (
                <>
                    <button
                        onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
                        disabled={currentIndex === 0}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => onIndexChange(Math.min(Math.ceil(projects.length / 3) - 1, currentIndex + 1))}
                        disabled={currentIndex >= Math.ceil(projects.length / 3) - 1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        →
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {projects.length > 3 && (
                <div className="flex justify-center mt-4 gap-2">
                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, j) => (
                        <button
                            key={j}
                            onClick={() => onIndexChange(j)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${j === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

