'use client';

import { Block, Project, Experience, ContactFormData } from '../types';
import { ProjectSlider } from './ProjectSlider';
import { ExperienceSlider } from './ExperienceSlider';
import { useEffect, useRef } from 'react';
import { SITE_TEXT } from '../constants/siteText';

// Helper function to get technology icon
const getTechIcon = (skillName: string): string | null => {
  const iconMap: Record<string, string> = {
    // Languages
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    'swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    'kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',

    // Frontend Frameworks
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
    'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'nextjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'gatsby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gatsby/gatsby-original.svg',
    'nuxt': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',

    // CSS & Styling
    'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'html': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'tailwindcss': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'materialui': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
    'material-ui': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',

    // Backend
    'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    'spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
    'rails': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg',

    // Databases
    'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',

    // DevOps & Tools
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'gitlab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'gcp': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',

    // Testing
    'jest': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    'cypress': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg',
    'playwright': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg',

    // Mobile
    'react native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',

    // Other
    'graphql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    'webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
    'vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'slack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
    'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'vim': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg',
    'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg',
    'npm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    'yarn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
    'pnpm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pnpm/pnpm-original.svg',
    'babel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg',
    'eslint': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    'prettier': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg',
    'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'pytorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'opencv': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    'electron': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    'threejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    'three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    'd3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg',
    'd3.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg',
    'jquery': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
    'markdown': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
    'json': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
  };

  const normalizedSkill = skillName.toLowerCase().trim();
  return iconMap[normalizedSkill] || null;
};

interface ChatInterfaceProps {
  blocks: Block[];
  userQuestions: string[];
  loading: boolean;
  currentProjectIndex: number;
  currentExperienceIndex: number;
  onProjectIndexChange: (index: number) => void;
  onExperienceIndexChange: (index: number) => void;
  onProjectSelect: (project: Project) => void;
  onExperienceSelect: (experience: Experience) => void;
  onContactFormSubmit: (formData: ContactFormData) => void;
}

export function ChatInterface({
  blocks,
  userQuestions,
  loading,
  currentProjectIndex,
  currentExperienceIndex,
  onProjectIndexChange,
  onExperienceIndexChange,
  onProjectSelect,
  onExperienceSelect
}: ChatInterfaceProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to top when new content arrives
  useEffect(() => {
    if (contentRef.current && blocks.length > 0) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [blocks.length]);

  return (
    <div ref={contentRef} className="space-y-8 max-w-5xl mx-auto text-left pb-8">
      {/* User Question - Integrated as section header */}
      {userQuestions.map((question, i) => (
        <div key={`question-${i}`} className="animate-scaleIn opacity-0 mb-16">
          <div className="text-center">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-pulse">
                {question}
              </h2>
              <div className="h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full animate-expandWidth"></div>
            </div>
          </div>
        </div>
      ))}

      {/* AI Responses */}
      {blocks.map((block, i) => {
        const animationClass = i % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight';

        if (block.type === "projects" && block.projects) {
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{block.title}</h2>
                </div>

                <ProjectSlider
                  projects={block.projects}
                  currentIndex={currentProjectIndex}
                  onIndexChange={onProjectIndexChange}
                  onProjectSelect={onProjectSelect}
                />

                {block.summary && (
                  <div className="mt-6 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-base text-foreground/80 leading-relaxed italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </section>
          );
        } else if (block.type === "experience" && block.experience) {
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{block.title}</h2>
                </div>

                <ExperienceSlider
                  experiences={block.experience}
                  currentIndex={currentExperienceIndex}
                  onIndexChange={onExperienceIndexChange}
                  onExperienceSelect={onExperienceSelect}
                />

                {block.summary && (
                  <div className="mt-6 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-base text-foreground/80 leading-relaxed italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </section>
          );
        } else if (block.type === "skills" && block.skills) {
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{block.title}</h2>
                </div>
                <div className="space-y-8">
                  {block.skills.map((category, j) => (
                    <div
                      key={j}
                      className="animate-fadeInUp opacity-0"
                      style={{ animationDelay: `${j * 0.15 + 0.3}s`, animationFillMode: 'forwards' }}
                    >
                      <h3 className="font-bold text-foreground/90 mb-4 text-base uppercase tracking-wider flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                        {category.category}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, k) => {
                          const iconUrl = getTechIcon(skill);
                          return (
                            <span
                              key={k}
                              className="group px-4 py-3 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-2xl text-sm font-medium hover:scale-105 hover:shadow-lg hover:from-primary hover:to-primary/80 transition-all duration-300 cursor-default flex items-center gap-2"
                            >
                              {iconUrl && (
                                <img
                                  src={iconUrl}
                                  alt={`${skill} icon`}
                                  className={`w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300 ${
                                    // Add invert filter for dark icons in dark mode
                                    ['next.js', 'nextjs', 'express', 'github'].includes(skill.toLowerCase())
                                      ? 'dark:invert dark:brightness-100'
                                      : ''
                                    }`}
                                  onError={(e) => {
                                    // Hide image if it fails to load
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {block.summary && (
                  <div className="mt-8 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-base text-foreground/80 leading-relaxed italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </section>
          );
        } else if (block.type === "contact") {
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{block.title}</h2>
                </div>
                {block.message && (
                  <p className="text-foreground/80 mb-8 leading-relaxed text-lg">{block.message}</p>
                )}

                {/* Contact Info */}
                {block.contactInfo && (
                  <div className="grid gap-5 mb-6">
                    {block.contactInfo.map((contact, j) => (
                      <div
                        key={j}
                        className="flex items-center space-x-5 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary hover:from-primary/15 transition-all duration-300 animate-fadeInUp opacity-0"
                        style={{ animationDelay: `${j * 0.15 + 0.3}s`, animationFillMode: 'forwards' }}
                      >
                        <span className="text-4xl">{contact.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground mb-1">{contact.method}</h3>
                          <a
                            href={contact.link}
                            className="text-primary hover:text-primary/80 transition-colors text-base font-medium hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {block.summary && (
                  <div className="mt-8 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-base text-foreground/80 leading-relaxed italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </section>
          );
        } else if (block.type === "fallback") {
          // Fallback response for unrelated questions
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-orange-500/15 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-orange-300/30 dark:border-orange-400/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                    <span className="group-hover:scale-125 transition-transform duration-300">🤔</span> {block.title || SITE_TEXT.chat.fallbackTitle}
                  </h2>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 text-lg">{block.message}</p>

                {/* Usage limit notification */}
                {block.usageLimitReached && (
                  <div className="mb-6 p-5 bg-orange-500/15 rounded-2xl border-l-4 border-orange-500">
                    <p className="text-base text-orange-600 dark:text-orange-400 font-medium">
                      🎭 {block.message}
                    </p>
                  </div>
                )}

                <div className="p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {SITE_TEXT.chat.fallbackSuggestion}
                  </p>
                </div>
              </div>
            </section>
          );
        } else {
          // General response with AI enhancement
          return (
            <section key={`response-${i}`} className={`${animationClass} opacity-0 animate-delay-300 w-full`}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <div className="h-12 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-16 transition-all duration-500"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center flex-wrap gap-2">
                    {block.title}
                    {block.aiEnhanced && (
                      <span className="px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                        {SITE_TEXT.chat.aiEnhanced}
                      </span>
                    )}
                    {block.usageLimitReached && (
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full border border-orange-400/20">
                        {SITE_TEXT.chat.demoMode}
                      </span>
                    )}
                  </h2>
                </div>

                {/* Usage limit notification */}
                {block.usageLimitReached && (
                  <div className="mb-6 p-5 bg-orange-500/15 rounded-2xl border-l-4 border-orange-500">
                    <p className="text-base text-orange-600 dark:text-orange-400 font-medium">
                      🎭 {block.message}
                    </p>
                  </div>
                )}

                {/* AI-enhanced content */}
                {block.aiContent && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-foreground/80 leading-relaxed text-base">{block.aiContent}</p>
                  </div>
                )}

                {/* Original content */}
                <div className="space-y-6">
                  {block.items?.map((item, j) => (
                    <div
                      key={j}
                      className="animate-fadeInUp opacity-0"
                      style={{ animationDelay: `${j * 0.15 + 0.3}s`, animationFillMode: 'forwards' }}
                    >
                      <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-primary rounded-full"></span>
                        {item.title}
                      </h3>
                      <p className="text-foreground/80 text-base leading-relaxed pl-8">{item.text}</p>
                    </div>
                  ))}
                </div>

                {block.summary && (
                  <div className="mt-8 p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                    <p className="text-base text-foreground/80 leading-relaxed italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </section>
          );
        }
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center mb-8 animate-scaleIn">
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-xl text-card-foreground px-8 py-5 rounded-3xl border border-primary/30 shadow-xl animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-base font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{SITE_TEXT.chat.thinking}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

