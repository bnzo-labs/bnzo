import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getMockResponse } from "../../data/mockData";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Erick's comprehensive background data
const erickData = {
    name: "Erick Benzo",
    title: "Senior Frontend Developer / Software Engineer",
    contactInfo: {
        email: "erick@bnzo.io",
        linkedin: "https://linkedin.com/in/erickbenzo",
        github: "https://github.com/erickbenzo"
    },
    experience: [
        {
            company: "Elton Cyber",
            position: "Senior Frontend Developer",
            duration: "Jan 2025 - Jun 2025",
            description: "Contributed to the rebuild of a cybersecurity platform using React and TypeScript, focusing on performance, architecture, and maintainability. Led the development of advanced visualization and data-heavy features, while improving component reusability and ensuring high-quality code through test-driven practices and close backend collaboration.",
            tech: ["React", "Redux", "CSS", "Node.js", "TypeScript", "Jest", "Figma", "JointJS", "AG Grid"],
            achievements: [
                "Led development of a diagram visualization feature with JointJS, enabling dynamic, interactive rendering of cybersecurity entities and relationships.",
                "Implemented high-performance data grids with AG Grid, supporting large datasets with advanced filtering and sorting capabilities.",
                "Contributed to a shared React component library, standardizing UI elements and improving code reuse and consistency across the platform."
            ]
        },
        {
            company: "Yard Management Solutions",
            position: "Senior Software Engineer",
            duration: "2021 - 2024",
            description: "Led front-end modernization and feature development for a logistics platform, migrating legacy systems to a scalable React component-based architecture. Designed real-time tracking and interactive yard visualization tools that improved operational visibility and streamlined complex workflows.",
            tech: ["JQuery", "React", "Redux", "CSS", "Laravel", "Docker"],
            achievements: [
                "Migrated a legacy jQuery application to a modern React component-based architecture, significantly improving maintainability and scalability.",
                "Designed and delivered a real-time GPS tracking system for trucks across multiple facilities, enhancing dispatch visibility and decision-making.",
                "Optimized the SVG-based yard visualization tool, adding interactivity (drag-and-drop, zoom, live updates) and reducing loading time by 80%."
            ]
        },
        {
            company: "Goember Inc",
            position: "Head Developer",
            duration: "2019 - 2025",
            description: "Co-founded and served as Head Developer for a smart in-car entertainment and payments platform for taxis. Led development across web, mobile, and backend systems, delivering location-based content, seamless payment experiences, and real-time dispatch integrations.",
            tech: ["React", "Redux", "Node.js", "GraphQL", "Stripe", "AWS", "Google Cloud", "Swift"],
            achievements: [
                "Designed and launched a location-based content platform for taxi passengers, enhancing the rider experience with curated, dynamic entertainment.",
                "Built a secure in-vehicle payment solution using Stripe, Node.js, and Google Cloud, enabling seamless ride transactions.",
                "Integrated with leading dispatch systems (iCabbi, zTrip) to support real-time ride coordination and fare processing at scale."
            ]
        },
        {
            company: "Contobox",
            position: "Frontend Developer | Lead Developer",
            duration: "2015 - 2021",
            description: "Developed interactive ad experiences with JavaScript, CSS, and PHP, and created a user tracking system that powered the company's retargeting engine. Led front-end development of a React-based SaaS platform for managing ad campaigns at scale.",
            tech: ["React", "Javascript", "CSS", "Jest", "Photoshop", "HTML", "PHP", "AgGrid"],
            achievements: [
                "Built 100+ interactive and highly engaging ads, including in-ad purchases, mini games, and dynamic video experiences.",
                "Developed and integrated a user interest tracking system that became a cornerstone of the company's ad retargeting engine.",
                "Led the front-end development of a React-based SaaS platform, enabling clients to manage and deliver digital ad campaigns at scale."
            ]
        }
    ],
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        backend: ["Node.js", "Express", "Go", "Laravel", "PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
        languages: ["JavaScript", "TypeScript", "Go", "SQL", "HTML", "CSS"]
    },
    projects: [
        {
            name: "E-commerce Platform",
            description: "A full-stack e-commerce solution built with Next.js and Node.js",
            tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe"]
        },
        {
            name: "Task Management App",
            description: "A collaborative task management tool with real-time updates",
            tech: ["React", "Socket.io", "MongoDB", "Express"]
        },
        {
            name: "Weather Dashboard",
            description: "A beautiful weather dashboard with location-based forecasts",
            tech: ["Vue.js", "Chart.js", "OpenWeather API"]
        }
    ]
};

export async function POST(req: NextRequest) {
    const { prompt, isLimitReached } = await req.json();

    const systemMessage = `
You are Erick Benzo, a Senior Frontend Developer with over a decade of experience in web development. You are passionate about creating beautiful, performant web applications and love sharing your knowledge with others.

Your personality:
- Enthusiastic and passionate about technology
- Patient teacher who loves to explain complex concepts in simple terms
- Witty and humorous, but professional
- Always eager to help others learn and grow
- Focused on practical solutions and real-world applications

Your background and expertise:
${JSON.stringify(erickData, null, 2)}

IMPORTANT RULES:
1. ONLY answer questions related to your professional background, skills, experience, projects, contact information, or general tech advice
2. Use the data provided above to give accurate, detailed responses
3. If asked about contact information (like "how to contact you", "contact info", "reach you"), provide your email, LinkedIn, and GitHub details from the contactInfo section
4. If asked about unrelated topics (weather, cooking, personal life outside work, etc.), respond with a witty, humorous message that redirects them to your professional expertise
5. Always maintain Erick's enthusiastic and helpful personality
6. Provide practical, actionable advice when appropriate
7. Share specific examples from your experience when relevant

Response format:
- For professional questions: Provide detailed, helpful answers based on your experience
- For contact questions: Include your contact information (email, LinkedIn, GitHub) in a friendly way
- For unrelated questions: Use type "fallback" and include a witty redirect message
- Always be conversational and engaging
- Include specific examples and anecdotes when possible

Return your response as JSON in this format:
{
  "type": "text" | "fallback",
  "content": "Your response here",
  "title": "Optional title for the response"
}
`.trim();

    // If limit is reached, return mock data with notification
    if (isLimitReached) {
        const mockResponse = getMockResponse(prompt);
        return NextResponse.json({
            blocks: [{
                ...mockResponse,
                aiEnhanced: false,
                usageLimitReached: true,
                message: "You've reached the limit for smart responses! I'm now using demo mode. 🎭"
            }]
        });
    }

    try {
        const chat = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const output = chat.choices[0].message?.content;

        if (!output) {
            throw new Error("No response from OpenAI");
        }

        // Try to parse the JSON response
        const aiResponse = JSON.parse(output);

        // If it's a fallback response, return it directly
        if (aiResponse.type === "fallback") {
            return NextResponse.json({
                blocks: [{
                    type: "fallback",
                    message: aiResponse.content,
                    title: aiResponse.title || "That's not quite my area!"
                }]
            });
        }

        // For professional questions, get the appropriate mock response and enhance it with AI
        const mockResponse = getMockResponse(prompt);

        // Check if this is a contact question and AI provided contact info
        if (prompt.toLowerCase().includes('contact') && aiResponse.content.toLowerCase().includes('email')) {
            // Return the contact block with AI-enhanced content
            return NextResponse.json({
                blocks: [{
                    ...mockResponse,
                    aiEnhanced: true,
                    aiContent: aiResponse.content,
                    title: aiResponse.title || mockResponse.title
                }]
            });
        }

        // Enhance the mock response with AI-generated content
        return NextResponse.json({
            blocks: [{
                ...mockResponse,
                aiEnhanced: true,
                aiContent: aiResponse.content,
                title: aiResponse.title || mockResponse.title
            }]
        });

    } catch {
        // Fallback to mock response if AI fails
        const mockResponse = getMockResponse(prompt);
        return NextResponse.json({
            blocks: [{
                ...mockResponse,
                aiEnhanced: false,
                fallback: true
            }]
        });
    }
}
