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
  const agentId = searchParams.get("agent") || "unknown";
  const agentName = searchParams.get("name") || "Agent"; // Get name from URL
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "agent",
      text: `Hello! I'm ${agentName}'s AI assistant. I can answer questions about ${agentName}'s services, pricing, and experience. How can I help you today?`,
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Calling your Spring Boot API
      const response = await fetch(`https://aisearchengine.onrender.com/api/discovery/ask/${agentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userText }),
      });

      const data = await response.json();

      if (response.ok) {
        const agentResponse: ChatMessage = {
          id: Date.now() + 1,
          sender: "agent",
          text: data.answer, // Using the "answer" field from your Controller
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentResponse]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "agent",
        text: "I'm having trouble connecting to my knowledge base. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
        <div className="container-architectural py-4 md:py-6">
          <Link to="/ai-search" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </Link>
        </div>

        <div className="flex-1 container-architectural pb-6 md:pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full max-w-2xl mx-auto">
            <div className="chat-container h-full flex flex-col min-h-[500px] md:min-h-[600px]">
              {/* Chat header */}
              <div className="px-4 md:px-5 py-3 md:py-4 border-b border-chat-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{agentName}</p>
                    <p className="text-xs text-muted-foreground">AI Representative</p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 md:p-5 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user" ? "bg-primary" : "bg-secondary"}`}>
                      {message.sender === "user" ? <User className="w-4 h-4 text-primary-foreground" /> : <span className="text-xs font-medium">AI</span>}
                    </div>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><span className="text-xs">AI</span></div>
                    <div className="bg-secondary p-3 rounded-lg flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-chat-border bg-background">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Ask ${agentName}'s AI anything...`}
                    className="chat-input flex-1 text-sm bg-secondary/20"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isTyping}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AgentChat;
