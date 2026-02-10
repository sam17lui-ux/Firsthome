import { useState, useEffect } from "react";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { HowItWorksScreen } from "@/components/how-it-works-screen";
import { ChatAssistantScreen } from "@/components/chat-assistant-screen";
import { JourneyTrackerScreen } from "@/components/journey-tracker-screen";
import { AuthModal } from "@/components/auth-modal";
import { HouseHuntingGuide, MakingAnOfferGuide, PrepareForLegalFinancialGuide, LegalAndConveyancingGuide, MortgagesGuide, SolicitorsGuide, SurveysGuide, MovingDayGuide } from "@/components/pages/guide-pages";
import { FAQsPage, GlossaryPage, CostCalculatorPage, TimelineGuidePage } from "@/components/pages/resource-pages";
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsOfServicePage, CookiePolicyPage, AccessibilityPage } from "@/components/pages/company-pages";
import { AccountScreen } from "@/components/account-screen";
import { getSession, onAuthChange, signOut } from "@/lib/supabase-auth";

type Screen =
  | "onboarding"
  | "how-it-works"
  | "chat"
  | "tracker"
  | "guide-house-hunting"
  | "guide-making-an-offer"
  | "guide-prep-legal-financial"
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
  | "accessibility"
  | "account";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [previousScreen, setPreviousScreen] = useState<Screen>("onboarding");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "create">("login");

  useEffect(() => {
    getSession().then((u) => {
      if (u) {
        setUserEmail(u.email);
        setUserId(u.id);
      }
    });
    return onAuthChange((u) => {
      setUserEmail(u?.email ?? null);
      setUserId(u?.id ?? null);
    });
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    requestAnimationFrame(() => requestAnimationFrame(scrollToTop));
  }, [currentScreen]);

  const navigateTo = (screen: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    const contentPages: Screen[] = ["faqs", "glossary", "cost-calculator", "timeline", "about", "contact", "privacy", "terms", "cookies", "accessibility", "account", "guide-house-hunting", "guide-making-an-offer", "guide-prep-legal-financial", "guide-legal-and-conveyancing", "guide-mortgages", "guide-solicitors", "guide-surveys", "guide-moving"];
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

  const handleLogout = () => {
    signOut();
    setUserEmail(null);
    setUserId(null);
  };

  // Guide pages
  if (currentScreen === "guide-house-hunting") return <HouseHuntingGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-making-an-offer") return <MakingAnOfferGuide onBack={handleBack} onNavigate={navigateTo} />;
  if (currentScreen === "guide-prep-legal-financial") return <PrepareForLegalFinancialGuide onBack={handleBack} onNavigate={navigateTo} />;
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

  if (currentScreen === "account" && userEmail) {
    return (
      <AccountScreen
        userEmail={userEmail}
        userId={userId}
        onBack={handleBack}
        onLogout={handleLogout}
        onNavigate={navigateTo}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {currentScreen === "onboarding" && (
        <OnboardingScreen
          onBegin={() => setCurrentScreen("how-it-works")}
          onOpenLogin={openLoginModal}
          onLogout={handleLogout}
          onNavigateToAccount={() => navigateTo("account")}
          userEmail={userEmail}
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === "how-it-works" && (
        <HowItWorksScreen
          onBegin={() => setCurrentScreen("tracker")}
          onBack={() => setCurrentScreen("onboarding")}
          onOpenLogin={openLoginModal}
          onLogout={handleLogout}
          onNavigateToAccount={() => navigateTo("account")}
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
          onLogout={handleLogout}
          onNavigateToAccount={() => navigateTo("account")}
          userEmail={userEmail}
          userId={userId}
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
