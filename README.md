# Erick Benzo - Interactive Portfolio

This is an interactive portfolio website built with [Next.js](https://nextjs.org) that features an AI-powered chat interface. The AI is trained to respond as Erick Benzo, a Senior Frontend Developer, using his actual professional data and experience.

## Features (V1)

- 🤖 **AI-Powered Chat Interface**: Ask questions about Erick's work, experience, and skills
- 💼 **Work Experience Showcase**: Detailed professional background and achievements
- 🎮 **Interactive Game Mode**: Fun spaceship game with scoring system
- 🌙 **Dark/Light Theme Toggle**: Beautiful theme switching
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion
- 🔄 **Real-time Responses**: AI responds with Erick's personality and expertise
- 📧 **Contact Information**: Direct contact details and social links

## AI Integration

The portfolio includes a sophisticated AI system that:
- Responds as Erick using his actual professional background
- Provides detailed answers about work experience, skills, and projects
- Gives witty responses to unrelated questions
- Maintains Erick's enthusiastic and helpful personality
- **Usage Limit**: Automatically switches to demo mode after 5 AI questions to control costs
- Falls back to mock data if AI is unavailable or limit is reached

### Usage Limits & Cost Control

To manage OpenAI API costs, the system includes:
- **5 Question Limit**: Users get 5 AI-enhanced responses per browser session
- **Persistent Tracking**: Uses localStorage to remember usage across page refreshes
- **Visual Indicators**: Shows remaining AI questions and demo mode status
- **Graceful Degradation**: Seamlessly switches to mock data after limit
- **User Notifications**: Clear messaging about usage limits and demo mode
- **Reset Required**: Users must clear browser data to get more AI questions

## Setup

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

You can get an OpenAI API key from: https://platform.openai.com/api-keys

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usage Limit Behavior

The system automatically manages OpenAI API usage:

1. **First 5 Questions**: Full AI responses with Erick's personality
2. **Question 6+**: Demo mode using mock data with clear notifications
3. **Persistent Tracking**: Usage stored in browser localStorage
4. **Visual Feedback**: 
   - Green indicator: 3+ AI questions remaining
   - Yellow indicator: 1-2 AI questions remaining  
   - Orange indicator: Demo mode active
5. **Reset Behavior**: Users must clear browser data to reset usage
6. **Development Mode**: Reset button available for testing

### Testing Usage Limits

A test page is included to verify localStorage persistence:
- Open `test-localstorage.html` in your browser
- Simulate questions to test the tracking system
- Verify that usage persists across page refreshes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
