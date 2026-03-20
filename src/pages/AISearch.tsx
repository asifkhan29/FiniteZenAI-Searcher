import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
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
    query: "java developer job in mumbai andheri paying ₹1L/month for 3 year experience",
    responseText: "Found 3 Java developer positions matching your exact criteria:",
    results: [
      { id: "techcorp-solutions", name: "TechCorp Solutions", role: "Java Developer • 3+ yrs exp", price: "₹1.2L/month", location: "Andheri East" },
      { id: "finova-systems", name: "Finova Systems", role: "Backend Engineer • Java Spring", price: "₹95K/month", location: "Andheri West" },
      { id: "datastream-inc", name: "DataStream Inc", role: "Java Full-Stack • Remote Hybrid", price: "₹1.1L/month", location: "MIDC Andheri" },
    ],
  },
  {
    query: "react freelancer who can build an e-commerce website under ₹15,000 in delhi",
    responseText: "Found 3 React freelancers available in Delhi NCR:",
    results: [
      { id: "arjun-mehta", name: "Arjun Mehta", role: "React & Next.js Expert", price: "₹12,000 – ₹15,000", location: "South Delhi" },
      { id: "priya-sharma", name: "Priya Sharma", role: "Full-Stack Developer", price: "₹10,000 – ₹14,000", location: "Noida" },
      { id: "rahul-verma", name: "Rahul Verma", role: "Frontend Specialist", price: "₹8,000 – ₹12,000", location: "Gurgaon" },
    ],
  }
];

const AISearch = () => {
  const navigate = useNavigate();
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "thinking" | "results">("typing");
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [userSearchResults, setUserSearchResults] = useState<EntityContainer[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isUserSearch, setIsUserSearch] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const currentDemo = demoQueries[currentQueryIndex];

  const resetToNextQuery = useCallback(() => {
    setCurrentQueryIndex((prev) => (prev + 1) % demoQueries.length);
    setPhase("typing");
    setDisplayedText("");
  }, []);

  const performSearch = async (query: string) => {
    setPhase("thinking");
    try {
      const params = new URLSearchParams({
        prompt: query,
      });

      if (selectedType) {
        params.append("type", selectedType);
      }

      const response = await fetch(
        `https://aidiscoveryplatform.onrender.com/api/search?${params.toString()}`
      );

      const data = await response.json();
      setUserSearchResults(data);
      setPhase("results");
    } catch (error) {
      console.error("Search failed:", error);
      setPhase("results");
    }
  };

  useEffect(() => {
    if (!isAutoMode || isUserSearch) return;

    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedText.length < currentDemo.query.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentDemo.query.slice(0, displayedText.length + 1));
        }, 40 + Math.random() * 25);
      } else {
        timeout = setTimeout(() => {
          setPhase("thinking");
        }, 600);
      }
    } else if (phase === "thinking") {
      timeout = setTimeout(() => {
        setPhase("results");
      }, 1200);
    } else if (phase === "results") {
      timeout = setTimeout(() => {
        resetToNextQuery();
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, currentDemo.query, isAutoMode, isUserSearch, resetToNextQuery]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleInputFocus = () => {
    setIsAutoMode(false);
  };

  const handleUserSearch = () => {
    if (!userInput.trim()) return;
    setIsUserSearch(true);
    setUserSearchQuery(userInput);
    performSearch(userInput);
    setUserInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUserSearch();
    }
  };

  const handleChatWithAgent = (agentId: string, agentName: string) => {
    navigate(`/agent-chat?agent=${agentId}&name=${encodeURIComponent(agentName)}`);
  };

  const resetToAutoMode = () => {
    setIsUserSearch(false);
    setIsAutoMode(true);
    setUserSearchResults([]);
    setUserSearchQuery("");
    setPhase("typing");
    setDisplayedText("");
    setCurrentQueryIndex(0);
  };

  const activeQuery = isUserSearch ? userSearchQuery : displayedText;
  const activeResponseText = isUserSearch 
    ? `Found ${userSearchResults.length} results matching your query:` 
    : currentDemo.responseText;

  return (
    <>
      <Helmet>
        {/* ... (SEO meta tags, unchanged) ... */}
      </Helmet>

      <div className="min-h-screen bg-background bg-grid-pattern">
        <Header />
        
        <main className="pt-16 min-h-screen flex flex-col">
          {/* Header area */}
          <div className="container-architectural py-6 md:py-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="text-center mb-6 md:mb-8">
              <span className="text-overline mb-2 md:mb-3 block">AI Search</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-2 md:mb-3">
                Discover real people, instantly
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto px-4">
                {isUserSearch 
                  ? "Search results based on your query" 
                  : "Watch AI find structured, real-world answers in seconds"}
              </p>
            </div>
          </div>

          {/* Chat interface */}
          <div className="flex-1 container-architectural pb-6 md:pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full max-w-2xl mx-auto"
            >
              <div className="chat-container h-full flex flex-col min-h-[500px] md:min-h-[600px]">
                {/* Chat header */}
                <div className="px-4 md:px-5 py-3 md:py-4 border-b border-chat-border flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs md:text-sm text-muted-foreground">Finitezen AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUserSearch && (
                      <button 
                        onClick={resetToAutoMode}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Watch demo
                      </button>
                    )}
                    <span className="badge-beta text-xs">Beta</span>
                  </div>
                </div>

                {/* Chat messages area */}
                <div className="flex-1 p-4 md:p-5 space-y-4 overflow-y-auto">
                  {/* User query bubble */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground break-words">
                        {activeQuery}
                        {phase === "typing" && !isUserSearch && showCursor && (
                          <span className="text-muted-foreground">|</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* AI response bubble */}
                  <AnimatePresence mode="wait">
                    {phase === "thinking" && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 md:gap-3"
                      >
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-primary-foreground font-medium">AI</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-2">
                          <span className="thinking-dots flex gap-1">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-200"></span>
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {phase === "results" && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-2 md:gap-3"
                      >
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-primary-foreground font-medium">AI</span>
                        </div>
                        <div className="flex-1 space-y-3 min-w-0">
                          <p className="text-sm text-muted-foreground mb-4">
                            {activeResponseText}
                          </p>
                          
                          {/* 👇 TEST DATA NOTICE (appears for both demo and API results) */}
                          <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded-md mb-4 flex items-center gap-2 border border-amber-200">
                            <AlertTriangle size={14} className="flex-shrink-0" />
                            <span>This data is for testing purposes only.</span>
                          </div>

                          {/* Rendering Data from API */}
                          {isUserSearch ? (
                            userSearchResults.map((result, index) => (
                              <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.12 }}
                                className="result-card"
                              >
                                <div className="flex items-center gap-3 md:gap-4">
                                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                      {result.metadata?.name || "Anonymous User"}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate uppercase">
                                      {result.entityType}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-xs md:text-sm text-foreground">
                                      {result.metadata?.pricing || "Inquire for Rate"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {result.metadata?.location || result.metadata?.city || "Remote"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                                  {result.metadata?.contact && (
                                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                      Contact: {result.metadata?.contact}
                                    </button>
                                  )}
                                  {result.metadata?.contact && <span className="text-border">•</span>}
                                  <button 
                                    onClick={() => handleChatWithAgent(result.id, result?.metadata?.name || "Agent")}
                                    className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
                                  >
                                    Chat with AI Agent
                                  </button>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            /* Rendering Static Demo Results */
                            currentDemo.results.map((result, index) => (
                              <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.12 }}
                                className="result-card"
                              >
                                <div className="flex items-center gap-3 md:gap-4">
                                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{result.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{result.role}</p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-xs md:text-sm text-foreground">{result.price}</p>
                                    <p className="text-xs text-muted-foreground">{result.location}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                  </button>
                                  <span className="text-border">•</span>
                                  <button 
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    Chat with AI Agent
                                  </button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Chat input */}
                <div className="p-3 md:p-4 border-t border-chat-border flex-shrink-0 bg-background">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <input
                      type="text"
                      placeholder="Ask anything about real people, services, prices..."
                      className="chat-input w-60 md:w-72 text-sm bg-secondary/20"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onFocus={handleInputFocus}
                      onKeyPress={handleKeyPress}
                    />
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-28 md:w-32 px-3 py-2 text-xs md:text-sm rounded-md border border-border bg-secondary/20 text-foreground"
                    >
                      <option value="">All</option>
                      <option value="freelancer">Freelancers</option>
                      <option value="job">Jobs</option>
                      <option value="influencer">Influencers</option>
                      <option value="agency">Agencies</option>
                    </select>
                    <button
                      onClick={handleUserSearch}
                      disabled={!userInput.trim()}
                      className="w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-2 text-center">
                    Search powered by Finitezen Semantic Vector Index
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AISearch;