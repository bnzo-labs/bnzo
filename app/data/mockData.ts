import { Block, QuickQuestion } from '../types';

export const quickQuestions: QuickQuestion[] = [
    { label: "Me", question: "tell me about yourself", emoji: "👋" },
    { label: "My skills", question: "tell me about your skills", emoji: "💻" },
    { label: "Experience", question: "tell me about your work experience", emoji: "💼" },
    // { label: "My projects", question: "tell me about your recent projects", emoji: "🚀" }, // Hidden for V1
    { label: "Fun", question: "what do you do for fun", emoji: "🎉" },
    { label: "Contact", question: "how can I contact you", emoji: "📧" }
];

export const getMockResponse = (currentQuestion: string): Block => {
    if (currentQuestion.toLowerCase().includes('project')) {
        // For V1, show work experience instead of projects
        return {
            type: "experience",
            title: "My Work Experience & Projects",
            experience: [
                {
                    company: "Elton Cyber",
                    position: "Senior Frontend Developer",
                    duration: "Jan 2025 - Jun 2025",
                    description: "Contributed to the rebuild of a cybersecurity platform using React and TypeScript, focusing on performance, architecture, and maintainability. Led the development of advanced visualization and data-heavy features, while improving component reusability and ensuring high-quality code through test-driven practices and close backend collaboration.",
                    tech: ["React", "Redux", "CSS", "Node.js", "TypeScript", "Jest", "Figma", "JointJS", "AG Grid"],
                    achievements: [
                        "Led development of a diagram visualization feature with JointJS, enabling dynamic, interactive rendering of cybersecurity entities and relationships.",
                        "Implemented high- performance data grids with AG Grid, supporting large datasets with advanced filtering and sorting capabilities.",
                        "Contributed to a shared React component library, standardizing UI elements and improving code reuse and consistency across the platform.",
                    ],
                    companyUrl: "https://www.eltoncyber.com/Platform",
                    linkedinUrl: "https://www.linkedin.com/company/eltoncyber/"
                },
                {
                    company: "Yard Management Solutions",
                    position: "Senior Software Engineer",
                    duration: "2021 - 2024",
                    description: "Led front-end modernization and feature development for a logistics platform, migrating legacy systems to a scalable React component-based architecture. Designed real-time tracking and interactive yard visualization tools that improved operational visibility and streamlined complex workflows. Collaborated across teams to deliver reliable, test-driven solutions and seamless frontend–backend integrations.",
                    tech: ["JQuery", "React", "Redux", "CSS", "Laravel", "Docker"],
                    achievements: [
                        "Migrated a legacy jQuery application to a modern React component - based architecture, significantly improving maintainability and scalability.",
                        "Designed and delivered a real - time GPS tracking system for trucks across multiple facilities, enhancing dispatch visibility and decision- making.",
                        "Optimized the SVG-based yard visualization tool, adding interactivity (drag-and-drop, zoom, live updates) and reducing loading time by 80%, greatly improving operator efficiency.",
                    ],
                    companyUrl: "https://yardmanagementsoftware.com/",
                    linkedinUrl: "https://www.linkedin.com/company/yard-management-software/"
                },
                {
                    company: "Goember Inc",
                    position: "Head Developer",
                    duration: "2019 - 2025",
                    description: "Co-founded and served as Head Developer for a smart in-car entertainment and payments platform for taxis. Led development across web, mobile, and backend systems, delivering location-based content, seamless payment experiences, and real-time dispatch integrations. Oversaw architecture and cross-functional planning to ensure scalability, reliability, and consistent rider-facing experiences.",
                    tech: ["React", "Redux", "Node.js", "GraphQL", "Stripe", "AWS", "Google Cloud", "Swift"],
                    achievements: [
                        "Designed and launched a location - based content platform for taxi passengers, enhancing the rider experience with curated, dynamic entertainment.",
                        "Built a secure in-vehicle payment solution using Stripe, Node.js, and Google Cloud, enabling seamless ride transactions.",
                        "Integrated with leading dispatch systems(iCabbi, zTrip) to support real- time ride coordination and fare processing at scale.",
                    ],
                    companyUrl: "https://www.goember.com",
                    linkedinUrl: "https://www.linkedin.com/company/goember/"
                },
                {
                    company: "Contobox",
                    position: "Frontend Developer | Lead Developer",
                    duration: "2015 - 2021",
                    description: "Developed interactive ad experiences with JavaScript, CSS, and PHP, and created a user tracking system that powered the company's retargeting engine. Led front-end development of a React-based SaaS platform for managing ad campaigns at scale, collaborating across teams to deliver reusable, accessible components and drive best practices that improved code quality and development speed.",
                    tech: ["React", "Javascript", "CSS", "Jest", "Photoshop", "HTML", "PHP", "AgGrid"],
                    achievements: [
                        "Built 100+ interactive and highly engaging ads, including in-ad purchases, mini games, and dynamic video experiences, driving stronger user engagement and campaign performance.",
                        "Developed and integrated a user interest tracking system that became a cornerstone of the company's ad retargeting engine, improving targeting accuracy and client ROI.",
                        "Led the front - end development of a React - based SaaS platform, enabling clients to manage and deliver digital ad campaigns at scale while improving delivery velocity and maintainability."
                    ],
                    companyUrl: "https://www.contobox.com",
                    linkedinUrl: "https://www.linkedin.com/company/contobox/"
                },
            ],
            summary: "My experience spans from creative ad tech to enterprise SaaS and platform rebuilds, giving me a strong foundation in building interactive user experiences, scalable front-end architectures, and data-driven features. I've led teams, contributed hands-on to complex systems, and consistently delivered results that improved performance, usability, and maintainability while growing as both a developer and collaborator."
        };
    } else if (currentQuestion.toLowerCase().includes('skill')) {
        return {
            type: "skills",
            title: "My Technical Skills",
            skills: [
                {
                    category: "Frontend",
                    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
                },
                {
                    category: "Backend",
                    skills: ["Node.js", "Express", "Go", "Laravel", "PostgreSQL", "MongoDB"]
                },
                {
                    category: "Tools & DevOps",
                    skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"]
                },
                {
                    category: "Languages",
                    skills: ["JavaScript", "TypeScript", "Go", "SQL", "HTML", "CSS"]
                }
            ],
            summary: "I'm passionate about creating beautiful, performant web applications. My skill set spans the full development stack, allowing me to build complete solutions from concept to deployment."
        };
    } else if (currentQuestion.toLowerCase().includes('experience') || currentQuestion.toLowerCase().includes('work')) {
        return {
            type: "experience",
            title: "My Work Experience",
            experience: [
                {
                    company: "Elton Cyber",
                    position: "Senior Frontend Developer",
                    duration: "Jan 2025 - Jun 2025",
                    description: "Contributed to the rebuild of a cybersecurity platform using React and TypeScript, focusing on performance, architecture, and maintainability. Led the development of advanced visualization and data-heavy features, while improving component reusability and ensuring high-quality code through test-driven practices and close backend collaboration.",
                    tech: ["React", "Redux", "CSS", "Node.js", "TypeScript", "Jest", "Figma", "JointJS", "AG Grid"],
                    achievements: [
                        "Led development of a diagram visualization feature with JointJS, enabling dynamic, interactive rendering of cybersecurity entities and relationships.",
                        "Implemented high- performance data grids with AG Grid, supporting large datasets with advanced filtering and sorting capabilities.",
                        "Contributed to a shared React component library, standardizing UI elements and improving code reuse and consistency across the platform.",
                    ],
                    companyUrl: "https://www.eltoncyber.com/Platform",
                    linkedinUrl: "https://www.linkedin.com/company/eltoncyber/"
                },
                {
                    company: "Yard Management Solutions",
                    position: "Senior Software Engineer",
                    duration: "2021 - 2024",
                    description: "Led front-end modernization and feature development for a logistics platform, migrating legacy systems to a scalable React component-based architecture. Designed real-time tracking and interactive yard visualization tools that improved operational visibility and streamlined complex workflows. Collaborated across teams to deliver reliable, test-driven solutions and seamless frontend–backend integrations.",
                    tech: ["JQuery", "React", "Redux", "CSS", "Laravel", "Docker"],
                    achievements: [
                        "Migrated a legacy jQuery application to a modern React component - based architecture, significantly improving maintainability and scalability.",
                        "Designed and delivered a real - time GPS tracking system for trucks across multiple facilities, enhancing dispatch visibility and decision- making.",
                        "Optimized the SVG-based yard visualization tool, adding interactivity (drag-and-drop, zoom, live updates) and reducing loading time by 80%, greatly improving operator efficiency.",
                    ],
                    companyUrl: "https://yardmanagementsoftware.com/",
                    linkedinUrl: "https://www.linkedin.com/company/yard-management-software/"
                },
                {
                    company: "Goember Inc",
                    position: "Head Developer",
                    duration: "2019 - 2025",
                    description: "Co-founded and served as Head Developer for a smart in-car entertainment and payments platform for taxis. Led development across web, mobile, and backend systems, delivering location-based content, seamless payment experiences, and real-time dispatch integrations. Oversaw architecture and cross-functional planning to ensure scalability, reliability, and consistent rider-facing experiences.",
                    tech: ["React", "Redux", "Node.js", "GraphQL", "Stripe", "AWS", "Google Cloud", "Swift"],
                    achievements: [
                        "Designed and launched a location - based content platform for taxi passengers, enhancing the rider experience with curated, dynamic entertainment.",
                        "Built a secure in-vehicle payment solution using Stripe, Node.js, and Google Cloud, enabling seamless ride transactions.",
                        "Integrated with leading dispatch systems(iCabbi, zTrip) to support real- time ride coordination and fare processing at scale.",
                    ],
                    companyUrl: "https://www.goember.com",
                    linkedinUrl: "https://www.linkedin.com/company/goember/"
                },
                {
                    company: "Contobox",
                    position: "Frontend Developer | Lead Developer",
                    duration: "2015 - 2021",
                    description: "Developed interactive ad experiences with JavaScript, CSS, and PHP, and created a user tracking system that powered the company’s retargeting engine. Led front-end development of a React-based SaaS platform for managing ad campaigns at scale, collaborating across teams to deliver reusable, accessible components and drive best practices that improved code quality and development speed.",
                    tech: ["React", "Javascript", "CSS", "Jest", "Photoshop", "HTML", "PHP", "AgGrid"],
                    achievements: [
                        "Built 100+ interactive and highly engaging ads, including in-ad purchases, mini games, and dynamic video experiences, driving stronger user engagement and campaign performance.",
                        "Developed and integrated a user interest tracking system that became a cornerstone of the company’s ad retargeting engine, improving targeting accuracy and client ROI.",
                        "Led the front - end development of a React - based SaaS platform, enabling clients to manage and deliver digital ad campaigns at scale while improving delivery velocity and maintainability."
                    ],
                    companyUrl: "https://www.contobox.com",
                    linkedinUrl: "https://www.linkedin.com/company/contobox/"
                },
            ],
            summary: "My experience spans from creative ad tech to enterprise SaaS and platform rebuilds, giving me a strong foundation in building interactive user experiences, scalable front-end architectures, and data-driven features. I’ve led teams, contributed hands-on to complex systems, and consistently delivered results that improved performance, usability, and maintainability while growing as both a developer and collaborator."
        };
    } else if (currentQuestion.toLowerCase().includes('contact')) {
        return {
            type: "contact",
            title: "Let's Connect!",
            message: "I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to chat about technology, feel free to reach out.",
            contactInfo: [
                {
                    method: "Email",
                    value: "erick@bnzo.io",
                    icon: "📧",
                    link: "mailto:erick@bnzo.io"
                },
                {
                    method: "LinkedIn",
                    value: "linkedin.com/in/erickbenzo/",
                    icon: "💼",
                    link: "https://www.linkedin.com/in/erickbenzo/"
                },
                {
                    method: "GitHub",
                    value: "github.com/benerick",
                    icon: "🐙",
                    link: "https://github.com/benerick"
                }
            ],
            summary: "I'm always excited to connect with fellow developers, potential clients, or anyone interested in technology. Don't hesitate to drop me a line!"
        };
    } else {
        return {
            type: "general",
            title: "About Me",
            items: [
                {
                    title: "Experience",
                    text: "5+ years of experience in web development, specializing in modern JavaScript frameworks and full-stack applications."
                },
                {
                    title: "Education",
                    text: "Computer Science degree with focus on software engineering and user experience design."
                },
                {
                    title: "Passion",
                    text: "I love creating intuitive, accessible web experiences that solve real-world problems."
                }
            ],
            summary: "I'm a passionate developer who loves building things that matter. Whether it's a simple website or a complex application, I approach every project with enthusiasm and attention to detail."
        };
    }
};

