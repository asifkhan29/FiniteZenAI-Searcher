import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const linkHoverVariants = {
    rest: { x: 0 },
    hover: { x: 4, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-foreground text-background border-t border-white/10">
      <motion.div
        className="container-architectural py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                className="text-lg font-medium text-background"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Finitezen
              </motion.span>
              <motion.span
                className="px-2 py-0.5 text-[10px] font-medium bg-white/10 text-background/80 rounded-full border border-white/20"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Beta
              </motion.span>
            </div>
            <p className="text-background/60 max-w-md text-sm leading-relaxed">
              Discovery infrastructure for the AI era. One query. Real answers.
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-medium text-background mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { to: "/ai-search", label: "AI Search" },
                { to: "/add-listing", label: "Add Your Listing" },
                { to: "/how-it-works", label: "How It Works" },
              ].map((link) => (
                <motion.li
                  key={link.to}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Link to={link.to}>
                    <motion.span
                      className="text-background/60 text-sm hover:text-background transition-colors inline-block"
                      variants={linkHoverVariants}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-medium text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Privacy", "Terms"].map((item) => (
                <motion.li
                  key={item}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.span
                    className="text-background/60 text-sm hover:text-background transition-colors cursor-pointer inline-block"
                    variants={linkHoverVariants}
                  >
                    {item}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Animated Divider */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Subtle animated gradient line */}
          <motion.div
            className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-background/40 text-xs"
              whileHover={{ opacity: 0.8 }}
            >
              © 2024 Finitezen. All rights reserved.
            </motion.p>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="text-background/40 text-xs">
                Beta — In Development
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
