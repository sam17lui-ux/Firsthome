"use client";

import type { MouseEvent } from "react";
import { Home, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate?.(page);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">FirstHome</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Your free guide to buying your first home. We simplify the journey so you can focus on finding your dream home.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Guides Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Guides</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" onClick={handleLinkClick("guide-house-hunting")} className="text-sm hover:text-teal-400 transition-colors">
                  House Hunting
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("guide-making-an-offer")} className="text-sm hover:text-teal-400 transition-colors">
                  Making an offer
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("guide-prep-legal-financial")} className="text-sm hover:text-teal-400 transition-colors">
                  Prepare for Legal & Financial
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("guide-legal-and-conveyancing")} className="text-sm hover:text-teal-400 transition-colors">
                  Legal & Conveyancing
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("guide-surveys")} className="text-sm hover:text-teal-400 transition-colors">
                  Surveys
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("guide-moving")} className="text-sm hover:text-teal-400 transition-colors">
                  Moving Day
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" onClick={handleLinkClick("faqs")} className="text-sm hover:text-teal-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("glossary")} className="text-sm hover:text-teal-400 transition-colors">
                  Glossary
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("cost-calculator")} className="text-sm hover:text-teal-400 transition-colors">
                  Cost Calculator
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("timeline")} className="text-sm hover:text-teal-400 transition-colors">
                  Timeline Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" onClick={handleLinkClick("about")} className="text-sm hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick("contact")} className="text-sm hover:text-teal-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-slate-500">
              {currentYear} FirstHome. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href="#" onClick={handleLinkClick("privacy")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" onClick={handleLinkClick("terms")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" onClick={handleLinkClick("cookies")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Cookie Policy
              </a>
              <a href="#" onClick={handleLinkClick("accessibility")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4">
            FirstHome is an educational resource and does not provide financial, legal, or real estate advice. 
            Always consult qualified professionals for your specific situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
