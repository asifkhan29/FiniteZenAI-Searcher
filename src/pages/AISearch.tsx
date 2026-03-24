import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  ArrowLeft,
  AlertTriangle,
  X,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface EntityContainer {
  id: string;
  entityType: string;
  originalDescription: string;
  metadata: Record<string, any>;
  score?: number;
}

interface DemoQuery {
  query: string;
  responseText: string;
  results: any[];
}

const demoQueries: DemoQuery[] = [
  {
    query:
      "java developer job in mumbai andheri paying ₹1L/month for 3 year experience",
    responseText:
      "Found 3 Java developer positions matching your exact criteria:",
    results: [
      {
        id: "techcorp-solutions",
        name: "TechCorp Solutions",
        role: "Java Developer • 3+ yrs exp",
        price: "₹1.2L/month",
        location: "Andheri East",
      },
      {
        id: "finova-systems",
        name: "Finova Systems",
        role: "Backend Engineer • Java Spring",
        price: "₹95K/month",
        location: "Andheri West",
      },
      {
        id: "datastream-inc",
        name: "DataStream Inc",
        role: "Java Full-Stack • Remote Hybrid",
        price: "₹1.1L/month",
        location: "MIDC Andheri",
      },
    ],
  },
  {
    query:
      "react freelancer who can build an e-commerce website under ₹15,000 in delhi",
    responseText: "Found 3 React freelancers available in Delhi NCR:",
    results: [
      {
        id: "arjun-mehta",
        name: "Arjun Mehta",
        role: "React & Next.js Expert",
        price: "₹12,000 – ₹15,000",
        location: "South Delhi",
      },
      {
        id: "priya-sharma",
        name: "Priya Sharma",
        role: "Full-Stack Developer",
        price: "₹10,000 – ₹14,000",
        location: "Noida",
      },
      {
        id: "rahul-verma",
        name: "Rahul Verma",
        role: "Frontend Specialist",
        price: "₹8,000 – ₹12,000",
        location: "Gurgaon",
      },
    ],
  },
];

const AISearch = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Main Chat State ---
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string; results?: EntityContainer[] }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  // --- Demo Panel State ---
  const [showDemo, setShowDemo] = useState(false);
  const [demoQueryIndex, setDemoQueryIndex] = useState(0);
  const [demoPhase, setDemoPhase] = useState<"typing" | "thinking" | "results">(
    "typing",
  );
  const [demoDisplayedText, setDemoDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const currentDemo = demoQueries[demoQueryIndex];

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, demoPhase, demoDisplayedText]);

  // --- Demo Logic ---
  useEffect(() => {
    if (!showDemo) return;
    let timeout: NodeJS.Timeout;

    if (demoPhase === "typing") {
      if (demoDisplayedText.length < currentDemo.query.length) {
        timeout = setTimeout(
          () => {
            setDemoDisplayedText(
              currentDemo.query.slice(0, demoDisplayedText.length + 1),
            );
          },
          40 + Math.random() * 25,
        );
      } else {
        timeout = setTimeout(() => setDemoPhase("thinking"), 800);
      }
    } else if (demoPhase === "thinking") {
      timeout = setTimeout(() => setDemoPhase("results"), 1500);
    } else if (demoPhase === "results") {
      timeout = setTimeout(() => {
        setDemoQueryIndex((prev) => (prev + 1) % demoQueries.length);
        setDemoPhase("typing");
        setDemoDisplayedText("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showDemo, demoPhase, demoDisplayedText, currentDemo]);

  // Cursor Blinking
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    const queryToSearch = query;
    setUserInput("");
    setIsThinking(true);
    setMessages((prev) => [...prev, { role: "user", content: queryToSearch }]);

    try {
      const params = new URLSearchParams({ prompt: queryToSearch });
      if (selectedType) params.append("type", selectedType);

      const response = await fetch(
        `https://aidiscoveryplatform.onrender.com/api/search?${params.toString()}`,
      );
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Found ${data.length} results matching your query:`,
          results: data,
        },
      ]);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleChatWithAgent = (agentId: string, agentName: string) => {
    navigate(
      `/agent-chat?agent=${agentId}&name=${encodeURIComponent(agentName)}`,
    );
  };

  return (
    <>
      <Helmet>
        <title>AI Semantic Search | Finitezen</title>
      </Helmet>

      <div className="min-h-screen bg-background bg-grid-pattern flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-20 flex flex-col items-center relative overflow-hidden h-[calc(100vh-64px)]">
          {/* Header Action Row */}
          <div className="w-full max-w-4xl px-4 md:px-6 flex justify-between items-center mb-4">
            {/* <button 
              onClick={() => setShowDemo(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <PlayCircle className="w-4 h-4" /> Showcase Demo
            </button> */}
          </div>

          {/* Chat Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 w-full max-w-4xl overflow-y-auto px-4 md:px-6 space-y-8 pr-2 custom-scrollbar pb-32"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-secondary flex items-center justify-center shadow-inner">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">
                      How can I help you today?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Find professionals and opportunities across India
                      instantly.
                    </p>
                  </div>
                </div>

                {/* Suggestions with increased gap from bottom input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-12">
                  {[
                    "React freelancer in Delhi to build a portfolio for ₹8k or less",
                    "Java Full Stack dev in Mumbai paying 12 LPA with 2 yrs exp",
                    "Creative agency in Bandra for a high-end fashion shoot",
                    "Product Designer for a remote Fintech startup in Gurgaon",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => performSearch(suggestion)}
                      className="p-4 rounded-xl border border-border bg-card/50 hover:bg-secondary/80 text-left text-xs font-medium transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-[10px] text-primary-foreground font-black">
                      AI
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-md" : "flex-1"}`}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {msg.content}
                  </p>

                  {msg.results && (
                    <div className="mt-4 space-y-3">
                      <div className="text-[10px] font-bold text-amber-700 bg-amber-50 p-2 rounded-lg flex items-center gap-2 border border-amber-200 uppercase tracking-wider">
                        <AlertTriangle size={14} className="flex-shrink-0" />
                        <span>Development Mode: Test data results only.</span>
                      </div>
                      {msg.results.map((result) => (
                        <div
                          key={result.id}
                          className="result-card bg-card border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate">
                                {result.metadata?.name || "Anonymous User"}
                              </p>
                              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                                {result.entityType}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-black text-foreground">
                                {result.metadata?.pricing || "Inquire"}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {result.metadata?.location || "Remote"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-3 pt-3 border-t border-border/50">
                            <button className="text-xs font-bold text-muted-foreground hover:text-foreground">
                              Contact
                            </button>
                            <button
                              onClick={() =>
                                handleChatWithAgent(
                                  result.id,
                                  result.metadata?.name,
                                )
                              }
                              className="text-xs font-black text-primary hover:underline"
                            >
                              Chat with AI Agent
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-start gap-4 animate-pulse">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-1.5 py-3">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-primary/30 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
          </div>

          {/* Sticky Input Bar - Fixed for Mobile & restored all categories */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pb-6 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex flex-col gap-2 p-2 rounded-2xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-card overflow-visible">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 px-2">
                  <textarea
                    rows={1}
                    placeholder="Search freelancers, jobs, agencies..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-3 min-h-[44px]"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      (e.preventDefault(), performSearch(userInput))
                    }
                  />

                  <div className="flex items-center justify-between gap-2 border-t md:border-t-0 md:border-l border-border pt-2 md:pt-0 md:pl-2">
                    {/* RESTORED: All 4 options + mobile visible */}
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="bg-secondary/50 border-none rounded-lg text-xs font-bold h-9 px-3 focus:ring-2 focus:ring-primary/20 cursor-pointer flex-1 md:flex-none"
                    >
                      <option value="">All Categories</option>
                      <option value="freelancer">Freelancers</option>
                      <option value="job">Jobs</option>
                      <option value="agency">Agencies</option>
                      <option value="influencer">Influencers</option>
                    </select>

                    <button
                      onClick={() => performSearch(userInput)}
                      disabled={!userInput.trim() || isThinking}
                      className="w-10 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-20 transition-all shadow-md flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* --- RESTORED: Fullscreen Demo Panel Logic --- */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] bg-background flex flex-col"
            >
              <div className="border-b border-border p-4 flex items-center justify-between bg-card">
                <button
                  onClick={() => setShowDemo(false)}
                  className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Exit Demo
                </button>
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                    Auto-Showcase Mode
                  </span>
                </div>
                <button
                  onClick={() => setShowDemo(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-grid-pattern">
                <div className="max-w-2xl mx-auto space-y-10">
                  {/* Demo User Bubble */}
                  <div className="flex items-start gap-4 justify-end">
                    <div className="bg-primary text-primary-foreground p-6 rounded-3xl rounded-tr-none shadow-xl w-full">
                      <p className="text-lg font-bold leading-tight">
                        {demoDisplayedText}
                        {demoPhase === "typing" && showCursor && (
                          <span className="font-light">|</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Demo AI Response */}
                  {(demoPhase === "thinking" || demoPhase === "results") && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-black shadow-lg">
                        AI
                      </div>
                      <div className="flex-1 space-y-6">
                        {demoPhase === "thinking" ? (
                          <div className="flex gap-2 py-4">
                            <span className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce" />
                            <span className="w-2.5 h-2.5 bg-primary/70 rounded-full animate-bounce delay-75" />
                            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-150" />
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <p className="text-xl font-black tracking-tight">
                              {currentDemo.responseText}
                            </p>
                            {currentDemo.results.map((res, i) => (
                              <motion.div
                                key={res.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="result-card bg-card border-2 border-primary/5 shadow-lg"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                    <User className="w-6 h-6 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-black text-sm">
                                      {res.name}
                                    </p>
                                    <p className="text-[11px] font-bold text-primary uppercase tracking-widest">
                                      {res.role}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-black text-foreground">
                                      {res.price}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground font-medium">
                                      {res.location}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default AISearch;
