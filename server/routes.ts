import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (existingProfile) return;

  console.log("Seeding database...");

  // Profile
  await storage.createProfile({
    name: "Olawale Amos Akanji",
    title: "PhD Candidate in Computer Engineering (Security and Privacy)",
    bio: "PhD candidate specializing in AI-driven risk modeling and fraud detection systems for consumer financial services. Research combines Natural Language Processing, Deep Learning, and probabilistic modeling to detect complex fraud patterns across digital platforms. Experience includes building ML-powered compliance verification systems, cross-platform fraud detection architectures, and automated risk assessment tools.",
    location: "Boston, MA, USA",
    email: "olawalea@bu.edu",
    github: "https://github.com/marshalwahlexyz1",
    linkedin: "https://www.linkedin.com/in/olawaleakanji"
  });

  // Education
  await storage.createEducation({
    school: "Boston University",
    degree: "PhD in Computer Engineering (Security and Privacy)",
    year: "Expected May 2027",
    details: "Relevant Coursework: Advanced Cybersecurity, Computer Networks, Machine Learning, NLP"
  });
  await storage.createEducation({
    school: "Boston University",
    degree: "MS in Computer Engineering",
    year: "May 2025",
    details: ""
  });
  await storage.createEducation({
    school: "Air Force Institute of Technology",
    degree: "BSc in Cybersecurity",
    year: "May 2023",
    details: "Overall Best Graduating Student, CGPA 4.99/5.0. Relevant Coursework: Network Security, Digital Forensics, Operating Systems Security"
  });

  // Experience
  await storage.createExperience({
    role: "Graduate Teaching Assistant, EC521 Cybersecurity",
    company: "Boston University",
    duration: "2024--2025",
    description: "Designed and deployed Capture-The-Flag (CTF) environments simulating Network Flooding (SYN/UDP floods) to test student defense strategies. Mentored 50+ graduate students on practical mitigation techniques for web vulnerabilities using Burp Suite and Linux. Developed hands-on curriculum modules focusing on machine learning security, reverse engineering of malware binaries, and secure coding practices."
  });
  await storage.createExperience({
    role: "Network Security Engineer Intern",
    company: "Galaxy Backbone Limited (Tier IV Data Center)",
    duration: "2021--2022",
    description: "Defended Tier IV Data Center infrastructure against volumetric DDoS attacks and SQL injections, maintaining 99.99% uptime for government clients. Utilized Splunk for real-time traffic correlation and Palo Alto Firewalls to block malicious IPs and mitigate threats during active campaigns. Engineered Python scripts integrated with EDR telemetry to reduce Time-to-Detect (TTD) by 40% during critical vulnerabilities like Log4Shell. Conducted comprehensive vulnerability scans using Nessus across 200+ Windows/Linux servers."
  });
  await storage.createExperience({
    role: "Cybersecurity Specialist (Veteran)",
    company: "Nigerian Air Force",
    duration: "2012--2023",
    description: "Implemented custom Snort rules and spectrum analysis protocols to protect Command & Control (C2) links from electronic warfare interference. Deployed network segmentation on Cisco IOS and Linux gateways to isolate mission-critical subnets from compromised endpoints. Performed deep packet inspection using Wireshark and Tcpdump to neutralize anomalous command traffic targeting air defense systems."
  });

  // Projects
  await storage.createProject({
    title: "Cross-Platform Fraud Detection via Probabilistic State Modeling and Deep Learning",
    description: "Developing fraud detection system combining Hidden Markov Models with fine-tuned LLMs (DeBERTa) to track pig-butchering scams. Engineering cross-platform state handoff protocol. Building multi-label trigger classifier leveraging LLM embeddings. Collecting IRB-approved dataset across 7 emerging markets.",
    technologies: ["Hidden Markov Models", "LLMs", "DeBERTa", "Bayesian belief tracking", "Monte Carlo simulation"],
    link: "#",
    conference: null,
    publishedAt: null
  });
  await storage.createProject({
    title: "The Cost of Convenience: Identifying, Analyzing, and Mitigating Predatory Loan Applications",
    description: "Engineered an end-to-end security assessment pipeline to audit digital lending apps across 5 countries. Implemented LLM-assisted policy-to-permission mapping. Performed responsible disclosure to Google, leading to the removal of 93 predatory apps (300M+ cumulative installs).",
    technologies: ["Static Analysis", "Dynamic Testing", "Network Traffic Inspection", "LLM"],
    link: "#",
    conference: "ACM AsiaCCS 2026",
    publishedAt: "2026"
  });

  // Skills
  await storage.createSkill({
    category: "Machine Learning & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Transformer architectures (BERT, GPT, DeBERTa)", "Transfer Learning", "SHAP", "LIME"]
  });
  await storage.createSkill({
    category: "Probabilistic Methods & Statistics",
    items: ["Hidden Markov Models", "Bayesian Inference", "Monte Carlo Simulation", "Markov Chains", "Time Series Forecasting", "A/B Testing"]
  });
  await storage.createSkill({
    category: "NLP & Large Language Models",
    items: ["HuggingFace Transformers", "Prompt Engineering", "Fine-tuning LLMs", "Text Classification", "NER", "Sentiment Analysis", "Semantic Embedding Models"]
  });
  await storage.createSkill({
    category: "Data Science & Analytics",
    items: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "SQL", "PySpark", "Hadoop", "Statistical Modeling"]
  });
  await storage.createSkill({
    category: "Software Engineering",
    items: ["Python", "Java", "C++", "Bash", "Git/GitHub", "Docker", "CI/CD", "Linux Administration", "AWS"]
  });

  console.log("Database seeded!");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the database on startup
  seedDatabase().catch(console.error);

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.send.path, async (req, res) => {
    try {
      const input = api.contact.send.input.parse(req.body);
      // In a real app, send email here. For now just log it.
      console.log("Contact form submission:", input);
      res.json({ message: "Message sent successfully" });
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
