'use client';

import { quickQuestions } from '../data/mockData';

interface QuickQuestionsProps {
  onQuestionSelect: (question: string) => void;
  loading: boolean;
}

export function QuickQuestions({ onQuestionSelect, loading }: QuickQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {quickQuestions.map((pill) => (
        <button
          key={pill.label}
          onClick={() => onQuestionSelect(pill.question)}
          disabled={loading}
          className="px-4 py-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 text-foreground text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">{pill.emoji}</span>
          {pill.label}
        </button>
      ))}
    </div>
  );
}

