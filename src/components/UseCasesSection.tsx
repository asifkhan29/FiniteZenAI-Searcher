import { motion } from "framer-motion";
import { User, Send } from "lucide-react";

const useCases = [
  {
    query: "React freelancer who can create a website in ₹10,000",
    result: {
      name: "Arjun Mehta",
      role: "React Developer",
      price: "₹8,000 – ₹12,000",
    },
  },
  {
    query: "Instagram influencer under ₹10k for brand collab",
    result: {
      name: "Sneha Kapoor",
      role: "Lifestyle Influencer • 50K followers",
      price: "₹5,000 – ₹8,000",
    },
  },
  {
    query: "2BHK flat under ₹40k in Bangalore",
    result: {
      name: "Greenwood Apartments",
      role: "2BHK • Semi-Furnished • Koramangala",
      price: "₹35,000/month",
    },
  },
];

const UseCasesSection = () => {
  return (
    <section className="section-spacing border-t border-border">
      <div className="container-architectural">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-overline mb-4 block">Use Cases</span>
          <h2 className="text-headline mb-6">
            Real queries. Real answers.
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-2xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.query}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-architectural overflow-hidden"
            >
              {/* Query */}
              <div className="p-4 border-b border-border flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <p className="text-sm text-foreground">{useCase.query}</p>
              </div>

              {/* Result */}
              <div className="p-4 bg-secondary/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{useCase.result.name}</p>
                    <p className="text-xs text-muted-foreground">{useCase.result.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{useCase.result.price}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 pt-3 border-t border-border">
                  <button className="btn-ghost text-xs py-1 px-3">
                    Contact
                  </button>
                  <button className="btn-ghost text-xs py-1 px-3 flex items-center gap-1.5">
                    <Send className="w-3 h-3" />
                    Chat with AI Agent
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
