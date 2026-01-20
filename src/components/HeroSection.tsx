import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AISearchDemo from "./AISearchDemo";
import AfterSearchChatDemo from "./AfterSearchChatDemo";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-grid-pattern">
      {/* Top spacer for header */}
      <div className="h-16" />

      <div className="container-architectural section-spacing">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="text-overline">
              AI Discovery Infrastructure
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-headline mb-6"
          >
            Ask once. Get real answers.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-subheadline mx-auto mb-10"
          >
            Finitezen helps AI find real people, real listings, and real prices —
            using structured, owner-updated data. No browsing. No guesswork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/ai-search" className="btn-primary">
              Try AI Search (Beta)
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              How Finitezen Works
            </Link>
          </motion.div>
        </div>

        {/* AI Search Demo */}
        <AISearchDemo />
        <AfterSearchChatDemo/>
      </div>
    </section>
  );
};

export default HeroSection;
