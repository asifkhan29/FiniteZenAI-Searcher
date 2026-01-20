import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User } from "lucide-react";

interface ResultCard {
  id: number;
  name: string;
  role: string;
  price: string;
  location: string;
}

const mockResults: ResultCard[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "React Freelancer",
    price: "₹8,000 – ₹12,000",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Full-Stack Developer",
    price: "₹10,000 – ₹15,000",
    location: "Bangalore",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Frontend Specialist",
    price: "₹7,500 – ₹11,000",
    location: "Delhi",
  },
];

const typingQuery = "react freelancer who can create a website in ₹10,000";

const AISearchDemo = () => {
  const [phase, setPhase] = useState<"typing" | "thinking" | "results">("typing");
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedText.length < typingQuery.length) {
        timeout = setTimeout(() => {
          setDisplayedText(typingQuery.slice(0, displayedText.length + 1));
        }, 50 + Math.random() * 30);
      } else {
        timeout = setTimeout(() => {
          setPhase("thinking");
        }, 800);
      }
    } else if (phase === "thinking") {
      timeout = setTimeout(() => {
        setPhase("results");
      }, 1500);
    } else if (phase === "results") {
      timeout = setTimeout(() => {
        setPhase("typing");
        setDisplayedText("");
      }, 6000);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="chat-container shadow-sm">
        {/* Chat header */}
        <div className="px-5 py-4 border-b border-chat-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Finitezen AI</span>
          <span className="badge-beta text-xs">Beta</span>
        </div>

        {/* Chat messages area */}
        <div className="p-5 min-h-[320px] space-y-4">
          {/* User query */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">
                {displayedText}
                {phase === "typing" && showCursor && (
                  <span className="text-muted-foreground">|</span>
                )}
              </p>
            </div>
          </div>

          {/* AI response */}
          <AnimatePresence mode="wait">
            {phase === "thinking" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-primary-foreground font-medium">AI</span>
                </div>
                <div className="flex items-center gap-1.5 py-2">
                  <span className="thinking-dots flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                  </span>
                </div>
              </motion.div>
            )}

            {phase === "results" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-primary-foreground font-medium">AI</span>
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Found 3 React freelancers matching your budget:
                  </p>
                  {mockResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="result-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-foreground">{result.price}</p>
                          <p className="text-xs text-muted-foreground">{result.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          Contact
                        </button>
                        <span className="text-border">•</span>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          Chat with AI Agent
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat input */}
        <div className="p-4 border-t border-chat-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask anything about real people, services, prices..."
              className="chat-input flex-1"
              readOnly
            />
            <button className="w-10 h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AISearchDemo;
