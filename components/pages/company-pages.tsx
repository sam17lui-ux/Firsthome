"use client";

import React from "react"

import { ArrowLeft, Mail, MessageCircle, Home, Heart, Users, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { useState } from "react";

interface PageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

// =====================
// ABOUT US PAGE
// =====================
export function AboutPage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">About FirstHome</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              FirstHome was created by people who have been through the confusing, stressful, 
              and often overwhelming process of buying their first home. We know how it feels 
              to be bombarded with jargon, unsure of what comes next, and worried about making 
              expensive mistakes.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            We believe everyone deserves to understand the homebuying process without needing 
            a law degree or a finance background. Our mission is simple: to demystify buying 
            your first home and give you the confidence to navigate every step of the journey.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Plain English</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No confusing jargon or industry speak. We explain everything in terms 
                anyone can understand.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Independent Advice</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We're not trying to sell you anything. Our guidance is free, impartial, 
                and always in your best interest.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">By First-Time Buyers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We've been in your shoes. Our team has first-hand experience of the 
                challenges you're facing.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Always Free</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                FirstHome will always be free to use. We believe access to good 
                information shouldn't cost extra.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Our Story</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            FirstHome started in 2024 when our founder spent 6 months buying their first 
            flat and documented everything they learned along the way. What started as 
            personal notes became a resource for friends, and eventually grew into this 
            platform.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Today, FirstHome helps thousands of first-time buyers across the UK navigate 
            their way to homeownership with confidence.
          </p>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// CONTACT PAGE
// =====================
export function ContactPage({ onBack, onNavigate }: PageProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-slate-400 mb-8">
          Got a question or feedback? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-slate-400 text-sm">hello@firsthome.co.uk</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We aim to respond to all emails within 2 working days.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Social Media</h3>
                  <p className="text-slate-400 text-sm">@firsthomeuk</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Follow us on social media for tips, news, and updates.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Message Sent</h3>
                <p className="text-slate-400">
                  Thanks for getting in touch. We'll reply as soon as we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="mt-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-300">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help?"
                    rows={4}
                    className="mt-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white h-11 rounded-xl"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// PRIVACY POLICY PAGE
// =====================
export function PrivacyPolicyPage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
            <p className="leading-relaxed">
              FirstHome ("we", "our", "us") is committed to protecting your privacy. This policy 
              explains how we collect, use, and protect your personal information when you use 
              our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
            <p className="leading-relaxed mb-3">We may collect the following information:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Account information (name, email address) when you create an account</li>
              <li>Progress data and notes you save within the platform</li>
              <li>Usage data about how you interact with our services</li>
              <li>Technical data such as browser type and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Provide and improve our services</li>
              <li>Save your progress and personalise your experience</li>
              <li>Send important updates about our service</li>
              <li>Analyse usage patterns to improve the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate security measures to protect your personal information. 
              Your data is encrypted in transit and at rest, and we regularly review our 
              security practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
            <p className="leading-relaxed mb-3">Under UK data protection law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this privacy policy or your data, please contact us 
              at privacy@firsthome.co.uk.
            </p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// TERMS OF SERVICE PAGE
// =====================
export function TermsOfServicePage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using FirstHome, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p className="leading-relaxed">
              FirstHome provides educational resources and tools to help first-time homebuyers 
              understand and navigate the property purchasing process. Our service is for 
              informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Not Professional Advice</h2>
            <p className="leading-relaxed">
              The information provided on FirstHome does not constitute financial, legal, or 
              professional advice. Always consult qualified professionals (such as mortgage 
              advisers, solicitors, and surveyors) for advice specific to your situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. User Accounts</h2>
            <p className="leading-relaxed">
              When you create an account, you are responsible for maintaining the confidentiality 
              of your login credentials and for all activities under your account. You must 
              notify us immediately of any unauthorised use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p className="leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              FirstHome is provided "as is" without warranties of any kind. We are not liable 
              for any damages arising from your use of the service or reliance on information 
              provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these terms from time to time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// COOKIE POLICY PAGE
// =====================
export function CookiePolicyPage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. 
              They help websites remember your preferences and understand how you use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Cookies</h2>
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2">Essential Cookies</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Required for the website to function. They enable core features like 
                  security, account login, and saving your progress.
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2">Analytics Cookies</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Help us understand how visitors use our site so we can improve it. 
                  This data is anonymised and aggregated.
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2">Preference Cookies</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Remember your settings and preferences to provide a more personalised 
                  experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
            <p className="leading-relaxed">
              You can control cookies through your browser settings. Note that disabling 
              certain cookies may affect the functionality of our service. Most browsers 
              allow you to refuse cookies or delete existing ones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p className="leading-relaxed">
              For questions about our cookie policy, contact us at privacy@firsthome.co.uk.
            </p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// =====================
// ACCESSIBILITY PAGE
// =====================
export function AccessibilityPage({ onBack, onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Accessibility Statement</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Our Commitment</h2>
            <p className="leading-relaxed">
              FirstHome is committed to ensuring digital accessibility for people with 
              disabilities. We continually improve the user experience for everyone and 
              apply relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Accessibility Features</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Keyboard navigation support throughout the site</li>
              <li>Clear headings and consistent navigation</li>
              <li>Alt text for images</li>
              <li>Sufficient colour contrast</li>
              <li>Resizable text without loss of functionality</li>
              <li>Screen reader compatibility</li>
              <li>Focus indicators for interactive elements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Conformance Status</h2>
            <p className="leading-relaxed">
              We aim to conform to WCAG 2.1 Level AA standards. We regularly audit our 
              site to identify and address accessibility issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Feedback</h2>
            <p className="leading-relaxed">
              We welcome your feedback on the accessibility of FirstHome. If you encounter 
              any barriers or have suggestions for improvement, please contact us at 
              accessibility@firsthome.co.uk. We take all feedback seriously and will 
              respond within 5 working days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Assistive Technologies</h2>
            <p className="leading-relaxed">
              FirstHome is designed to be compatible with popular assistive technologies 
              including screen readers (NVDA, JAWS, VoiceOver), screen magnifiers, and 
              voice recognition software.
            </p>
          </section>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
