"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SuggestionChips } from "./SuggestionChips";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import botAvatar from "@/assets/images/chatbot/chatbot.webp";

const placeholders = [
  "Does Lokeshwar know Next.js?",
  "Why should we hire him?",
  "What backend systems has he built?",
  "Show full stack projects.",
  "How strong is he in TypeScript?",
  "Has he worked with Docker?",
];

const renderMessageContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;

  return content.split("\n").map((line, i, arr) => {
    // Match markdown links: [Text](URL)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = line.split(markdownLinkRegex);

    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (j % 3 === 1) {
            const nextPartIsUrl = parts[j + 1];
            return (
              <a
                key={j}
                href={nextPartIsUrl}
                target={nextPartIsUrl.startsWith("http") ? "_blank" : "_self"}
                rel={nextPartIsUrl.startsWith("http") ? "noopener noreferrer" : ""}
                className="font-medium break-all text-purple-300 underline decoration-purple-400 transition-opacity hover:text-purple-200"
              >
                {part}
              </a>
            );
          } else if (j % 3 === 2) {
            // Skip rendering the URL text itself
            return null;
          }

          // Process regular text for URLs and bold
          const urlParts = part.split(urlRegex);
          return (
            <span key={j}>
              {urlParts.map((up, k) => {
                if (up.match(urlRegex)) {
                  return (
                    <a
                      key={k}
                      href={up}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium break-all text-purple-300 underline decoration-purple-400 transition-opacity hover:text-purple-200"
                    >
                      {up}
                    </a>
                  );
                }

                const boldParts = up.split(boldRegex);
                return (
                  <span key={k}>
                    {boldParts.map((bp, l) => {
                      if (l % 2 === 1) {
                        return (
                          <strong key={l} className="font-bold text-zinc-100">
                            {bp}
                          </strong>
                        );
                      }
                      return bp;
                    })}
                  </span>
                );
              })}
            </span>
          );
        })}
        {i !== arr.length - 1 && <br />}
      </span>
    );
  });
};

export function ChatInterface() {
  const { messages, status, error, sendMessage } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, error]);

  // Handle Inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      setShowInactivityPrompt(false);

      // Only show inactivity prompt if there are no messages except the initial ones
      if (messages.length === 0) {
        inactivityTimerRef.current = setTimeout(() => {
          setShowInactivityPrompt(true);
        }, 25000); // 25 seconds
      }
    };

    resetTimer();

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [messages.length]);

  const handleSuggestionClick = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950/50">
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div
              key="welcome-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 mb-6 flex flex-col items-center space-y-4 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-purple-500/30 bg-linear-to-br from-indigo-500/20 to-purple-500/20">
                <Image src={botAvatar} alt="Lokeshwar AI" className="h-full w-full object-cover" />
              </div>
              <div className="max-w-[280px] space-y-2">
                <p className="text-sm font-medium text-zinc-200">Hi 👋 I’m Lokeshwar AI.</p>
                <p className="text-xs text-zinc-400">
                  I can quickly summarize his skills, experience, and availability.
                </p>
              </div>
              <SuggestionChips onSelect={handleSuggestionClick} />

              <AnimatePresence>
                {showInactivityPrompt && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-6 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3"
                  >
                    <p className="text-xs text-indigo-300">Need a quick 20-second summary?</p>
                    <button
                      onClick={() =>
                        handleSuggestionClick("Give me a 20-second summary of your resume.")
                      }
                      className="mt-2 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                      Yes, summarize →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {messages.map((m: UIMessage) => {
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] min-w-0 rounded-2xl px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-wrap ${
                    m.role === "user"
                      ? "rounded-br-sm bg-zinc-800 text-zinc-100"
                      : "rounded-bl-sm border border-purple-500/20 bg-linear-to-br from-indigo-500/10 to-purple-500/10 text-zinc-300"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={botAvatar}
                        alt="Lokeshwar AI"
                        className="h-5 w-5 rounded-full border border-purple-500/30 object-cover"
                      />
                      <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-xs font-bold text-transparent">
                        Lokeshwar AI
                      </span>
                    </div>
                  )}
                  <div className="max-w-full">
                    {m.parts && m.parts.length > 0 ? (
                      m.parts.map((part: any, index: number) => {
                        if (part.type === "text") {
                          const textPart = part as { type: "text"; text: string };
                          return <div key={index}>{renderMessageContent(textPart.text)}</div>;
                        }
                        return null;
                      })
                    ) : (
                      <div>{renderMessageContent((m as any).content || "")}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
            <motion.div
              key="loading-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-start"
            >
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-purple-500/20 bg-linear-to-br from-indigo-500/10 to-purple-500/10 px-4 py-3 text-sm text-zinc-300">
                <div className="flex items-center gap-3">
                  <Image
                    src={botAvatar}
                    alt="Lokeshwar AI"
                    className="h-5 w-5 rounded-full border border-purple-500/30 object-cover"
                  />
                  <div className="flex h-5 items-center gap-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              key="error-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-start"
            >
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-red-400">⚠ Connection Issue</span>
                </div>
                <p className="text-xs text-red-300/80">
                  {error.message.includes("429")
                    ? "Too many messages — please wait a moment before trying again."
                    : "Something went wrong. Please try sending your message again."}
                </p>
              </div>
            </motion.div>
          )}
          <div key="messages-end" ref={messagesEndRef} className="h-1" />
        </AnimatePresence>
      </div>

      <div className="border-t border-white/5 bg-zinc-950/50 p-4 backdrop-blur-md">
        <div className="relative flex w-full min-w-0 items-center gap-2">
          <div className={`relative w-full ${isLoading ? "pointer-events-none opacity-60" : ""}`}>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleInputChange}
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  sendMessage({ text: input.trim() });
                  setInput("");
                }
              }}
            />
            {isLoading && (
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
