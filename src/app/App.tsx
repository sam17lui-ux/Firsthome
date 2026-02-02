import { useState } from "react";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { HowItWorksScreen } from "@/components/how-it-works-screen";
import { ChatAssistantScreen } from "@/components/chat-assistant-screen";
import { JourneyTrackerScreen } from "@/components/journey-tracker-screen";
import { AuthModal } from "@/components/auth-modal";
import { HouseHuntingGuide, MakingAnOfferGuide, LegalAndConveyancingGuide, MortgagesGuide, SolicitorsGuide, SurveysGuide, MovingDayGuide } from "@/components/pages/guide-pages";
import { FAQsPage, GlossaryPage, CostCalculatorPage, TimelineGuidePage } from "@/components/pages/resource-pages";
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsOfServicePage, CookiePolicyPage, AccessibilityPage } from "@/components/pages/company-pages";

type Screen =
  | "onboarding"
  | "how-it-works"
  | "chat"
  | "tracker"
  | "guide-house-hunting"
  | "guide-making-an-offer"
  | "guide-legal-and-conveyancing"
  | "guide-mortgages"
  | "guide-solicitors"
  | "guide-surveys"
  | "guide-moving"
  | "faqs"
  | "glossary"
  | "cost-calculator"
  | "timeline"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies"
  | "accessibility";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [previousScreen, setPreviousScreen] = useState<Screen>("onboarding");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "create">("login");

  const navigateTo = (screen: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    const contentPages: Screen[] = ["faqs", "glossary", "cost-calculator", "timeline", "about", "contact", "privacy", "terms", "cookies", "accessibility", "guide-house-hunting", "guide-making-an-offer", "guide-legal-and-conveyancing", "guide-mortgages", "guide-solicitors", "guide-surveys", "guide-moving"];
    if (contentPages.includes(currentScreen)) {
      setCurrentScreen(previousScreen === currentScreen ? "tracker" : previousScreen);
    } else {
      setCurrentScreen(previousScreen);
    }
  };

  const openLoginModal = () => {
    setAuthModalMode("login");
    setShowAuthModal(true);
  };

  const openCreateAccountModal = () => {
    setAuthModalMode("create");
    setShowAuthModal(true);
  };

  // Guide pages
  if (currentScreen === "guide-house-hunting") return <HouseHuntingGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-making-an-offer") return <MakingAnOfferGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-legal-and-conveyancing") return <LegalAndConveyancingGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-mortgages") return <MortgagesGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-solicitors") return <SolicitorsGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-surveys") return <SurveysGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-moving") return <MovingDayGuide onBack={handleBack} onNavigate={navigateTo} />;

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

  return (
    <div className="min-h-screen">
      {currentScreen === "onboarding" && (
        <OnboardingScreen
          onBegin={() => setCurrentScreen("how-it-works")}
          onOpenLogin={openLoginModal}
          userEmail={userEmail}
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === "how-it-works" && (
        <HowItWorksScreen
          onBegin={() => setCurrentScreen("tracker")}
          onBack={() => setCurrentScreen("onboarding")}
          onOpenLogin={openLoginModal}
          userEmail={userEmail}
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === "chat" && (
        <ChatAssistantScreen
          onBack={() => setCurrentScreen("tracker")}
          onUpdateProgress={() => setCurrentScreen("tracker")}
        />
      )}
      {currentScreen === "tracker" && (
        <JourneyTrackerScreen
          onBack={() => setCurrentScreen("how-it-works")}
          onOpenChat={() => setCurrentScreen("chat")}
          onOpenLogin={openLoginModal}
          onOpenCreateAccount={openCreateAccountModal}
          userEmail={userEmail}
          onNavigate={navigateTo}
        />
      )}

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authModalMode}
        onLogin={(email) => {
          setUserEmail(email);
          setShowAuthModal(false);
        }}
        onCreateAccount={(email) => {
          setUserEmail(email);
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}
