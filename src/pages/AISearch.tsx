import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface ResultCard {
  id: string;
  name: string;
  role: string;
  price: string;
  location: string;
}

interface DemoQuery {
  query: string;
  responseText: string;
  results: ResultCard[];
}

// Extended mock database for user searches
const allResults: ResultCard[] = [
  { id: "arjun-mehta", name: "Arjun Mehta", role: "React Freelancer", price: "₹8,000 – ₹12,000", location: "Mumbai" },
  { id: "priya-sharma", name: "Priya Sharma", role: "Full-Stack Developer", price: "₹10,000 – ₹15,000", location: "Bangalore" },
  { id: "rahul-verma", name: "Rahul Verma", role: "Frontend Specialist", price: "₹7,500 – ₹11,000", location: "Delhi" },
  { id: "sneha-kapoor", name: "Sneha Kapoor", role: "Lifestyle Influencer", price: "₹5,000 – ₹8,000", location: "Mumbai" },
  { id: "vikram-singh", name: "Vikram Singh", role: "Tech Reviewer", price: "₹7,000 – ₹10,000", location: "Pune" },
  { id: "aisha-khan", name: "Aisha Khan", role: "Fashion Creator", price: "₹6,500 – ₹9,500", location: "Delhi" },
  { id: "sunrise-apartments", name: "Sunrise Apartments", role: "2BHK Furnished", price: "₹35,000/month", location: "Koramangala" },
  { id: "green-valley-homes", name: "Green Valley Homes", role: "2BHK Semi-Furnished", price: "₹32,000/month", location: "Indiranagar" },
  { id: "urban-nest", name: "Urban Nest", role: "2BHK Furnished", price: "₹38,000/month", location: "HSR Layout" },
  { id: "deepa-joshi", name: "Deepa Joshi", role: "Certified Yoga Trainer", price: "₹800 – ₹1,200/session", location: "Andheri" },
  { id: "rohan-nair", name: "Rohan Nair", role: "Yoga & Meditation Coach", price: "₹1,000 – ₹1,500/session", location: "Bandra" },
  { id: "meera-patel", name: "Meera Patel", role: "Hatha Yoga Specialist", price: "₹700 – ₹1,000/session", location: "Powai" },
  { id: "karan-malhotra", name: "Karan Malhotra", role: "Brand Identity Designer", price: "₹3,500 – ₹5,000", location: "Hyderabad" },
  { id: "anjali-rao", name: "Anjali Rao", role: "Visual Designer", price: "₹2,500 – ₹4,500", location: "Chennai" },
  { id: "saurabh-gupta", name: "Saurabh Gupta", role: "Logo Specialist", price: "₹3,000 – ₹4,000", location: "Jaipur" },
  { id: "neha-kumar", name: "Neha Kumar", role: "Content Writer", price: "₹2,000 – ₹5,000", location: "Mumbai" },
  { id: "amit-patel", name: "Amit Patel", role: "SEO Specialist", price: "₹8,000 – ₹15,000", location: "Ahmedabad" },
  { id: "ritu-singh", name: "Ritu Singh", role: "Social Media Manager", price: "₹10,000 – ₹20,000", location: "Delhi" },
];

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
  },
  {
    query: "instagram influencer under ₹8k for tech product review with 50k+ followers",
    responseText: "Found 3 tech influencers matching your requirements:",
    results: [
      { id: "vikram-singh", name: "Vikram Singh", role: "Tech Reviewer • 85K followers", price: "₹6,000 – ₹8,000", location: "Pune" },
      { id: "tech-savvy-priya", name: "Tech Savvy Priya", role: "Gadget Reviewer • 72K followers", price: "₹5,500 – ₹7,500", location: "Bangalore" },
      { id: "digital-raj", name: "Digital Raj", role: "Tech Unboxer • 56K followers", price: "₹4,000 – ₹6,500", location: "Mumbai" },
    ],
  },
  {
    query: "2BHK furnished flat in koramangala bangalore under ₹35,000 with gym and parking",
    responseText: "Found 3 properties with all amenities you need:",
    results: [
      { id: "sunrise-apartments", name: "Sunrise Residency", role: "2BHK Furnished • Gym + Parking", price: "₹32,000/month", location: "Koramangala 4th Block" },
      { id: "green-valley-homes", name: "Green Valley Towers", role: "2BHK Semi-Furnished • All Amenities", price: "₹34,000/month", location: "Koramangala 6th Block" },
      { id: "urban-nest", name: "Urban Nest Complex", role: "2BHK Fully Furnished • Premium", price: "₹35,000/month", location: "Koramangala 1st Block" },
    ],
  },
  {
    query: "certified yoga instructor for morning home sessions in bandra under ₹1000/class",
    responseText: "Found 3 certified yoga instructors near Bandra:",
    results: [
      { id: "rohan-nair", name: "Rohan Nair", role: "Hatha Yoga • 6AM-9AM slots", price: "₹800 – ₹1,000/session", location: "Bandra West" },
      { id: "deepa-joshi", name: "Deepa Joshi", role: "Power Yoga • Morning specialist", price: "₹750 – ₹950/session", location: "Bandra East" },
      { id: "meera-patel", name: "Meera Patel", role: "Vinyasa Flow • Home visits", price: "₹900 – ₹1,100/session", location: "Khar" },
    ],
  },
  {
    query: "CA for GST filing and ITR for small business in hyderabad under ₹5000/month",
    responseText: "Found 3 Chartered Accountants for small business:",
    results: [
      { id: "arun-reddy-ca", name: "Arun Reddy & Associates", role: "GST + ITR + Compliance", price: "₹4,500/month", location: "Jubilee Hills" },
      { id: "srinivas-accounting", name: "Srinivas Accounting Services", role: "Full Tax Support • 10+ yrs exp", price: "₹3,800/month", location: "Madhapur" },
      { id: "lakshmi-ca-firm", name: "Lakshmi CA Firm", role: "Startup Specialist • GST Expert", price: "₹4,200/month", location: "Banjara Hills" },
    ],
  },
];

// Search function to find matching results
const searchResults = (query: string): ResultCard[] => {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  return allResults.filter(result => {
    const searchText = `${result.name} ${result.role} ${result.location}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword));
  }).slice(0, 5);
};

const AISearch = () => {
  const navigate = useNavigate();
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "thinking" | "results">("typing");
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [userSearchResults, setUserSearchResults] = useState<ResultCard[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isUserSearch, setIsUserSearch] = useState(false);

  const currentDemo = demoQueries[currentQueryIndex];

  const resetToNextQuery = useCallback(() => {
    setCurrentQueryIndex((prev) => (prev + 1) % demoQueries.length);
    setPhase("typing");
    setDisplayedText("");
  }, []);

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
    setDisplayedText(userInput);
    setPhase("thinking");
    setUserInput("");

    // Simulate AI thinking
    setTimeout(() => {
      const results = searchResults(userInput);
      setUserSearchResults(results.length > 0 ? results : allResults.slice(0, 3));
      setPhase("results");
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUserSearch();
    }
  };

  const handleChatWithAgent = (agentId: string) => {
    navigate(`/agent-chat?agent=${agentId}`);
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

  const activeResults = isUserSearch ? userSearchResults : currentDemo.results;
  const activeQuery = isUserSearch ? userSearchQuery : displayedText;
  const activeResponseText = isUserSearch 
    ? `Found ${userSearchResults.length} results matching your query:` 
    : currentDemo.responseText;

  return (
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

        {/* Chat interface - full height */}
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
                  {isUserSearch ? (
                    <button 
                      onClick={resetToAutoMode}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Watch demo
                    </button>
                  ) : isAutoMode ? (
                    <span className="text-xs text-muted-foreground">Auto-demo</span>
                  ) : null}
                  <span className="badge-beta text-xs">Beta</span>
                </div>
              </div>

              {/* Query indicator */}
              {isAutoMode && !isUserSearch && (
                <div className="px-4 md:px-5 py-2 border-b border-chat-border flex items-center gap-2 overflow-x-auto flex-shrink-0">
                  {demoQueries.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQueryIndex(index);
                        setPhase("typing");
                        setDisplayedText("");
                      }}
                      className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                        index === currentQueryIndex ? "bg-foreground" : "bg-border hover:bg-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                    Demo {currentQueryIndex + 1} of {demoQueries.length}
                  </span>
                </div>
              )}

              {/* Chat messages area */}
              <div className="flex-1 p-4 md:p-5 space-y-4 overflow-y-auto">
                {/* User query */}
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

                {/* AI response */}
                <AnimatePresence mode="wait">
                  {phase === "thinking" && (
                    <motion.div
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
                      className="flex items-start gap-2 md:gap-3"
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary-foreground font-medium">AI</span>
                      </div>
                      <div className="flex-1 space-y-3 min-w-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          {activeResponseText}
                        </p>
                        {activeResults.map((result, index) => (
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
                                onClick={() => handleChatWithAgent(result.id)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                              >
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
              <div className="p-3 md:p-4 border-t border-chat-border flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                  <input
                    type="text"
                    placeholder="Ask anything about real people, services, prices..."
                    className="chat-input flex-1 text-sm"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onFocus={handleInputFocus}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={handleUserSearch}
                    disabled={!userInput.trim()}
                    className="w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Beta — Results are demo data for illustration
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AISearch;
