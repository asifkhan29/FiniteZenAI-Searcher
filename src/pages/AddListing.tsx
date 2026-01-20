import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Upload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { value: "freelancer", label: "Freelancer" },
  { value: "influencer", label: "Influencer" },
  { value: "service", label: "Service Provider" },
  { value: "property", label: "Property Owner" },
];

const benefits = [
  "AI-first visibility",
  "No platform lock-in",
  "No bidding wars",
  "No algorithm games",
  "Pure discovery",
];

const AddListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    priceMin: "",
    priceMax: "",
    location: "",
    enableChatbot: true,
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, enableChatbot: !prev.enableChatbot }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-grid-pattern">
          <div className="h-16" />
          <div className="container-architectural section-spacing-sm">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="text-overline">Provider Onboarding</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-headline mb-6"
              >
                Make your work discoverable by AI.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-subheadline mx-auto"
              >
                List your services once. Let AI surface you everywhere.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-spacing-sm border-t border-border">
          <div className="container-architectural">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name / Brand
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name or brand"
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-select pr-10"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your services, skills, or offering..."
                      rows={4}
                      className="form-textarea"
                      required
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="form-label">
                      Price / Price Range <span className="text-muted-foreground">(Required)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="priceMin"
                        value={formData.priceMin}
                        onChange={handleChange}
                        placeholder="Min (e.g., ₹5,000)"
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        name="priceMax"
                        value={formData.priceMax}
                        onChange={handleChange}
                        placeholder="Max (e.g., ₹10,000)"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City or 'Remote'"
                      className="form-input"
                    />
                  </div>

                  {/* Profile Image */}
                  <div>
                    <label className="form-label">Profile Image</label>
                    <div className="border border-dashed border-border rounded-md p-8 text-center hover:bg-secondary/30 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </div>
                  </div>

                  {/* Enable AI Chatbot */}
                  <div className="flex items-center justify-between py-4 border-t border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Enable AI Chatbot</p>
                      <p className="text-xs text-muted-foreground">
                        Let visitors chat with your AI-powered assistant
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggle}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        formData.enableChatbot ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-primary-foreground transition-transform ${
                          formData.enableChatbot ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Contact */}
                  <div>
                    <label htmlFor="contact" className="form-label">
                      Contact Details
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Email or phone number"
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Note */}
                  <p className="text-caption">
                    Your data stays owner-controlled. No scraping. No ads.
                  </p>

                  {/* Submit */}
                  <button type="submit" className="btn-primary w-full">
                    Add Your Listing (Beta)
                  </button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-24">
                  <h3 className="text-lg font-medium text-foreground mb-6">
                    Why list on Finitezen?
                  </h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-10 p-6 bg-secondary/50 rounded-md border border-border">
                    <p className="text-sm text-muted-foreground">
                      "Finitezen is not a directory. Not a marketplace. It is the answer layer where AI discovers real people with real data — in one query."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AddListing;
