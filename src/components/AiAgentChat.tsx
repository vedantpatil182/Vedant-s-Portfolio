"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Sparkles, X, Send, User, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "💡 Vedu's Skills",
  "🚀 Featured Projects",
  "🎓 Education & Experience",
  "📞 Contact Info",
];

// Helper to format simple markdown (bold, links, line breaks) cleanly
function formatMessageContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = [];
    let lastIdx = 0;

    const regex = /(\*\*(.*?)\*\*)|(\[(.*?)\]\((.*?)\))/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        parts.push(line.substring(lastIdx, match.index));
      }

      if (match[1]) {
        // Bold text
        parts.push(
          <strong key={`bold-${lineIdx}-${match.index}`} className="font-semibold text-purple-200">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // Link
        parts.push(
          <a
            key={`link-${lineIdx}-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2 font-medium"
          >
            {match[4]}
          </a>
        );
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < line.length) {
      parts.push(line.substring(lastIdx));
    }

    return (
      <span key={lineIdx} className="block min-h-[1rem]">
        {parts.length > 0 ? parts : line}
      </span>
    );
  });
}

export default function AiAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Hi! 👋 I'm **Vedu's AI Assistant**.\n\nAsk me anything about Vedant (Vedu) Patil's skills, full-stack projects, experience, or contact details!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || "Sorry, I couldn't process your question.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiReply,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "You can contact Vedant (Vedu) via Email at [vedantpatil182@gmail.com](mailto:vedantpatil182@gmail.com) or Phone: +919405796393.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "Hi! 👋 I'm **Vedu's AI Assistant**.\n\nAsk me anything about Vedant (Vedu) Patil's skills, full-stack projects, experience, or contact details!",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Chat Window Popup */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[520px] bg-neutral-900/95 border border-purple-500/30 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-950/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-900/80 via-neutral-900 to-purple-950/80 border-b border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-neutral-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-neutral-100 text-sm">
                  <span>Vedu's AI Agent</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <p className="text-[11px] text-purple-300/80">Always ready to answer</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Chat"
                className="p-1.5 text-neutral-400 hover:text-purple-300 hover:bg-neutral-800 rounded-lg transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-neutral-200 scrollbar-thin scrollbar-thumb-purple-900/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-purple-900/30"
                      : "bg-neutral-800/90 border border-neutral-700/60 text-neutral-200 rounded-bl-xs"
                  }`}
                >
                  {formatMessageContent(m.content)}
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center justify-start">
                <div className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-neutral-800/90 border border-neutral-700/60 text-purple-300 px-3.5 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          {messages.length < 5 && !isLoading && (
            <div className="px-3 py-2 bg-neutral-950/60 border-t border-neutral-800/80 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="text-[11px] bg-purple-950/50 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 px-2.5 py-1 rounded-full transition text-left truncate max-w-full"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Vedu..."
              disabled={isLoading}
              className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3.5 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl disabled:opacity-40 transition shadow-md shadow-purple-950/50 flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-neutral-900/90 border border-purple-500/50 rounded-full shadow-lg shadow-purple-950/50 text-neutral-100 hover:border-purple-400 hover:shadow-purple-700/30 transition-all duration-300 backdrop-blur-md"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-semibold bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
          {isOpen ? "Close AI Chat" : "Ask AI agent Vedu"}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
      </button>
    </div>
  );
}
