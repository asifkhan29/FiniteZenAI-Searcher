import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Ask a natural language question",
    description: "Type any query — find freelancers, influencers, services, or properties with specific requirements.",
  },
  {
    number: "02",
    title: "AI processes structured data",
    description: "Finitezen's index contains owner-verified information with mandatory pricing and fresh updates.",
  },
  {
    number: "03",
    title: "Get real answers instantly",
    description: "Receive structured results with real people, real prices, and real availability — no ads, no noise.",
  },
  {
    number: "04",
    title: "Connect directly",
    description: "Contact providers or chat with their AI agent to get more details before reaching out.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-grid-pattern">
          <div className="h-16" />
          <div className="container-architectural section-spacing">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="text-overline">How It Works</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-headline mb-6"
              >
                Discovery infrastructure for the AI era.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-subheadline mx-auto"
              >
                Finitezen is not a marketplace. It's where AI finds real people — freelancers, influencers, service providers, and property owners — with structured, owner-updated data.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-spacing border-t border-border">
          <div className="container-architectural">
            <div className="max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pb-16 last:pb-0"
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-px bg-border" />
                  )}

                  <div className="flex gap-8">
                    {/* Number */}
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0 bg-background">
                      <span className="text-sm text-muted-foreground font-medium">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-body">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing border-t border-border bg-secondary/30">
          <div className="container-architectural text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <h2 className="text-headline mb-6">
                Try it yourself.
              </h2>
              <p className="text-subheadline mx-auto mb-10">
                Ask one question. Get real answers.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/" className="btn-primary">
                  Try AI Search (Beta)
                </Link>
                <Link to="/add-listing" className="btn-secondary">
                  Add Your Listing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
