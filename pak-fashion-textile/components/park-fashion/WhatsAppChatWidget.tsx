"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock } from "lucide-react";
import { companyInfo } from "@/data/park-fashion-products";

const quickReplies = [
  "I need sublimation papers",
  "Inquiry about printing inks",
  "Looking for spare parts",
  "Bulk order pricing",
  "International shipping info",
];

interface Message {
  id: number;
  text: string;
  from: "bot" | "user";
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export default function WhatsAppChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show notification badge after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Initial greeting when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: `Assalam o Alaikum! Welcome to Pak Fashion Textile. How can we help you today?`,
            from: "bot",
            time: getTime(),
          },
        ]);
        setTyping(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleOpen = () => {
    setOpen(true);
    setShowBadge(false);
  };

  const sendToWhatsApp = (text: string) => {
    const msg = encodeURIComponent(text);
    window.open(
      `https://wa.me/${companyInfo.whatsapp}?text=${msg}`,
      "_blank"
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      from: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userText = input.trim();
    setInput("");

    // Bot reply after a short delay
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your message! Let me connect you with our team on WhatsApp for a quick response.",
          from: "bot",
          time: getTime(),
        },
      ]);
      setTyping(false);

      // Redirect to WhatsApp after another moment
      setTimeout(() => sendToWhatsApp(userText), 1200);
    }, 1000);
  };

  const handleQuickReply = (text: string) => {
    const userMsg: Message = {
      id: Date.now(),
      text,
      from: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);

    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Great choice! Opening WhatsApp so our team can assist you right away...",
          from: "bot",
          time: getTime(),
        },
      ]);
      setTyping(false);

      setTimeout(() => sendToWhatsApp(text), 1200);
    }, 800);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#1B4332] px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D4A843]/20 flex items-center justify-center">
                  <span className="text-[#D4A843] font-bold text-sm">PF</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#1B4332]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  Pak Fashion Textile
                </p>
                <p className="text-white/50 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  Online — typically replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat area */}
            <div className="bg-[#ECE5DD] h-[320px] overflow-y-auto px-4 py-4 space-y-3" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}>
              {/* Date header */}
              <div className="flex justify-center">
                <span className="bg-white/80 text-gray-500 text-[10px] font-medium px-3 py-1 rounded-full shadow-sm">
                  Today
                </span>
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm ${
                      msg.from === "user"
                        ? "bg-[#DCF8C6] rounded-tr-sm"
                        : "bg-white rounded-tl-sm"
                    }`}
                  >
                    <p className="text-[13px] text-gray-800 leading-relaxed">
                      {msg.text}
                    </p>
                    <p
                      className={`text-[10px] mt-1 flex items-center gap-1 ${
                        msg.from === "user"
                          ? "text-gray-500 justify-end"
                          : "text-gray-400"
                      }`}
                    >
                      <Clock size={9} />
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick replies (show only after first bot message, no user message yet) */}
              {messages.length === 1 && messages[0].from === "bot" && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="space-y-1.5 pt-1"
                >
                  <p className="text-[10px] text-gray-500 font-medium px-1">
                    Quick replies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        className="bg-white text-[#2D6A4F] text-xs font-medium px-3 py-2 rounded-full border border-[#2D6A4F]/20 hover:bg-[#2D6A4F] hover:text-white transition-all duration-200 shadow-sm"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-white px-3 py-3 flex items-center gap-2 border-t border-gray-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-[#F0F2F5] text-sm text-gray-800 placeholder:text-gray-400 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                aria-label="Type a message"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        className="fixed bottom-6 right-6 z-[60] group"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {/* Pulse rings */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15" />
            <span
              className="absolute rounded-full bg-[#25D366] opacity-10 animate-ping"
              style={{ inset: "-6px", animationDelay: "0.4s", animationDuration: "1.8s" }}
            />
          </>
        )}

        {/* Notification badge */}
        <AnimatePresence>
          {showBadge && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center z-10 border-2 border-white"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center w-14 h-14 lg:w-auto lg:h-auto rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]"
        >
          <span className="flex items-center justify-center w-14 h-14 lg:hidden">
            {open ? <X size={24} /> : <MessageCircle size={26} />}
          </span>
          <span className="hidden lg:flex items-center gap-2.5 px-7 py-[18px] font-semibold text-sm">
            {open ? (
              <X size={20} />
            ) : (
              <>
                <MessageCircle size={20} />
                Chat with Us
              </>
            )}
          </span>
        </motion.span>
      </button>
    </>
  );
}
