/**
 * Site-wide text constants for internationalization
 * All static text should be defined here to enable AI-based translation
 */

export const SITE_TEXT = {
    // Main page - Hero section
    hero: {
        greeting: "Hi, I'm Erick.",
        title: "Frontend developer",
        subtitle: "Ask me anything about my work, projects, experience or tips below.",
        inputPlaceholder: "Ask me anything...",
        submitButton: "Ask",
        submitButtonLoading: "...",
    },

    // Game mode
    game: {
        exitButton: "Exit Game",
        playButton: "Play Mode",
        title: "🚀 Spaceship Game",
        instructions: "Move your mouse to steer the spaceship • Click to shoot • Destroy asteroids and aliens!",
        scoreLabel: "Score",
    },

    // Usage tracking
    usage: {
        demoMode: "🎭 Demo Mode",
        questionsRemaining: (count: number) => `🤖 ${count} AI questions left`,
        resetButton: "🔄 Reset",
        resetButtonTitle: "Reset usage (dev only)",
    },

    // Contact form
    contactForm: {
        title: "Get In Touch",
        subtitle: "Have a project in mind or just want to chat? I'd love to hear from you!",
        nameLabel: "Name *",
        namePlaceholder: "Your name",
        emailLabel: "Email *",
        emailPlaceholder: "your.email@domain.com",
        subjectLabel: "Subject *",
        subjectPlaceholder: "What's this about?",
        messageLabel: "Message *",
        messagePlaceholder: "Tell me about your project or just say hello...",
        sendButton: "Send Message",
        sendingButton: "Sending...",
        clearButton: "Clear",
        successTitle: "Message Sent Successfully!",
        successMessage: (name: string) => `Thank you for reaching out, ${name}! I'll get back to you as soon as possible.`,
        sendAnotherButton: "Send Another Message",
        directContactLabel: "Or reach out directly:",
        email: "erick@bnzo.io",
        linkedinLabel: "LinkedIn",
    },

    // Project modal
    projectModal: {
        techStackLabel: "Tech Stack",
        viewDemo: "View Demo",
        viewCode: "View Code",
        closeButton: "Close",
    },

    // Experience modal
    experienceModal: {
        aboutRole: "About This Role",
        keyAchievements: "Key Achievements",
        technologiesUsed: "Technologies Used",
        visitCompany: "Visit Company",
        linkedin: "LinkedIn",
        closeButton: "Close",
    },

    // Chat interface
    chat: {
        thinking: "Thinking...",
        aiEnhanced: "✨ AI Enhanced",
        demoMode: "🎭 Demo Mode",
        fallbackTitle: "That's not quite my area!",
        fallbackSuggestion: "💡 Try asking me about my work experience, projects, skills, or anything tech-related!",
    },

    // Quick questions
    quickQuestions: [
        { label: "Me", question: "tell me about yourself", emoji: "👋" },
        { label: "My skills", question: "tell me about your skills", emoji: "💻" },
        { label: "Experience", question: "tell me about your work experience", emoji: "💼" },
        { label: "Fun", question: "what do you do for fun", emoji: "🎉" },
        { label: "Contact", question: "how can I contact you", emoji: "📧" }
    ],

    // Mock data responses
    mockData: {
        projectsTitle: "My Work Experience & Projects",
        skillsTitle: "My Technical Skills",
        experienceTitle: "My Work Experience",
        contactTitle: "Let's Connect!",
        contactMessage: "I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to chat about technology, feel free to reach out.",
        contactSummary: "I'm always excited to connect with fellow developers, potential clients, or anyone interested in technology. Don't hesitate to drop me a line!",
        aboutMeTitle: "About Me",
        aboutMeExperienceTitle: "Experience",
        aboutMeExperienceText: "5+ years of experience in web development, specializing in modern JavaScript frameworks and full-stack applications.",
        aboutMeEducationTitle: "Education",
        aboutMeEducationText: "Computer Science degree with focus on software engineering and user experience design.",
        aboutMePassionTitle: "Passion",
        aboutMePassionText: "I love creating intuitive, accessible web experiences that solve real-world problems.",
        aboutMeSummary: "I'm a passionate developer who loves building things that matter. Whether it's a simple website or a complex application, I approach every project with enthusiasm and attention to detail.",
        skillsSummary: "I'm passionate about creating beautiful, performant web applications. My skill set spans the full development stack, allowing me to build complete solutions from concept to deployment.",
        experienceSummary: "My experience spans from creative ad tech to enterprise SaaS and platform rebuilds, giving me a strong foundation in building interactive user experiences, scalable front-end architectures, and data-driven features. I've led teams, contributed hands-on to complex systems, and consistently delivered results that improved performance, usability, and maintainability while growing as both a developer and collaborator.",
        contactMethods: {
            email: "Email",
            linkedin: "LinkedIn",
            github: "GitHub",
        },
        skillCategories: {
            frontend: "Frontend",
            backend: "Backend",
            tools: "Tools & DevOps",
            languages: "Languages",
        }
    },

    // Meta tags
    meta: {
        title: "Erick - Fullstack developer",
        description: "Fullstack developer - Ask me anything about my work, projects, experience or tips",
    }
} as const;

