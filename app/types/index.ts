export interface Project {
    name: string;
    description: string;
    tech: string[];
    link?: string;
    image?: string;
    github?: string;
    demo?: string;
    screenshot?: string;
}

export interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string;
    tech: string[];
    achievements: string[];
    companyUrl?: string;
    linkedinUrl?: string;
    screenshots?: string[];
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface Block {
    type: string;
    title?: string;
    message?: string;
    items?: { title: string; text: string; date?: string }[];
    projects?: Project[];
    experience?: Experience[];
    skills?: SkillCategory[];
    contactInfo?: ContactInfo[];
    summary?: string;
    // AI enhancement properties
    aiEnhanced?: boolean;
    aiContent?: string;
    fallback?: boolean;
    // Usage tracking properties
    usageLimitReached?: boolean;
    remainingQuestions?: number;
}

export interface QuickQuestion {
    label: string;
    question: string;
    emoji: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactInfo {
    method: string;
    value: string;
    icon: string;
    link: string;
}

