import { useState } from "react";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { HowItWorksScreen } from "@/components/how-it-works-screen";
import { ChatAssistantScreen } from "@/components/chat-assistant-screen";
import { JourneyTrackerScreen } from "@/components/journey-tracker-screen";
import { CreateAccountScreen } from "@/components/create-account-screen";
import { LoginScreen } from "@/components/login-screen";

type Screen =
  | "onboarding"
  | "how-it-works"
  | "chat"
  | "tracker"
  | "create-account"
  | "login";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");

  return (
    <div className="min-h-screen">
      {currentScreen === "onboarding" && (
        <OnboardingScreen
          onBegin={() => setCurrentScreen("how-it-works")}
        />
      )}
      {currentScreen === "how-it-works" && (
        <HowItWorksScreen
          onBegin={() => setCurrentScreen("tracker")}
          onBack={() => setCurrentScreen("onboarding")}
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
          onNavigateToSignup={() => setCurrentScreen("create-account")}
        />
      )}
      {currentScreen === "create-account" && (
        <CreateAccountScreen
          onSuccess={() => setCurrentScreen("tracker")}
          onClose={() => setCurrentScreen("tracker")}
          onNavigateToLogin={() => setCurrentScreen("login")}
        />
      )}
      {currentScreen === "login" && (
        <LoginScreen
          onBack={() => setCurrentScreen("create-account")}
          onLogin={() => setCurrentScreen("tracker")}
        />
      )}
    </div>
  );
}
