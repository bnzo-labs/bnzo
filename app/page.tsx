'use client';

import React, { useState, useCallback, useEffect } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { InteractiveBackground } from "./components/InteractiveBackground";
import { SocialMediaSidebar } from "./components/SocialMediaSidebar";
import { QuickQuestions } from "./components/QuickQuestions";
import { ChatInterface } from "./components/ChatInterface";
import { ProjectModal } from "./components/ProjectModal";
import { ExperienceModal } from "./components/ExperienceModal";
import { Block, Project, Experience } from "./types";
import { getMockResponse } from "./data/mockData";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { updateScore } from "./store/gameSlice";
import { usageTracker } from "./utils/usageTracker";
import { SITE_TEXT } from "./constants/siteText";

export default function Home() {
  const dispatch = useAppDispatch();
  const { playMode, score } = useAppSelector((state: { game: { playMode: boolean; score: number } }) => state.game);

  const [input, setInput] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [userQuestions, setUserQuestions] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState<number | null>(null);
  const [usageLimitReached, setUsageLimitReached] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [typedText, setTypedText] = useState("");

  const handleQuestionSelect = (question: string) => {
    // For quick questions, use mock data immediately without API call
    const currentQuestion = question.trim();

    // Clear previous content and show user question
    setBlocks([]);
    setUserQuestions([currentQuestion]);
    setLoading(true);

    // Use mock response directly (quick questions don't need AI)
    setTimeout(() => {
      const mockResponse = getMockResponse(currentQuestion);
      setBlocks([mockResponse]);
      setLoading(false);
    }, 300); // Short delay for smooth UX
  };

  const handleContactFormSubmit = () => {
    // Here you would typically send the form data to your backend
    // For now, just show a success message
    // In a real app, you might want to show a toast notification or update the UI
  };

  const handleTogglePlayMode = () => {
    // Call the global function to handle both game logic and Redux state
    if (typeof window !== 'undefined') {
      const windowWithToggle = window as Window & { togglePlayMode?: () => void };
      if (windowWithToggle.togglePlayMode) {
        windowWithToggle.togglePlayMode();
      }
    }
  };

  // Set up score update handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as Window & { onScoreUpdate?: (points: number) => void }).onScoreUpdate = (points: number) => {
        dispatch(updateScore(points));
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as Window & { onScoreUpdate?: (points: number) => void }).onScoreUpdate;
      }
    };
  }, [dispatch]);

  // Initialize usage tracking from localStorage
  useEffect(() => {
    const usageStatus = usageTracker.getUsageStatus();
    setRemainingQuestions(usageStatus.remaining);
    setUsageLimitReached(usageStatus.isLimitReached);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const fullText = SITE_TEXT.hero.greeting;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust speed here (100ms per character)

    return () => clearInterval(typingInterval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const currentQuestion = input.trim();
    setInput("");

    // Clear previous content and show user question
    setBlocks([]);
    setUserQuestions([currentQuestion]);
    setLoading(true);

    // Check usage limit from localStorage
    const isLimitReached = usageTracker.isLimitReached();

    try {
      // Call the AI API with current usage status
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentQuestion,
          isLimitReached: isLimitReached
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlocks(data.blocks);

      // Update localStorage usage tracking if AI was used
      if (!isLimitReached && data.blocks[0]?.aiEnhanced) {
        usageTracker.incrementUsage();
        const newUsageStatus = usageTracker.getUsageStatus();
        setRemainingQuestions(newUsageStatus.remaining);
        setUsageLimitReached(newUsageStatus.isLimitReached);
      } else {
        // Update state from API response for demo mode
        if (data.blocks[0]?.remainingQuestions !== undefined) {
          setRemainingQuestions(data.blocks[0].remainingQuestions);
        }
        if (data.blocks[0]?.usageLimitReached) {
          setUsageLimitReached(true);
        }
      }
    } catch {
      // Fallback to mock response if AI fails
      const mockResponse = getMockResponse(currentQuestion);
      setBlocks([mockResponse]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Interactive Background */}
      <InteractiveBackground
        onScoreUpdate={useCallback((points: number) => dispatch(updateScore(points)), [dispatch])}
        onPlayModeToggle={useCallback(() => { }, [])}
      />

      {/* Logo - Fixed position at top left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="w-16 h-16 relative">
          <img
            src="/logo.webp"
            alt="Erick Logo"
            className="w-full h-full object-contain drop-shadow-lg rounded-full"
          />
        </div>
      </div>

      {/* Theme Toggle and Play Mode Toggle - Fixed position in top right */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Usage Indicator */}
        {!playMode && remainingQuestions !== null && (
          <div className="flex gap-2">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${usageLimitReached
              ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200/30'
              : remainingQuestions <= 2
                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200/30'
                : 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200/30'
              }`}>
              {usageLimitReached ? (
                <span>{SITE_TEXT.usage.demoMode}</span>
              ) : (
                <span>{SITE_TEXT.usage.questionsRemaining(remainingQuestions)}</span>
              )}
            </div>

            {/* Reset button for testing (only show in development) */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => {
                  usageTracker.resetUsage();
                  const newStatus = usageTracker.getUsageStatus();
                  setRemainingQuestions(newStatus.remaining);
                  setUsageLimitReached(newStatus.isLimitReached);
                  setBlocks([]);
                  setUserQuestions([]);
                }}
                className="px-2 py-1 bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200/30 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                title={SITE_TEXT.usage.resetButtonTitle}
              >
                {SITE_TEXT.usage.resetButton}
              </button>
            )}
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleTogglePlayMode();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 select-none ${playMode
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
        >
          {playMode ? SITE_TEXT.game.exitButton : SITE_TEXT.game.playButton}
        </button>
        <ThemeToggle />
      </div>

      {/* Social Media Sidebar - Hidden in play mode */}
      {!playMode && <SocialMediaSidebar />}

      {/* Hero Section - Dynamic content area */}
      {!playMode && (
        <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-48">
          <div className="max-w-6xl mx-auto text-center w-full">
            {blocks.length === 0 && userQuestions.length === 0 ? (
              // Initial state - show intro with animation
              <div className="animate-fadeInDown">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  {typedText}
                  <span className="animate-pulse">|</span>
                  <br />
                  <span className="text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {SITE_TEXT.hero.title}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  {SITE_TEXT.hero.subtitle}
                </p>
              </div>
            ) : (
              // Dynamic content - full page scroll
              <div className="w-full">
                <ChatInterface
                  blocks={blocks}
                  userQuestions={userQuestions}
                  loading={loading}
                  currentProjectIndex={currentProjectIndex}
                  currentExperienceIndex={currentExperienceIndex}
                  onProjectIndexChange={setCurrentProjectIndex}
                  onExperienceIndexChange={setCurrentExperienceIndex}
                  onProjectSelect={setSelectedProject}
                  onExperienceSelect={setSelectedExperience}
                  onContactFormSubmit={handleContactFormSubmit}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Play Mode Instructions and Score */}
      {/* move to separate component */}
      {playMode && (
        <>
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 text-center">
            <div className="bg-card/90 backdrop-blur-md text-card-foreground px-6 py-4 rounded-2xl border border-border">
              <h2 className="text-xl font-semibold mb-2">{SITE_TEXT.game.title}</h2>
              <p className="text-sm text-muted-foreground">
                {SITE_TEXT.game.instructions}
              </p>
            </div>
          </div>

          {/* Score Display */}
          <div className="fixed top-6 left-6 z-50">
            <div className="bg-card/90 backdrop-blur-md text-card-foreground px-4 py-2 rounded-lg border border-border">
              <div className="text-sm font-medium text-muted-foreground">{SITE_TEXT.game.scoreLabel}</div>
              <div className="text-2xl font-bold text-primary">{score}</div>
            </div>
          </div>
        </>
      )}

      {/* Fixed Input Section - Hidden in play mode */}
      {!playMode && (
        <section className="fixed bottom-0 left-0 right-0 p-6 z-40 pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            {/* Quick Questions Pills - Animated on focus */}
            <div className={`transition-all duration-500 ease-out transform ${isInputFocused
              ? 'opacity-100 translate-y-0 mb-4'
              : 'opacity-0 translate-y-4 mb-0 pointer-events-none'
              }`}>
              <QuickQuestions
                onQuestionSelect={(question) => {
                  handleQuestionSelect(question);
                  setIsInputFocused(false);
                }}
                loading={loading}
              />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                  placeholder={SITE_TEXT.hero.inputPlaceholder}
                  disabled={loading}
                  className="w-full p-4 pr-20 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {loading ? SITE_TEXT.hero.submitButtonLoading : SITE_TEXT.hero.submitButton}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </main>
  );
}