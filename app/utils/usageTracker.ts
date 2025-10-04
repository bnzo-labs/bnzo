// Usage tracking utilities for localStorage persistence

const USAGE_KEY = 'erick_portfolio_ai_usage';
const MAX_QUESTIONS = 5;

export interface UsageData {
    questionsAsked: number;
    lastReset?: number;
}

export const usageTracker = {
    // Get current usage data from localStorage
    getUsage(): UsageData {
        if (typeof window === 'undefined') {
            return { questionsAsked: 0 };
        }

        try {
            const stored = localStorage.getItem(USAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored) as UsageData;
                return data;
            }
        } catch (error) {
            console.error('Error reading usage data from localStorage:', error);
        }

        return { questionsAsked: 0 };
    },

    // Increment usage count
    incrementUsage(): UsageData {
        const current = this.getUsage();
        const newData: UsageData = {
            ...current,
            questionsAsked: current.questionsAsked + 1,
            lastReset: current.lastReset || Date.now()
        };

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(USAGE_KEY, JSON.stringify(newData));
            } catch (error) {
                console.error('Error saving usage data to localStorage:', error);
            }
        }

        return newData;
    },

    // Check if limit is reached
    isLimitReached(): boolean {
        const usage = this.getUsage();
        return usage.questionsAsked >= MAX_QUESTIONS;
    },

    // Get remaining questions count
    getRemainingQuestions(): number {
        const usage = this.getUsage();
        return Math.max(0, MAX_QUESTIONS - usage.questionsAsked);
    },

    // Reset usage (for admin/testing purposes)
    resetUsage(): void {
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem(USAGE_KEY);
            } catch (error) {
                console.error('Error resetting usage data:', error);
            }
        }
    },

    // Get usage status for display
    getUsageStatus(): {
        questionsAsked: number;
        remaining: number;
        isLimitReached: boolean;
        maxQuestions: number;
    } {
        const usage = this.getUsage();
        return {
            questionsAsked: usage.questionsAsked,
            remaining: this.getRemainingQuestions(),
            isLimitReached: this.isLimitReached(),
            maxQuestions: MAX_QUESTIONS
        };
    }
};
