import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ArrowLeft, Info, X, MapPin, DollarSign, Briefcase } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";

interface AgentProfile {
  id: string;
  name: string;
  role: string;
  price: string;
  location: string;
  description: string;
  experience: string;
  skills: string[];
  availability: string;
  responseTime: string;
}

interface ChatMessage {
  id: number;
  sender: "user" | "agent";
  text: string;
  timestamp: Date;
}

// Mock agent database
const agentDatabase: Record<string, AgentProfile> = {
  "arjun-mehta": {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "React Freelancer",
    price: "₹8,000 – ₹12,000",
    location: "Mumbai",
    description: "Experienced React developer specializing in modern web applications, responsive design, and performance optimization.",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    availability: "Available for new projects",
    responseTime: "Usually responds within 2 hours",
  },
  "priya-sharma": {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Full-Stack Developer",
    price: "₹10,000 – ₹15,000",
    location: "Bangalore",
    description: "Full-stack developer with expertise in building scalable web applications from scratch.",
    experience: "6+ years",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    availability: "Available from next week",
    responseTime: "Usually responds within 1 hour",
  },
  "rahul-verma": {
    id: "rahul-verma",
    name: "Rahul Verma",
    role: "Frontend Specialist",
    price: "₹7,500 – ₹11,000",
    location: "Delhi",
    description: "Frontend specialist focused on creating beautiful, accessible user interfaces.",
    experience: "4+ years",
    skills: ["React", "Vue.js", "CSS Animation", "Figma", "Accessibility"],
    availability: "Currently available",
    responseTime: "Usually responds within 30 minutes",
  },
  "sneha-kapoor": {
    id: "sneha-kapoor",
    name: "Sneha Kapoor",
    role: "Lifestyle Influencer",
    price: "₹5,000 – ₹8,000",
    location: "Mumbai",
    description: "Lifestyle and wellness influencer with engaged audience interested in health and self-care.",
    experience: "3+ years",
    skills: ["Instagram Reels", "Stories", "Brand Collaborations", "Photography"],
    availability: "Open for collaborations",
    responseTime: "Usually responds within 4 hours",
  },
  "vikram-singh": {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Tech Reviewer",
    price: "₹7,000 – ₹10,000",
    location: "Pune",
    description: "Tech reviewer and gadget enthusiast with a loyal following interested in latest technology.",
    experience: "4+ years",
    skills: ["Video Reviews", "Unboxing", "Tech Content", "YouTube"],
    availability: "Available for brand deals",
    responseTime: "Usually responds within 3 hours",
  },
  "deepa-joshi": {
    id: "deepa-joshi",
    name: "Deepa Joshi",
    role: "Certified Yoga Trainer",
    price: "₹800 – ₹1,200/session",
    location: "Andheri",
    description: "Certified yoga instructor offering personalized sessions for beginners to advanced practitioners.",
    experience: "8+ years",
    skills: ["Hatha Yoga", "Vinyasa", "Meditation", "Breathing Exercises"],
    availability: "Morning and evening slots",
    responseTime: "Usually responds within 1 hour",
  },
  "karan-malhotra": {
    id: "karan-malhotra",
    name: "Karan Malhotra",
    role: "Brand Identity Designer",
    price: "₹3,500 – ₹5,000",
    location: "Hyderabad",
    description: "Creative designer specializing in brand identity, logos, and visual storytelling.",
    experience: "5+ years",
    skills: ["Logo Design", "Brand Guidelines", "Illustrator", "Photoshop"],
    availability: "Currently taking projects",
    responseTime: "Usually responds within 2 hours",
  },
};

// AI response generator based on context
const generateAgentResponse = (agent: AgentProfile, userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("charge") || lowerMessage.includes("rate")) {
    return `My rates are ${agent.price}. This can vary depending on the scope and complexity of the project. Would you like to discuss your specific requirements?`;
  }
  
  if (lowerMessage.includes("available") || lowerMessage.includes("free") || lowerMessage.includes("start")) {
    return `${agent.availability}. ${agent.responseTime}. Would you like to schedule a call to discuss your project?`;
  }
  
  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("portfolio")) {
    return `I have ${agent.experience} of experience. ${agent.description} My key skills include ${agent.skills.slice(0, 3).join(", ")}. Would you like to see some of my previous work?`;
  }
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return `Hello! I'm ${agent.name}, a ${agent.role} based in ${agent.location}. How can I help you today?`;
  }
  
  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("tool")) {
    return `I specialize in ${agent.skills.join(", ")}. Is there a specific technology you're looking for help with?`;
  }
  
  if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("based")) {
    return `I'm based in ${agent.location}, but I work with clients remotely as well. Where are you located?`;
  }
  
  // Default response
  return `Thank you for your message! I'm ${agent.name}, and I'd be happy to discuss how I can help with your project. ${agent.description} Feel free to ask me about my experience, rates, or availability.`;
};

const AgentChat = () => {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent") || "arjun-mehta";
  const agent = agentDatabase[agentId] || agentDatabase["arjun-mehta"];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "agent",
      text: `Hello! I'm ${agent.name}'s AI assistant. I can answer questions about ${agent.name}'s services, pricing, availability, and more. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: messages.length + 2,
        sender: "agent",
        text: generateAgentResponse(agent, inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Header />
      
      <main className="pt-16 min-h-screen flex flex-col">
        {/* Header area */}
        <div className="container-architectural py-4 md:py-6">
          <Link 
            to="/ai-search" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 md:mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
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
              {/* Chat header with agent info */}
              <div className="px-4 md:px-5 py-3 md:py-4 border-b border-chat-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.role} • {agent.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="p-2 rounded-md hover:bg-secondary transition-colors"
                    title="View Details"
                  >
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Chat notice */}
              <div className="px-4 md:px-5 py-2 border-b border-chat-border bg-secondary/30">
                <p className="text-xs text-muted-foreground text-center">
                  You are chatting with {agent.name}'s AI Agent
                </p>
              </div>

              {/* Chat messages area */}
              <div className="flex-1 p-4 md:p-5 space-y-4 overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-2 md:gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user" ? "bg-primary" : "bg-secondary"
                      }`}>
                        {message.sender === "user" ? (
                          <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                        ) : (
                          <span className="text-xs text-muted-foreground font-medium">AI</span>
                        )}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-foreground"
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground font-medium">AI</span>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg">
                      <span className="thinking-dots flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></span>
                      </span>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 md:p-4 border-t border-chat-border flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                  <input
                    type="text"
                    placeholder={`Ask ${agent.name}'s AI anything...`}
                    className="chat-input flex-1 text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-background">
                <h2 className="text-lg font-medium text-foreground">Profile Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 rounded hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-5 space-y-5">
                {/* Profile header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                </div>

                {/* Info cards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm text-foreground">{agent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Price Range</p>
                      <p className="text-sm text-foreground">{agent.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="text-sm text-foreground">{agent.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">About</p>
                  <p className="text-sm text-foreground">{agent.description}</p>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-secondary text-xs text-foreground rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Availability</p>
                  <p className="text-sm text-foreground">{agent.availability}</p>
                  <p className="text-xs text-muted-foreground mt-1">{agent.responseTime}</p>
                </div>

                {/* Contact button */}
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Contact {agent.name}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentChat;
