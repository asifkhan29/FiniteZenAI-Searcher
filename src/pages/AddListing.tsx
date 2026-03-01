import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, MessageSquare, Loader2, ChevronRight, Send, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categoryQuestions = {
  freelancer: [
    { id: "fl_tech_stack", q: "What is your primary tech stack or creative niche?", priority: "high" },
    { id: "fl_sub_skills", q: "What are your top 3 specific sub-skills (e.g., Spring Boot, UI Design)?", priority: "high" },
    { id: "fl_experience_years", q: "How many years of professional experience do you have?", priority: "high" },
    { id: "fl_starting_price", q: "What is your typical project starting price in INR?", priority: "high" },
    { id: "fl_location_pref", q: "Which cities or timezones are you available for (Remote/On-site)?", priority: "high" },
    { id: "fl_turnaround", q: "What is your typical turnaround time for a standard landing page/project?", priority: "high" },
    { id: "fl_problem_solving", q: "What specific problems do you solve for clients?", priority: "high" },
    { id: "fl_industries", q: "What industries have you worked in (e.g., FinTech, E-commerce)?", priority: "high" },
    { id: "fl_specialization", q: "What technologies or frameworks do you specialize in?", priority: "high" },
    { id: "fl_availability", q: "Are you available immediately or after a notice period?", priority: "high" },
    { id: "fl_contract_pref", q: "Do you prefer fixed-price or hourly contracts?", priority: "high" },
    { id: "fl_success_story", q: "Describe your most successful project and the impact it had.", priority: "mid" },
    { id: "fl_workflow", q: "What is your step-by-step workflow from discovery to delivery?", priority: "mid" },
    { id: "fl_tools_daily", q: "What industry-standard tools do you use daily (e.g., Figma, Docker)?", priority: "mid" },
    { id: "fl_revision_policy", q: "How do you handle revisions and feedback from clients?", priority: "mid" },
    { id: "fl_comm_pref", q: "What is your preferred mode of communication (Slack, Zoom, etc.)?", priority: "mid" },
    { id: "fl_portfolio_link", q: "Can you provide a link to your live portfolio or GitHub?", priority: "mid" },
    { id: "fl_international_exp", q: "Have you worked with international clients before? Which regions?", priority: "mid" },
    { id: "fl_recent_challenge", q: "What was the biggest technical challenge you solved recently?", priority: "mid" },
    { id: "fl_client_pref", q: "What type of clients do you prefer working with?", priority: "mid" },
    { id: "fl_devops_tools", q: "What tools do you use for version control and CI/CD?", priority: "mid" },
    { id: "fl_agile_exp", q: "Do you work in Agile/Scrum environments?", priority: "mid" },
    { id: "fl_payment_terms", q: "What are your standard payment terms (e.g., 50% upfront)?", priority: "low" },
    { id: "fl_maintenance", q: "Do you offer post-project support or maintenance? For how long?", priority: "low" },
    { id: "fl_retainer_open", q: "Are you open to long-term monthly retainers or only one-off projects?", priority: "low" },
    { id: "fl_education", q: "What is your highest educational qualification or certification?", priority: "low" },
    { id: "fl_unique_value", q: "What makes your work unique compared to others in your field?", priority: "low" },
    { id: "fl_team_size", q: "Do you work solo or do you have a small team?", priority: "low" },
    { id: "fl_delay_policy", q: "What is your policy on project cancellations or delays?", priority: "low" },
    { id: "fl_awards", q: "Any specific awards, recognition, or personal 'why' behind your work?", priority: "other" }
  ],
  influencer: [
    { id: "inf_niche", q: "What is your primary content niche (Tech, Fashion, Finance, etc.)?", priority: "high" },
    { id: "inf_platforms", q: "Which platforms are you most active on (Instagram, YouTube, LinkedIn)?", priority: "high" },
    { id: "inf_total_reach", q: "What is your total reach/follower count on your main platform?", priority: "high" },
    { id: "inf_audience_location", q: "Which city/country is the majority of your audience located in?", priority: "high" },
    { id: "inf_base_rate", q: "What is your base rate for a dedicated Reel or Video?", priority: "high" },
    { id: "inf_engagement_rate", q: "What is your average engagement rate per post (%)?", priority: "high" },
    { id: "inf_story_views", q: "What is your average story views per 24 hours?", priority: "high" },
    { id: "inf_gender_split", q: "What is your audience gender split (%)?", priority: "high" },
    { id: "inf_content_type", q: "Do you create short-form, long-form, or both?", priority: "high" },
    { id: "inf_performance_collab", q: "Are you open to performance-based collaborations?", priority: "high" },
    { id: "inf_audience_demo", q: "Describe the age group and primary interests of your followers.", priority: "mid" },
    { id: "inf_favorite_content", q: "What type of content do you enjoy creating most (Educational, Vlog, Comedy)?", priority: "mid" },
    { id: "inf_past_brands", q: "List 3-5 brands you have successfully collaborated with in the past.", priority: "mid" },
    { id: "inf_usage_rights", q: "Do you provide raw footage/usage rights for brand advertisements?", priority: "mid" },
    { id: "inf_lead_time", q: "What is your typical lead time from brief to final post?", priority: "mid" },
    { id: "inf_brand_safety", q: "How do you handle negative comments or brand safety on your profile?", priority: "mid" },
    { id: "inf_viral_example", q: "Have any of your posts crossed 100k+ views? Share an example.", priority: "mid" },
    { id: "inf_differentiation", q: "What differentiates your content from competitors?", priority: "mid" },
    { id: "inf_management", q: "Are you managed by an agency or do you handle your own PR?", priority: "low" },
    { id: "inf_events", q: "Do you attend store launches or offline brand events?", priority: "low" },
    { id: "inf_product_review_req", q: "What are your requirements for a brand to send a product for review?", priority: "low" },
    { id: "inf_ambassador_open", q: "Do you offer long-term brand ambassadorships?", priority: "low" },
    { id: "inf_refusal_formats", q: "Which content formats do you refuse to create (e.g., pranks)?", priority: "low" },
    { id: "inf_perf_reports", q: "Do you provide performance reports after a campaign ends?", priority: "low" },
    { id: "inf_exclusivity_policy", q: "What is your policy on promoting competing brands?", priority: "low" },
    { id: "inf_media_kit", q: "Share a link to your Media Kit or a viral case study.", priority: "other" }
  ],
  job: [
    { id: "job_title", q: "What is the exact Job Title and Department?", priority: "high" },
    { id: "job_ctc", q: "What is the fixed CTC or Salary Range offered?", priority: "high" },
    { id: "job_must_have_skills", q: "List the 'Must-Have' technical skills for this role.", priority: "high" },
    { id: "job_work_mode", q: "What is the work mode: Full-time Remote, Hybrid, or On-site?", priority: "high" },
    { id: "job_office_location", q: "Where is the office located (City and Area)?", priority: "high" },
    { id: "job_experience_required", q: "How many years of experience are required for this position?", priority: "high" },
    { id: "job_visa_support", q: "Is sponsorship/visa support available?", priority: "high" },
    { id: "job_tech_stack", q: "What tech stack will be used in this role?", priority: "high" },
    { id: "job_salary_negotiable", q: "Is the salary negotiable based on experience?", priority: "high" },
    { id: "job_employment_type", q: "What employment type is this (Permanent, Contract, Internship)?", priority: "high" },
    { id: "job_day_to_day", q: "Describe the day-to-day responsibilities in 3 sentences.", priority: "mid" },
    { id: "job_interview_process", q: "What are the stages of the interview process (e.g., HR, Technical)?", priority: "mid" },
    { id: "job_notice_period", q: "What is the expected notice period or joining date?", priority: "mid" },
    { id: "job_benefits", q: "What are the core benefits (Insurance, ESOPs, Gym, etc.)?", priority: "mid" },
    { id: "job_reporting_to", q: "Who will this role report to (e.g., Tech Lead, Manager)?", priority: "mid" },
    { id: "job_90_day_goals", q: "What are the performance expectations in the first 90 days?", priority: "mid" },
    { id: "job_relocation_support", q: "Is relocation support provided?", priority: "mid" },
    { id: "job_team_culture", q: "Describe the team culture in 3 keywords.", priority: "low" },
    { id: "job_growth_path", q: "What are the growth and promotion cycles at the company?", priority: "low" },
    { id: "job_role_reason", q: "Is this a new role due to expansion or a replacement?", priority: "low" },
    { id: "job_wfh_allowance", q: "Does the company provide hardware or WFH allowances?", priority: "low" },
    { id: "job_diversity_policy", q: "Are there any specific diversity or inclusion policies?", priority: "low" },
    { id: "job_company_vision", q: "What is the company's long-term vision or mission?", priority: "low" },
    { id: "job_apply_instr", q: "Any specific instructions for applicants (e.g., 'apply with portfolio')?", priority: "other" }
  ],
  agency: [
    { id: "ag_core_services", q: "What are your core agency services (e.g., SEO, Branding, App Dev)?", priority: "high" },
    { id: "ag_client_profile", q: "What is your typical client profile (Startups, SMEs, Enterprises)?", priority: "high" },
    { id: "ag_min_retainer", q: "What is your minimum monthly retainer or project fee?", priority: "high" },
    { id: "ag_industry_niches", q: "Which industry niches do you specialize in (e.g., Healthcare, Web3)?", priority: "high" },
    { id: "ag_office_locations", q: "Where is your head office and do you have branch offices?", priority: "high" },
    { id: "ag_active_clients", q: "How many active clients do you currently serve?", priority: "high" },
    { id: "ag_avg_contract_value", q: "What is your average client contract value?", priority: "high" },
    { id: "ag_geo_reach", q: "Do you work internationally or locally?", priority: "high" },
    { id: "ag_tech_specialization", q: "What platforms/tech stacks does your agency specialize in?", priority: "high" },
    { id: "ag_success_metrics", q: "Provide 2-3 specific success metrics from past clients (e.g., 50% ROI).", priority: "mid" },
    { id: "ag_team_exp", q: "What is the average experience level of your team members?", priority: "mid" },
    { id: "ag_onboarding_process", q: "What is your standard client onboarding and discovery process?", priority: "mid" },
    { id: "ag_proprietary_tech", q: "Do you have any proprietary tools or technology you use for clients?", priority: "mid" },
    { id: "ag_pm_method", q: "How do you handle project management and client reporting?", priority: "mid" },
    { id: "ag_project_timeline", q: "What is your typical project timeline from kickoff to launch?", priority: "mid" },
    { id: "ag_retention_rate", q: "What is your client retention rate (%)?", priority: "mid" },
    { id: "ag_team_size", q: "How large is your core team?", priority: "mid" },
    { id: "ag_pitch_policy", q: "Do you participate in unpaid pitches or spec work?", priority: "low" },
    { id: "ag_contract_duration", q: "What are your standard contract durations (e.g., 6 months)?", priority: "low" },
    { id: "ag_account_management", q: "Do you provide dedicated account managers for every client?", priority: "low" },
    { id: "ag_data_security", q: "What is your policy on data security and client confidentiality?", priority: "low" },
    { id: "ag_white_label", q: "Do you offer white-label services to other agencies?", priority: "low" },
    { id: "ag_awards", q: "List any major industry awards or recognitions.", priority: "low" },
    { id: "ag_case_study_link", q: "Provide a link to a detailed case study or your agency deck.", priority: "other" }
  ]
};

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    country: "",
    city: "",
    contact: "",
    enableChatbot: true,
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setAnswers({});
  }, [formData.category]);

  const activeQuestions = useMemo(() => {
    const questions = categoryQuestions[formData.category as keyof typeof categoryQuestions] || [];
    if (currentStep === 2) return questions.filter(q => q.priority === "high");
    if (currentStep === 3) return questions.filter(q => q.priority !== "high");
    return [];
  }, [formData.category, currentStep]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const validateStep2 = () => {
    if (currentStep !== 2) return true;
    const requiredIds = activeQuestions.map(q => q.id);
    return requiredIds.every(id => answers[id]?.trim());
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateStep2()) {
      alert("Please answer all high‑priority questions before continuing.");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const allQuestions = Object.values(categoryQuestions).flat();

    // Updated Overall Description to include City and Country
    let description = `I am ${formData.name}, a ${formData.category} located in ${formData.city || "N/A"}, ${formData.country || "N/A"}. Contact: ${formData.contact || "not provided"}. `;

    const qaParts = Object.entries(answers)
      .map(([id, answer]) => {
        const questionText = allQuestions.find(q => q.id === id)?.q || id;
        return `Regarding "${questionText}", the response is: ${answer}`;
      })
      .join("\n\n");
    
    description += qaParts;

    // Metadata updated to include city after country
    const payload = {
      entityType: formData.category,
      description,
      metadata: {
        name: formData.name,
        country: formData.country,
        city: formData.city,
        contact: formData.contact,
      },
    };

    try {
      const res = await fetch("http://localhost:8081/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Your listing and AI Chatbot are now live!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container max-w-4xl mx-auto py-24 px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Index Yourself in the <span className="text-primary">AI Layer.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Become discoverable via AI Search and generate a Personal AI Agent.
          </p>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${currentStep >= s ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-semibold">Identity & Location</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Display Name</label>
                      <input className="w-full p-2 rounded-md border border-input bg-background" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name or Brand" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select className="w-full p-2 rounded-md border border-input bg-background" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                        <option value="">Select Category</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="influencer">Influencer</option>
                        <option value="agency">Agency</option>
                        <option value="job">Job Opening</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <input className="w-full p-2 rounded-md border border-input bg-background" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="India" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input className="w-full p-2 rounded-md border border-input bg-background" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Mumbai" required />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} disabled={!formData.category || !formData.name || !formData.city} className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Next: Core Details <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-semibold">Search Essentials</h2>
                  <div className="space-y-6">
                    {activeQuestions.map((item) => (
                      <div key={item.id}>
                        <label className="text-sm font-medium mb-2 block">{item.q}</label>
                        <textarea className="w-full p-2 rounded-md border border-input bg-background" rows={2} value={answers[item.id] || ""} onChange={e => handleAnswerChange(item.id, e.target.value)} placeholder="Required for AI search indexing..." required />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="flex-1 border border-input py-2 rounded-md hover:bg-accent">Back</button>
                    <button type="button" onClick={nextStep} className="flex-1 bg-primary text-primary-foreground py-2 rounded-md">Continue</button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-semibold">Knowledge Base</h2>
                  <div className="space-y-6">
                    {activeQuestions.map((item) => (
                      <div key={item.id}>
                        <label className="text-sm font-medium mb-2 block">{item.q}</label>
                        <textarea className="w-full p-2 rounded-md border border-input bg-background" rows={2} value={answers[item.id] || ""} onChange={e => handleAnswerChange(item.id, e.target.value)} placeholder="Optional - adds depth to your AI" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="flex-1 border border-input py-2 rounded-md hover:bg-accent">Back</button>
                    <button type="button" onClick={nextStep} className="flex-1 bg-primary text-primary-foreground py-2 rounded-md">Final Step</button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-semibold">Publish</h2>
                  <div className="p-4 bg-primary/10 rounded-xl flex gap-4 items-center">
                    <CheckCircle2 className="text-primary" />
                    <p className="text-sm">Persona built with {Object.keys(answers).length} data points.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Public Contact (Email/Phone)</label>
                    <input className="w-full p-2 rounded-md border border-input bg-background" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="e.g. contact@domain.com" required />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="flex-1 border border-input py-2 rounded-md">Back</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground py-2 rounded-md flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Publish Agent</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddListing;