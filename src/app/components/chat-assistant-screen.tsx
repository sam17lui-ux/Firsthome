import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatAssistantScreenProps {
  onBack: () => void;
  onUpdateProgress: () => void;
}

interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "What happens after the survey?",
  "Can I pull out after exchange?",
  "How long does mortgage approval actually take?",
  "What are searches and why do they matter?",
];

const ASSISTANT_RESPONSES: { [key: string]: string } = {
  "What happens after the survey?": "Right, so once the survey's done, you'll get a report from the surveyor. If they find any issues (damp, structural problems, dodgy electrics), you've got options: ask the seller to fix it, negotiate the price down, or if it's really bad, walk away. Meanwhile, your solicitor keeps working on searches and contracts. The lender will also review the survey before giving final mortgage approval.",
  "Can I pull out after exchange?": "Short answer: not really. Exchange is when it gets legally binding. Once you've exchanged contracts and paid your deposit, backing out means you lose that deposit (usually 10% of the purchase price) and could face legal action from the seller. Before exchange? You can walk away anytime, no penalties. That's why it's so important to be 100% sure before you exchange.",
  "How long does mortgage approval actually take?": "Honestly? It's a bit of a lottery. Some people get it in 2 weeks, others wait 6+ weeks. It depends on your lender's workload, how complicated your finances are, and whether the survey raises any red flags. Pro tip: keep everything stable during this time. Don't change jobs, take out new credit, or make any big purchases. Lenders hate surprises.",
  "What are searches and why do they matter?": "Searches are basically background checks on the property. Your solicitor will look into things like: Is there a new road planned nearby? Any flood risks? Planning permission issues? Contaminated land? It's tedious stuff, but it protects you from nasty surprises down the line. They usually take 2-4 weeks, and sometimes longer if the local council is slow to respond.",
};

export function ChatAssistantScreen({ onBack, onUpdateProgress }: ChatAssistantScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Hey! I'm here to help you make sense of this whole homebuying thing. What's on your mind?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant response
    setTimeout(() => {
      const responseText = ASSISTANT_RESPONSES[text] || 
        "That's a really good question. The UK property process can be confusing, and every situation is a bit different. Generally speaking, your solicitor and mortgage broker are your best sources for specific advice on your case. But I'm here to help you understand what's supposed to happen at each stage. Want to know more about a specific step?";
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        sender: "assistant",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-200" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl text-white">Chat</h2>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400">Plain English. No BS.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-5 py-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-slate-800/60 border border-slate-700/50 text-gray-200"
                }`}
              >
                <p className="text-[15px] leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          
          {/* Suggested Prompts - Show only at start */}
          {messages.length === 1 && (
            <div className="space-y-3 pt-4">
              <p className="text-sm text-gray-400 text-center">Common questions:</p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl px-4 py-3 text-sm text-gray-300 text-left transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Update Progress Button */}
      <div className="absolute bottom-24 right-6 z-10">
        <Button
          onClick={onUpdateProgress}
          className="h-12 bg-slate-800/95 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 text-white rounded-full shadow-2xl px-4 flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Update Progress</span>
        </Button>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex gap-3 items-end">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              placeholder="Type your question..."
              className="min-h-[50px] max-h-[120px] resize-none bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-2xl"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="h-[50px] w-[50px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
