import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const platforms = [
  { name: "Google", delay: 0 },
  { name: "Google Maps", delay: 0.1 },
  { name: "Justdial", delay: 0.2 },
  { name: "Instagram", delay: 0.3 },
  { name: "WhatsApp groups", delay: 0.4 },
  { name: "Marketplaces", delay: 0.5 },
];

const problems = [
  { text: "Information is scattered across platforms" },
  { text: "Prices are missing or unclear" },
  { text: "Listings go outdated quickly" },
  { text: "Ads are shown instead of answers" },
  { text: "AI cannot reason over this data" },
  { text: "Real individuals remain invisible" },
];

const aiComparison = {
  traditional: {
    query: "java developer jobs in Mumbai",
    results: [
      { title: "Top job portals in India", views: "SEO result" },
      { title: "Naukri.com", views: "Sponsored" },
      { title: "Indeed career advice", views: "Article" },
    ],
    summary:
      "Popular pages ranked by traffic, ads, and SEO — not by relevance.",
  },
  finitezen: {
    query:
      "java developer jobs in mumbai andheri with 3 years experience around ₹1L salary",
    results: [
      {
        name: "TechCorp Solutions",
        role: "Java Developer",
        salary: "₹1.2L / month",
        location: "Andheri East",
        exp: "2–4 yrs",
      },
      {
        name: "Finova Systems",
        role: "Backend Engineer",
        salary: "₹95K / month",
        location: "Andheri West",
        exp: "3+ yrs",
      },
      {
        name: "DataStream Inc",
        role: "Java Full-Stack",
        salary: "₹1.1L / month",
        location: "MIDC Andheri",
        exp: "3 yrs",
      },
    ],
    summary:
      "Real roles matched directly to your exact criteria.",
  },
};

const ProblemSection = () => {
  const [activeTab, setActiveTab] =
    useState<"chatgpt" | "finitezen">("chatgpt");
  const [typingText, setTypingText] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const query =
      activeTab === "chatgpt"
        ? aiComparison.traditional.query
        : aiComparison.finitezen.query;

    setTypingText("");
    setShowResults(false);

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= query.length) {
        setTypingText(query.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [activeTab]);

  return (
    <section className="section-spacing border-t border-border">
      <div className="container-architectural">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-overline">The Problem</span>

          <h2 className="text-4xl md:text-5xl font-light mt-6 mb-6">
            Finding real people is harder than it should be.
          </h2>

          <p className="text-muted-foreground text-lg">
            Even after searching everywhere, users still don’t get a clear,
            usable answer.
          </p>
        </motion.div>

        {/* Platform Chaos */}
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-24">
          <div>
            <p className="text-caption mb-6">
              Users jump between platforms
            </p>

            <div className="space-y-3">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="p-4 border border-border rounded-lg text-sm text-foreground"
                >
                  {p.name}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground italic">
              Time spent searching rarely leads to certainty.
            </p>
          </div>

          <div>
            <p className="text-caption mb-6">
              What they actually get
            </p>

            <div className="grid grid-cols-2 gap-4">
              {problems.map((p) => (
                <div
                  key={p.text}
                  className="p-4 border border-border rounded-lg text-xs text-muted-foreground"
                >
                  {p.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="text-overline bg-foreground/5 px-4 py-2 rounded-full border border-border">
                The AI Problem
              </span>
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Even AI gives you <span className="text-muted-foreground">bird's-eye answers</span>
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              ChatGPT, Gemini, and others show popular results — not the specific ones you need.
            </p>
          </div>

          {/* Comparison Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setActiveTab("chatgpt")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border ${
                activeTab === "chatgpt"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ChatGPT / Gemini
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("finitezen")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border ${
                activeTab === "finitezen"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Finitezen
            </motion.button>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional AI */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: activeTab === "chatgpt" ? 1 : 0.4,
                x: 0,
                scale: activeTab === "chatgpt" ? 1 : 0.98
              }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-xl border ${
                activeTab === "chatgpt" ? "border-foreground/20 bg-secondary/30" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <span className="text-sm font-medium text-foreground">Traditional AI</span>
                {activeTab === "chatgpt" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                  >
                    Generic
                  </motion.span>
                )}
              </div>

              {/* Query input simulation */}
              <div className="p-3 rounded-lg border border-border bg-background mb-4">
                <p className="text-xs text-muted-foreground mb-1">Query:</p>
                <p className="text-sm text-foreground font-mono">
                  {activeTab === "chatgpt" ? typingText : aiComparison.traditional.query}
                  {activeTab === "chatgpt" && !showResults && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-foreground"
                    >
                      |
                    </motion.span>
                  )}
                </p>
              </div>

              {/* Results */}
              {(activeTab !== "chatgpt" || showResults) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {aiComparison.traditional.results.map((result, index) => (
                    <motion.div
                      key={result.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg border border-border/50 bg-background/50"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-foreground">{result.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          result.type === "ad" 
                            ? "bg-yellow-500/10 text-yellow-600" 
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {result.views}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs text-muted-foreground text-center pt-4 italic"
                  >
                    {aiComparison.traditional.summary}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>

            {/* Finitezen */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeTab === "finitezen" ? 1 : 0.4,
                x: 0,
                scale: activeTab === "finitezen" ? 1 : 0.98
              }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-xl border ${
                activeTab === "finitezen" ? "border-foreground/20 bg-secondary/30" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-xs text-background font-bold">F</span>
                </div>
                <span className="text-sm font-medium text-foreground">Finitezen</span>
                {activeTab === "finitezen" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-xs text-foreground bg-foreground/10 px-2 py-1 rounded border border-foreground/20"
                  >
                    Precise
                  </motion.span>
                )}
              </div>

              {/* Query input simulation */}
              <div className="p-3 rounded-lg border border-border bg-background mb-4">
                <p className="text-xs text-muted-foreground mb-1">Query:</p>
                <p className="text-sm text-foreground font-mono">
                  {activeTab === "finitezen" ? typingText : aiComparison.finitezen.query}
                  {activeTab === "finitezen" && !showResults && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-foreground"
                    >
                      |
                    </motion.span>
                  )}
                </p>
              </div>

              {/* Results */}
              {(activeTab !== "finitezen" || showResults) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {aiComparison.finitezen.results.map((result, index) => (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg border border-foreground/10 bg-background/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{result.name}</p>
                        <span className="text-xs text-foreground font-medium">
                          {result.salary}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{result.role}</span>
                        <span>•</span>
                        <span>{result.location}</span>
                        <span>•</span>
                        <span>{result.exp}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs text-foreground/70 text-center pt-4 font-medium"
                  >
                    {aiComparison.finitezen.summary}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Traditional AI surfaces what's popular. <br />
              <span className="text-foreground font-medium">Finitezen surfaces what's relevant.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
