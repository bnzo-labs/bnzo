'use client';

import { Block, Project, Experience, ContactFormData } from '../types';
import { ProjectSlider } from './ProjectSlider';
import { ExperienceSlider } from './ExperienceSlider';

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
  return (
    <div className="space-y-5 max-w-3xl mx-auto text-left pb-8">
      {/* User Questions */}
      {userQuestions.map((question, i) => (
        <div key={`question-${i}`} className="flex justify-end mb-4">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-md max-w-xs lg:max-w-md animate-fadeInUp">
            <p className="text-sm">{question}</p>
          </div>
        </div>
      ))}

      {/* AI Responses */}
      {blocks.map((block, i) => {
        if (block.type === "projects" && block.projects) {
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold mb-4 text-foreground">{block.title}</h2>

                <ProjectSlider
                  projects={block.projects}
                  currentIndex={currentProjectIndex}
                  onIndexChange={onProjectIndexChange}
                  onProjectSelect={onProjectSelect}
                />

                {block.summary && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (block.type === "experience" && block.experience) {
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold mb-4 text-foreground">{block.title}</h2>

                <ExperienceSlider
                  experiences={block.experience}
                  currentIndex={currentExperienceIndex}
                  onIndexChange={onExperienceIndexChange}
                  onExperienceSelect={onExperienceSelect}
                />

                {block.summary && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (block.type === "skills" && block.skills) {
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold mb-4 text-foreground">{block.title}</h2>
                <div className="space-y-4">
                  {block.skills.map((category, j) => (
                    <div key={j} className="animate-fadeInUp" style={{ animationDelay: `${j * 0.1}s` }}>
                      <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">{category.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, k) => (
                          <span key={k} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors duration-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {block.summary && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (block.type === "contact") {
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold mb-4 text-foreground">{block.title}</h2>
                {block.message && (
                  <p className="text-muted-foreground mb-6 leading-relaxed">{block.message}</p>
                )}

                {/* Contact Info */}
                {block.contactInfo && (
                  <div className="space-y-4 mb-6">
                    {block.contactInfo.map((contact, j) => (
                      <div key={j} className="flex items-center space-x-4 p-3 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                        <span className="text-2xl">{contact.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{contact.method}</h3>
                          <a
                            href={contact.link}
                            className="text-primary hover:text-primary/80 transition-colors"
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
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (block.type === "fallback") {
          // Fallback response for unrelated questions
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-400/10 dark:to-red-400/10 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-orange-200/20 dark:border-orange-400/20">
                <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                  🤔 {block.title || "That's not quite my area!"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{block.message}</p>

                {/* Usage limit notification */}
                {block.usageLimitReached && (
                  <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-200/30">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      🎭 {block.message}
                    </p>
                  </div>
                )}

                <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground italic">
                    💡 Try asking me about my work experience, projects, skills, or anything tech-related!
                  </p>
                </div>
              </div>
            </div>
          );
        } else {
          // General response with AI enhancement
          return (
            <div key={`response-${i}`} className="flex justify-start mb-6 animate-fadeInUp">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md max-w-4xl border border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                  {block.title}
                  {block.aiEnhanced && (
                    <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      AI Enhanced
                    </span>
                  )}
                  {block.usageLimitReached && (
                    <span className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                      Demo Mode
                    </span>
                  )}
                </h2>

                {/* Usage limit notification */}
                {block.usageLimitReached && (
                  <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-200/30">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      🎭 {block.message}
                    </p>
                  </div>
                )}

                {/* AI-enhanced content */}
                {block.aiContent && (
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-muted-foreground leading-relaxed">{block.aiContent}</p>
                  </div>
                )}

                {/* Original content */}
                <div className="space-y-4">
                  {block.items?.map((item, j) => (
                    <div key={j} className="animate-fadeInUp" style={{ animationDelay: `${j * 0.1}s` }}>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {block.summary && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-muted-foreground italic">{block.summary}</p>
                  </div>
                )}
              </div>
            </div>
          );
        }
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-start mb-4 animate-fadeInUp">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md text-card-foreground px-4 py-2 rounded-2xl rounded-bl-md border border-white/20 dark:border-white/10">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

