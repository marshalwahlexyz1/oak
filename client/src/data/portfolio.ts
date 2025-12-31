export const portfolioData = {
  profile: {
    id: 1,
    name: "Olawale Amos Akanji",
    title: "PhD Candidate in Computer Engineering (Security and Privacy)",
    bio: "PhD candidate specializing in AI-driven risk modeling and fraud detection systems for consumer financial services. Research combines Natural Language Processing, Deep Learning, and probabilistic modeling to detect complex fraud patterns across digital platforms. Experience includes building ML-powered compliance verification systems, cross-platform fraud detection architectures, and automated risk assessment tools.",
    location: "Boston, MA, USA",
    email: "olawalea@bu.edu",
    github: "https://github.com/marshalwahlexyz1",
    linkedin: "https://www.linkedin.com/in/olawaleakanji",
  },

  blog: [
    {
      id: 1,
      title: "Understanding Pig-Butchering Scams: A Deep Dive into Cross-Platform Fraud",
      excerpt: "Exploring how sophisticated fraud networks operate across multiple platforms and the AI-driven approaches we're developing to detect them in real-time.",
      content: "Full blog post content goes here...",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
      date: "December 15, 2025",
      readTime: "8 min read",
      tags: ["Fraud Detection", "Machine Learning", "Research"],
    },
    {
      id: 2,
      title: "My Journey from Nigerian Air Force to PhD Candidate at Boston University",
      excerpt: "A personal reflection on transitioning from military cybersecurity operations to academic research, and the lessons learned along the way.",
      content: "Full blog post content goes here...",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
      date: "November 28, 2025",
      readTime: "6 min read",
      tags: ["Personal", "Career", "Education"],
    },
    {
      id: 3,
      title: "How We Got 93 Predatory Loan Apps Removed from Google Play",
      excerpt: "The technical methodology behind our security assessment pipeline that led to responsible disclosure and removal of apps with 300M+ installs.",
      content: "Full blog post content goes here...",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60",
      date: "October 10, 2025",
      readTime: "10 min read",
      tags: ["Security", "Research", "Mobile Apps"],
    },
  ],
  
  education: [
    {
      id: 1,
      school: "Boston University",
      degree: "PhD in Computer Engineering (Security and Privacy)",
      year: "Expected May 2027",
      details: "Relevant Coursework: Advanced Cybersecurity, Computer Networks, Machine Learning, NLP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Boston_University_seal.svg/200px-Boston_University_seal.svg.png",
    },
    {
      id: 2,
      school: "Boston University",
      degree: "MS in Computer Engineering",
      year: "May 2025",
      details: "",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Boston_University_seal.svg/200px-Boston_University_seal.svg.png",
    },
    {
      id: 3,
      school: "Air Force Institute of Technology, Kaduna",
      degree: "BSc in Cybersecurity",
      year: "May 2023",
      details: "Overall Best Graduating Student, CGPA 4.99/5.0. Relevant Coursework: Network Security, Digital Forensics, Operating Systems Security",
      logo: "https://afit.edu.ng/wp-content/uploads/2023/03/afit-logo.png",
    },
  ],

  experience: [
    {
      id: 1,
      role: "Graduate Teaching Assistant, EC521 Cybersecurity",
      company: "Boston University",
      duration: "2024--2025",
      description: "Designed and deployed Capture-The-Flag (CTF) environments simulating Network Flooding (SYN/UDP floods) to test student defense strategies. Mentored 50+ graduate students on practical mitigation techniques for web vulnerabilities using Burp Suite and Linux. Developed hands-on curriculum modules focusing on machine learning security, reverse engineering of malware binaries, and secure coding practices.",
    },
    {
      id: 2,
      role: "Network Security Engineer Intern",
      company: "Galaxy Backbone Limited (Tier IV Data Center)",
      duration: "2021--2022",
      description: "Defended Tier IV Data Center infrastructure against volumetric DDoS attacks and SQL injections, maintaining 99.99% uptime for government clients. Utilized Splunk for real-time traffic correlation and Palo Alto Firewalls to block malicious IPs and mitigate threats during active campaigns. Engineered Python scripts integrated with EDR telemetry to reduce Time-to-Detect (TTD) by 40% during critical vulnerabilities like Log4Shell. Conducted comprehensive vulnerability scans using Nessus across 200+ Windows/Linux servers.",
    },
    {
      id: 3,
      role: "Cybersecurity Specialist (Veteran)",
      company: "Nigerian Air Force",
      duration: "2012--2023",
      description: "Implemented custom Snort rules and spectrum analysis protocols to protect Command & Control (C2) links from electronic warfare interference. Deployed network segmentation on Cisco IOS and Linux gateways to isolate mission-critical subnets from compromised endpoints. Performed deep packet inspection using Wireshark and Tcpdump to neutralize anomalous command traffic targeting air defense systems.",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Cross-Platform Fraud Detection via Probabilistic State Modeling and Deep Learning",
      description: "Developing fraud detection system combining Hidden Markov Models with fine-tuned LLMs (DeBERTa) to track pig-butchering scams. Engineering cross-platform state handoff protocol. Building multi-label trigger classifier leveraging LLM embeddings. Collecting IRB-approved dataset across 7 emerging markets.",
      technologies: ["Hidden Markov Models", "LLMs", "DeBERTa", "Bayesian belief tracking", "Monte Carlo simulation"],
      link: "#",
      conference: null,
      publishedAt: null,
    },
    {
      id: 2,
      title: "The Cost of Convenience: Identifying, Analyzing, and Mitigating Predatory Loan Applications",
      description: "Engineered an end-to-end security assessment pipeline to audit digital lending apps across 5 countries. Implemented LLM-assisted policy-to-permission mapping. Performed responsible disclosure to Google, leading to the removal of 93 predatory apps (300M+ cumulative installs).",
      technologies: ["Static Analysis", "Dynamic Testing", "Network Traffic Inspection", "LLM"],
      link: "#",
      conference: "ACM AsiaCCS 2026",
      publishedAt: "2026",
    },
  ],

  skills: [
    {
      id: 1,
      category: "Machine Learning & Deep Learning",
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Transformer architectures (BERT, GPT, DeBERTa)", "Transfer Learning", "SHAP", "LIME"],
    },
    {
      id: 2,
      category: "Probabilistic Methods & Statistics",
      items: ["Hidden Markov Models", "Bayesian Inference", "Monte Carlo Simulation", "Markov Chains", "Time Series Forecasting", "A/B Testing"],
    },
    {
      id: 3,
      category: "NLP & Large Language Models",
      items: ["HuggingFace Transformers", "Prompt Engineering", "Fine-tuning LLMs", "Text Classification", "NER", "Sentiment Analysis", "Semantic Embedding Models"],
    },
    {
      id: 4,
      category: "Data Science & Analytics",
      items: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "SQL", "PySpark", "Hadoop", "Statistical Modeling"],
    },
    {
      id: 5,
      category: "Software Engineering",
      items: ["Python", "Java", "C++", "Bash", "Git/GitHub", "Docker", "CI/CD", "Linux Administration", "AWS"],
    },
  ],

  awards: [
    {
      id: 1,
      title: "Overall Best Graduating Student",
      organization: "Air Force Institute of Technology, Kaduna",
      year: "2023",
      description: "Graduated with the highest CGPA of 4.99/5.0 in the Cybersecurity program.",
      icon: "trophy",
    },
    {
      id: 2,
      title: "Google Responsible Disclosure Recognition",
      organization: "Google",
      year: "2025",
      description: "Recognized for responsible disclosure leading to removal of 93 predatory apps from Google Play Store.",
      icon: "shield",
    },
  ],

  certifications: [
    {
      id: 1,
      name: "CompTIA Security+",
      issuer: "CompTIA",
      year: "2022",
      credentialId: "",
      logo: "https://www.comptia.org/images/default-source/mainsitetemplateimages/comptia_logo_cmyk.svg",
    },
    {
      id: 2,
      name: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      year: "2021",
      credentialId: "",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/EC-Council_Logo.svg/200px-EC-Council_Logo.svg.png",
    },
    {
      id: 3,
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png",
    },
  ],
};
