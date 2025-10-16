'use client';

import { useState } from 'react';

interface ScreenshotSliderProps {
    screenshots: string[];
    companyName: string;
}

export function ScreenshotSlider({ screenshots, companyName }: ScreenshotSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative group">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-800">
                <img
                    src={screenshots[currentIndex]}
                    alt={`${companyName} screenshot ${currentIndex + 1}`}
                    className="w-full h-64 md:h-72 object-cover transition-all duration-500"
                    onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/800x600/1e293b/60a5fa?text=${companyName}+${currentIndex + 1}`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/70 dark:bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    {currentIndex + 1} / {screenshots.length}
                </div>
            </div>

            {/* Navigation Arrows */}
            {screenshots.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600"
                        aria-label="Previous screenshot"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600"
                        aria-label="Next screenshot"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {screenshots.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {screenshots.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                            aria-label={`Go to screenshot ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

