import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Ready Profiles",
    description:
      "Businesses submit structured information — services, pricing, location, and availability — in a format AI can understand.",
  },
  {
    title: "Verified & Owner-Controlled",
    description:
      "Listings are created and updated by owners, not scraped from the web or guessed by algorithms.",
  },
  {
    title: "Always Up-to-Date",
    description:
      "When details change, owners update once — and AI instantly reflects the latest truth.",
  },
  {
    title: "AI Agent for Every Listing",
    description:
      "Each profile gets its own AI assistant to answer questions, share details, and guide users instantly.",
  },
];

const SolutionSection = () => {
  return (
    <section className="section-spacing border-t border-border bg-secondary/30">
      <div className="container-architectural">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-overline mb-4 block">The Answer Layer</span>
          <h2 className="text-headline mb-6">
            How Finitezen fixes this
          </h2>
          <p className="text-body">
            We don’t help users browse pages.  
            <strong> We help AI give real answers.</strong>
          </p>
        </motion.div>

        <div className="bento-grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bento-item"
            >
              <h3 className="text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-body text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
