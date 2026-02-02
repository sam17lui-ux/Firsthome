"use client";

import { useState } from "react";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { HowItWorksScreen } from "@/components/how-it-works-screen";
import { ChatAssistantScreen } from "@/components/chat-assistant-screen";
import { JourneyTrackerScreen } from "@/components/journey-tracker-screen";
import { CreateAccountScreen } from "@/components/create-account-screen";
import { LoginScreen } from "@/components/login-screen";
import { FAQsPage, GlossaryPage, CostCalculatorPage, TimelineGuidePage } from "@/components/pages/resource-pages";
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsOfServicePage, CookiePolicyPage, AccessibilityPage } from "@/components/pages/company-pages";
import { HouseHuntingGuide, MakingAnOfferGuide, LegalAndConveyancingGuide, MortgagesGuide, SolicitorsGuide, SurveysGuide, MovingDayGuide } from "@/components/pages/guide-pages";

type Screen = 
  | "onboarding" 
  | "how-it-works" 
  | "tracker" 
  | "chat" 
  | "create-account"
  | "login"
  | "faqs"
  | "glossary"
  | "cost-calculator"
  | "timeline"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies"
  | "accessibility"
  | "guide-house-hunting"
  | "guide-making-an-offer"
  | "guide-legal-and-conveyancing"
  | "guide-mortgages"
  | "guide-solicitors"
  | "guide-surveys"
  | "guide-moving";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [previousScreen, setPreviousScreen] = useState<Screen>("onboarding");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const navigateTo = (screen: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    const contentPages = ["faqs", "glossary", "cost-calculator", "timeline", "about", "contact", "privacy", "terms", "cookies", "accessibility", "guide-house-hunting", "guide-making-an-offer", "guide-legal-and-conveyancing", "guide-mortgages", "guide-solicitors", "guide-surveys", "guide-moving"];
    if (contentPages.includes(currentScreen)) {
      setCurrentScreen(previousScreen === currentScreen ? "tracker" : previousScreen);
    } else if (currentScreen === "login" || currentScreen === "create-account") {
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen(previousScreen);
    }
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setCurrentScreen("tracker");
  };

  // Resource pages
  if (currentScreen === "faqs") return <FAQsPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "glossary") return <GlossaryPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "cost-calculator") return <CostCalculatorPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "timeline") return <TimelineGuidePage onBack={handleBack} onNavigate={navigateTo} />;
  
  // Company pages
  if (currentScreen === "about") return <AboutPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "contact") return <ContactPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "privacy") return <PrivacyPolicyPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "terms") return <TermsOfServicePage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "cookies") return <CookiePolicyPage onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "accessibility") return <AccessibilityPage onBack={handleBack} onNavigate={navigateTo} />;
  
  // Guide pages
  if (currentScreen === "guide-house-hunting") return <HouseHuntingGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-making-an-offer") return <MakingAnOfferGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-legal-and-conveyancing") return <LegalAndConveyancingGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-mortgages") return <MortgagesGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-solicitors") return <SolicitorsGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-surveys") return <SurveysGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-moving") return <MovingDayGuide onBack={handleBack} onNavigate={navigateTo} />;

  // Main screens
  if (currentScreen === "create-account") {
    return (
      <CreateAccountScreen
        onSuccess={() => navigateTo("tracker")}
        onClose={() => navigateTo("tracker")}
        onNavigateToLogin={() => navigateTo("login")}
        onNavigate={navigateTo}
      />
    );
  }

  if (currentScreen === "login") {
    return <LoginScreen onBack={handleBack} onLogin={handleLogin} />;
  }

  if (currentScreen === "onboarding") {
    return (
      <OnboardingScreen 
        onBegin={() => navigateTo("how-it-works")} 
        onLogin={() => navigateTo("login")}
        onNavigate={navigateTo}
      />
    );
  }

  if (currentScreen === "how-it-works") {
    return (
      <HowItWorksScreen
        onBegin={() => navigateTo("tracker")}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "chat") {
    return (
      <ChatAssistantScreen
        onBack={() => navigateTo("tracker")}
        onUpdateProgress={() => navigateTo("tracker")}
      />
    );
  }

  if (currentScreen === "tracker") {
    return (
      <JourneyTrackerScreen
        onBack={() => navigateTo("how-it-works")}
        onOpenChat={() => navigateTo("chat")}
        onNavigate={navigateTo}
        onNavigateToSignup={() => navigateTo("create-account")}
        userEmail={userEmail}
        onLogin={() => navigateTo("login")}
      />
    );
  }

  return null;
}
