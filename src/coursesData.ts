export interface Course {
  title: string;
  badge: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  skills: string[];
  image: string;
  category: 'Full Stack' | 'Data' | 'AI' | 'Cloud' | 'Design' | 'Marketing' | 'Mobile' | 'Testing';
}

export const coursesData: Course[] = [
  {
    title: "Java Full Stack Development",
    badge: "Most Popular",
    duration: "24 Weeks",
    level: "Beginner",
    description: "Master core Java, Spring Boot, microservices, Hibernate, and modern React/Angular frontend integrations.",
    skills: ["Java", "Spring Boot", "React", "Hibernate", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    category: "Full Stack"
  },
  {
    title: "Python Full Stack Development",
    badge: "In Demand",
    duration: "20 Weeks",
    level: "Beginner",
    description: "Build rapid and scalable web solutions using Python, Django, Flask, SQL, and modern UI architectures.",
    skills: ["Python", "Django", "Flask", "PostgreSQL", "REST APIs"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    category: "Full Stack"
  },
  {
    title: "MERN Stack Development",
    badge: "Trending",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Build robust real-time web applications with MongoDB, Express.js, React, and Node.js.",
    skills: ["MongoDB", "Express", "React", "Node.js", "Redux"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
    category: "Full Stack"
  },
  {
    title: "MEAN Stack Development",
    badge: "Enterprise",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Architect heavy enterprise applications using MongoDB, Express.js, Angular, and Node.js.",
    skills: ["MongoDB", "Express", "Angular", "Node.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    category: "Full Stack"
  },
  {
    title: "Data Science",
    badge: "High Paying",
    duration: "24 Weeks",
    level: "Intermediate",
    description: "Harness statistical modeling, big data visualization, and predictive pipelines to solve enterprise challenges.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    category: "Data"
  },
  {
    title: "Artificial Intelligence",
    badge: "Elite Track",
    duration: "24 Weeks",
    level: "Advanced",
    description: "Build neural network layers, large language models (LLMs), computer vision agents, and cognitive systems.",
    skills: ["PyTorch", "NLP", "Generative AI", "Computer Vision", "Transformers"],
    image: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "AI"
  },
  {
    title: "Machine Learning",
    badge: "Best Value",
    duration: "20 Weeks",
    level: "Intermediate",
    description: "Design, optimize, and deploy predictive algorithms and automated pipelines for dynamic datasets.",
    skills: ["Scikit-Learn", "Regression", "Clustering", "Feature Eng", "MLOps"],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600",
    category: "AI"
  },
  {
    title: "Cloud Computing (AWS & Azure)",
    badge: "In Demand",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Design high-availability, fault-tolerant cloud infrastructures and serverless architectures on AWS & Azure.",
    skills: ["AWS EC2", "Azure Portal", "IAM", "VPC", "Serverless"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    category: "Cloud"
  },
  {
    title: "DevOps",
    badge: "Trending",
    duration: "18 Weeks",
    level: "Advanced",
    description: "Bridge operations and development using continuous integration, continuous delivery (CI/CD), and infrastructure as code.",
    skills: ["Docker", "Kubernetes", "Jenkins", "Terraform", "GitLab CI"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    category: "Cloud"
  },
  {
    title: "Cyber Security",
    badge: "Critical Tech",
    duration: "20 Weeks",
    level: "Intermediate",
    description: "Defend sensitive digital environments with ethical hacking, penetration testing, and security operation center procedures.",
    skills: ["Ethical Hacking", "Wireshark", "Metasploit", "Cryptography", "SOC"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    category: "Cloud"
  },
  {
    title: "UI/UX Design",
    badge: "Creative Track",
    duration: "12 Weeks",
    level: "Beginner",
    description: "Create breathtaking user journeys, clean high-fidelity wireframes, interactive prototypes, and custom UI components.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "UI Kits"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600",
    category: "Design"
  },
  {
    title: "Graphic Design",
    badge: "Creative Track",
    duration: "12 Weeks",
    level: "Beginner",
    description: "Master vector elements, editorial layout typography, custom corporate brand identity kits, and publication graphics.",
    skills: ["Photoshop", "Illustrator", "InDesign", "Typography", "Branding"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600",
    category: "Design"
  },
  {
    title: "Digital Marketing",
    badge: "Business Track",
    duration: "12 Weeks",
    level: "Beginner",
    description: "Scale organic growth, direct paid campaigns, optimize search indexes, and design conversion funnels.",
    skills: ["SEO", "Google Analytics", "SEM", "Content Marketing", "SMM"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    category: "Marketing"
  },
  {
    title: "Salesforce Development",
    badge: "Enterprise",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Customize enterprise CRM clouds using Apex scripting, Visualforce, Lightning Web Components (LWC), and sandbox management.",
    skills: ["Apex", "LWC", "Visualforce", "CRM Admin", "SaaS Solutions"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
    category: "Cloud"
  },
  {
    title: "Business Analytics",
    badge: "Business Track",
    duration: "14 Weeks",
    level: "Beginner",
    description: "Synthesize corporate operational metrics, create performance reports, and optimize workflows with strategic modeling.",
    skills: ["Excel", "Tableau", "SQL", "Agile PM", "PowerBI"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    category: "Data"
  },
  {
    title: "Data Analytics",
    badge: "In Demand",
    duration: "14 Weeks",
    level: "Beginner",
    description: "Extract, clean, translate, and model complex database segments to create actionable insights for dynamic companies.",
    skills: ["SQL", "PowerBI", "Python", "Tableau", "Advanced Excel"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    category: "Data"
  },
  {
    title: "Software Testing (Manual & Automation)",
    badge: "Core QA",
    duration: "16 Weeks",
    level: "Beginner",
    description: "Verify codebase integrity with rigorous manual test scripts and comprehensive Selenium/TestNG test automation.",
    skills: ["Selenium", "Java", "Manual Testing", "TestNG", "Postman"],
    image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&q=80&w=600",
    category: "Testing"
  },
  {
    title: "Flutter App Development",
    badge: "Mobile Track",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Code native-grade Android and iOS applications with single-codebase Flutter SDK and Dart state structures.",
    skills: ["Dart", "Flutter SDK", "State Mgmt", "REST APIs", "Firebase"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    category: "Mobile"
  },
  {
    title: "Android App Development",
    badge: "Mobile Track",
    duration: "16 Weeks",
    level: "Intermediate",
    description: "Build robust native Android solutions with Kotlin, modern Jetpack Compose structures, Coroutines, and Room local databases.",
    skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Retrofit"],
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600",
    category: "Mobile"
  },
  {
    title: "React.js Development",
    badge: "Frontend Elite",
    duration: "12 Weeks",
    level: "Intermediate",
    description: "Develop blazing-fast single page web applications using React hooks, global stores, virtual routing, and Tailwind templates.",
    skills: ["React Hooks", "JSX", "Redux Toolkit", "Tailwind CSS", "Vite"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    category: "Full Stack"
  },
  {
    title: "Power BI",
    badge: "Business Intelligence",
    duration: "12 Weeks",
    level: "Beginner",
    description: "Learn Power BI from scratch to create interactive dashboards, reports, business analytics, DAX formulas, Power Query, and real-time data visualization.",
    skills: ["Power BI", "DAX", "Power Query", "Dashboard Design", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    category: "Data"
  }
];
