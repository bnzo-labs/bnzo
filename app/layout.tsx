import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ReduxProvider } from "./components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erick - Software Engineer",
  description: "Software Engineer / Frontend Developer - Ask me anything about my work, projects, experience or tips",
  icons: {
    icon: [
      { url: '/logo.webp', sizes: 'any', type: 'image/webp' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/logo.webp', sizes: '180x180', type: 'image/webp' }
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <div className="relative">
              {children}
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
