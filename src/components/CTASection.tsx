import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-spacing border-t border-border bg-secondary/30">
      <div className="container-architectural text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-headline mb-6">
            Ready to discover?
          </h2>
          <p className="text-subheadline mx-auto mb-10">
            Try the AI search and find real people, real prices, real answers.
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
  );
};

export default CTASection;
