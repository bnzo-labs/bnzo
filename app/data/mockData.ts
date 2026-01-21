import { Block } from '../types';
import { SITE_TEXT } from '../constants/siteText';

export const getMockResponse = (currentQuestion: string): Block => {
    if (currentQuestion.toLowerCase().includes('project')) {
        // For V1, show work experience instead of projects
        return {
            type: "experience",
            title: SITE_TEXT.mockData.projectsTitle,
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
                    linkedinUrl: "https://www.linkedin.com/company/eltoncyber/",
                    screenshots: [
                        "https://placehold.co/800x600/1e293b/60a5fa?text=Diagram+Visualization",
                        "https://placehold.co/800x600/1e293b/60a5fa?text=Data+Grid+Feature",
                        "https://placehold.co/800x600/1e293b/60a5fa?text=Component+Library"
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/yard-management-software/",
                    screenshots: [
                        "https://placehold.co/800x600/1e293b/10b981?text=GPS+Tracking+Dashboard",
                        "https://placehold.co/800x600/1e293b/10b981?text=Yard+Visualization+Tool"
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/goember/",
                    screenshots: [
                        "https://placehold.co/800x600/1e293b/f59e0b?text=Passenger+Platform",
                        "https://placehold.co/800x600/1e293b/f59e0b?text=Payment+Integration"
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/contobox/",
                    screenshots: [
                        "https://placehold.co/800x600/1e293b/ec4899?text=Interactive+Ads",
                        "https://placehold.co/800x600/1e293b/ec4899?text=SaaS+Platform",
                        "https://placehold.co/800x600/1e293b/ec4899?text=Campaign+Manager"
                    ]
                },
            ],
            summary: SITE_TEXT.mockData.experienceSummary
        };
    } else if (currentQuestion.toLowerCase().includes('skill')) {
        return {
            type: "skills",
            title: SITE_TEXT.mockData.skillsTitle,
            skills: [
                {
                    category: SITE_TEXT.mockData.skillCategories.frontend,
                    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
                },
                {
                    category: SITE_TEXT.mockData.skillCategories.backend,
                    skills: ["Node.js", "Express", "Go", "Laravel", "PostgreSQL", "MongoDB"]
                },
                {
                    category: SITE_TEXT.mockData.skillCategories.tools,
                    skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"]
                },
                {
                    category: SITE_TEXT.mockData.skillCategories.languages,
                    skills: ["JavaScript", "TypeScript", "Go", "SQL", "HTML", "CSS"]
                }
            ],
            summary: SITE_TEXT.mockData.skillsSummary
        };
    } else if (currentQuestion.toLowerCase().includes('experience') || currentQuestion.toLowerCase().includes('work')) {
        return {
            type: "experience",
            title: SITE_TEXT.mockData.experienceTitle,
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
                    linkedinUrl: "https://www.linkedin.com/company/eltoncyber/",
                    screenshots: [
                        "/projects/elton.webp",
                        "/projects/elton.jpg"
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/yard-management-software/",
                    screenshots: [
                        "/projects/yms.jpg",
                        "/projects/yms-2.png"
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/goember/",
                    screenshots: [
                        "/projects/ember.jpg",
                    ]
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
                    linkedinUrl: "https://www.linkedin.com/company/contobox/",
                    screenshots: [
                        "/projects/contobox.png"
                    ]
                },
            ],
            summary: SITE_TEXT.mockData.experienceSummary
        };
    } else if (currentQuestion.toLowerCase().includes('contact')) {
        return {
            type: "contact",
            title: SITE_TEXT.mockData.contactTitle,
            message: SITE_TEXT.mockData.contactMessage,
            contactInfo: [
                {
                    method: SITE_TEXT.mockData.contactMethods.email,
                    value: "erick@bnzo.io",
                    icon: "📧",
                    link: "mailto:erick@bnzo.io"
                },
                {
                    method: SITE_TEXT.mockData.contactMethods.linkedin,
                    value: "linkedin.com/in/erickbenzo/",
                    icon: "💼",
                    link: "https://www.linkedin.com/in/erickbenzo/"
                },
                {
                    method: SITE_TEXT.mockData.contactMethods.github,
                    value: "github.com/benerick",
                    icon: "🐙",
                    link: "https://github.com/benerick"
                }
            ],
            summary: SITE_TEXT.mockData.contactSummary
        };
    } else {
        return {
            type: "general",
            title: SITE_TEXT.mockData.aboutMeTitle,
            items: [
                {
                    title: SITE_TEXT.mockData.aboutMeExperienceTitle,
                    text: SITE_TEXT.mockData.aboutMeExperienceText
                },
                {
                    title: SITE_TEXT.mockData.aboutMeEducationTitle,
                    text: SITE_TEXT.mockData.aboutMeEducationText
                },
                {
                    title: SITE_TEXT.mockData.aboutMePassionTitle,
                    text: SITE_TEXT.mockData.aboutMePassionText
                }
            ],
            summary: SITE_TEXT.mockData.aboutMeSummary
        };
    }
};

