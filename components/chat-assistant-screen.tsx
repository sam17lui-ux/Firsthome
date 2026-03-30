"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Send, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage, type ChatMessage } from "@/lib/claude-chat";

interface ChatAssistantScreenProps {
  onBack: () => void;
  onUpdateProgress: () => void;
}

interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const SUGGESTED_PROMPTS = [
  "What happens after the survey?",
  "Can I pull out after exchange?",
  "How long does mortgage approval actually take?",
  "What are searches and why do they matter?",
];

export function ChatAssistantScreen({
  onBack,
  onUpdateProgress,
}: ChatAssistantScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Hey! I'm here to help you make sense of this whole homebuying thing. What's on your mind?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      // Cancel any in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMessage: Message = {
        id: Date.now(),
        sender: "user",
        text,
        timestamp: new Date(),
      };

      const assistantId = Date.now() + 1;
      const assistantPlaceholder: Message = {
        id: assistantId,
        sender: "assistant",
        text: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setInputValue("");
      setIsLoading(true);

      // Build conversation history for the API (exclude the empty placeholder)
      const history: ChatMessage[] = [
        ...messages.map((m) => ({
          role: m.sender as "user" | "assistant",
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      try {
        await sendMessage(
          history,
          (token) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, text: m.text + token } : m
              )
            );
          },
          abortRef.current.signal
        );
      } catch (err) {
        const isAbort =
          err instanceof Error && err.name === "AbortError";
        if (isAbort) {
          // Remove the empty placeholder — the request was cancelled
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        } else {
          console.error("[FirstHome chat error]", err);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    text: "Sorry, something went wrong. Please check your connection and try again.",
                    isStreaming: false,
                  }
                : m
            )
          );
        }
      } finally {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          )
        );
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20">
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
                <h2 className="text-xl text-white font-medium">Chat</h2>
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
                {message.isStreaming && message.text === "" ? (
                  <span className="flex gap-1 items-center h-[22px]">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : (
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message.text}
                    {message.isStreaming && (
                      <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Suggested Prompts — only shown before first user message */}
          {messages.length === 1 && (
            <div className="space-y-3 pt-4">
              <p className="text-sm text-gray-400 text-center">
                Common questions:
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl px-4 py-3 text-sm text-gray-300 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="fixed bottom-24 right-6 z-10">
        <Button
          onClick={onUpdateProgress}
          className="h-12 bg-slate-800/95 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 text-white rounded-full shadow-2xl px-4 flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Update Progress</span>
        </Button>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 sticky bottom-0">
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
              placeholder={isLoading ? "Thinking…" : "Type your question..."}
              disabled={isLoading}
              className="min-h-[50px] max-h-[120px] resize-none bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-2xl disabled:opacity-60"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
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
