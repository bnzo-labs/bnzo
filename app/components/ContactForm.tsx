'use client';

import { useState } from 'react';
import { SITE_TEXT } from '../constants/siteText';

interface ContactFormProps {
    onSubmit: (formData: ContactFormData) => void;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            onSubmit(formData);
            setIsSubmitted(true);
            setIsSubmitting(false);
        }, 1500);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <div className="bg-card text-card-foreground px-6 py-8 rounded-2xl border border-border max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{SITE_TEXT.contactForm.successTitle}</h3>
                    <p className="text-muted-foreground mb-6">
                        {SITE_TEXT.contactForm.successMessage(formData.name)}
                    </p>
                    <button
                        onClick={resetForm}
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-200"
                    >
                        {SITE_TEXT.contactForm.sendAnotherButton}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card text-card-foreground px-4 py-6 rounded-2xl border border-border max-w-2xl mx-auto">
            <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">{SITE_TEXT.contactForm.title}</h3>
                <p className="text-muted-foreground text-sm">
                    {SITE_TEXT.contactForm.subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                            {SITE_TEXT.contactForm.nameLabel}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
                            placeholder={SITE_TEXT.contactForm.namePlaceholder}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            {SITE_TEXT.contactForm.emailLabel}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
                            placeholder={SITE_TEXT.contactForm.emailPlaceholder}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                        {SITE_TEXT.contactForm.subjectLabel}
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
                        placeholder={SITE_TEXT.contactForm.subjectPlaceholder}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                        {SITE_TEXT.contactForm.messageLabel}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 resize-none text-sm"
                        placeholder={SITE_TEXT.contactForm.messagePlaceholder}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                                {SITE_TEXT.contactForm.sendingButton}
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                {SITE_TEXT.contactForm.sendButton}
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-border hover:bg-muted text-foreground rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                        {SITE_TEXT.contactForm.clearButton}
                    </button>
                </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{SITE_TEXT.contactForm.directContactLabel}</p>
                    <div className="flex justify-center gap-3">
                        <a
                            href={`mailto:${SITE_TEXT.contactForm.email}`}
                            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {SITE_TEXT.contactForm.email}
                        </a>
                        <a
                            href="https://linkedin.com/in/erick"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            {SITE_TEXT.contactForm.linkedinLabel}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
