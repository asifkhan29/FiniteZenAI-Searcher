import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, CheckCircle } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "user" | "agent";
  text: string;
}

const agentConversation: ChatMessage[] = [
  {
    id: 1,
    sender: "user",
    text: "How much would it cost to build a basic website?",
  },
  {
    id: 2,
    sender: "agent",
    text: "For a 5-page responsive website, my pricing is ₹10,000. This includes design, deployment, and 1 revision.",
  },
  {
    id: 3,
    sender: "user",
    text: "How long will it take?",
  },
  {
    id: 4,
    sender: "agent",
    text: "Around 7–10 days depending on content readiness. I can start immediately.",
  },
  {
    id: 5,
    sender: "user",
    text: "Can we have a quick call?",
  },
  {
    id: 6,
    sender: "agent",
    text: "Sure. I can schedule a call or continue here. What works best for you?",
  },
];

const AfterSearchChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (index >= agentConversation.length) return;

    const msg = agentConversation[index];
    const delay = msg.sender === "agent" ? 1400 : 700;

    if (msg.sender === "agent") setTyping(true);

    const timer = setTimeout(() => {
      setTyping(false);
      setVisibleMessages((prev) => [...prev, msg]);
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  return (

    
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-24"
    >
        {/* Section Title */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center max-w-2xl mx-auto mb-12"
>
  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
    From discovery to decision —{" "}
    <span className="font-normal">in one place.</span>
  </h2>
  <p className="text-base md:text-lg text-muted-foreground">
    Find. Ask. Decide. Connect.
  </p>
</motion.div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Rahul Mehta</p>
          <p className="text-xs text-muted-foreground">
            React Freelancer · AI Agent
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="p-5 min-h-[360px] space-y-4 bg-gradient-to-b from-background to-muted/10">
        <AnimatePresence>
          {visibleMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/80 text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing */}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted/70 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground/50"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed */}
        {index >= agentConversation.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center pt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-xs">
              <CheckCircle className="w-4 h-4" />
              Conversation ready to continue
            </div>
          </motion.div>
        )}
      </div>

      {/* Input (decorative) */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="flex-1 px-4 py-3 rounded-xl border border-border text-sm text-muted-foreground">
            Ask about pricing, timeline, meetings…
          </div>
          <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AfterSearchChatDemo;
