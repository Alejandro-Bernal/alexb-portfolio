export type ProjectStatus =
    | "production"
    | "development"
    | "archived"
    | "demo"
    | "nda";

export type ProjectLink = {
    label: string;
    url?: string;
    note?: string;
};

export type Project = {
    id: string;
    name: string;
    status: ProjectStatus;
    role: string;
    stack: string[];
    period: string;
    summary: string;
    highlights: string[];
    links: ProjectLink[];
};

export const PROJECTS: Project[] = [
    {
        id: "pathzero",
        name: "AI for Smart Cities — LADOT Bike Route Safety",
        status: "archived",
        role: "Android Developer & Risk Algorithm Contributor — Senior Capstone",
        stack: [
            "Android Studio",
            "Java",
            "Python",
            "Risk Classification Algorithm",
            "Data Visualization",
            "GIS / Urban Planning",
            "Metro Bike Share API",
        ],
        period: "2019 – 2020",
        summary:
            "Public senior capstone developed with LADOT and the City of Los Angeles to support Vision Zero goals and 2028 Olympics infrastructure planning. As part of a 5-person team, I focused on building the Android visualization app and co-developed a risk-classification algorithm that scored areas by cyclist mortality risk (green/yellow/red) to generate the safest bike routes across Greater Los Angeles using real-time Metro Bike Share data.",
        highlights: [
            "Collaborated with LADOT and City of LA on a civic transportation safety project using 3+ years of collision and Metro Bike Share data",
            "Co-developed a risk-classification algorithm that labeled areas as low/moderate/high mortality risk and powered safest-route recommendations",
            "Built Android data visualization application (with teammate) that displayed heatmaps and suggested optimal low-risk bike routes in real time",
            "Implemented pathfinding logic that prioritized routes based on historical cyclist mortality rates across Greater Los Angeles",
            "Delivered complete project documentation (SRS, SDD, diagrams, poster, presentation, and final report) — all publicly available on Ascent",
        ],
        links: [
            {
                label: "View Project",
                url: "https://ascent.cysun.org/project/project/view/191",
            },
            {
                label: "Documentation",
                note: "Poster, presentation, SRS, SDD, and full project report available on the Ascent platform",
            },
        ],
    },
    {
        id: "verifyforge",
        name: "Real-Time Background Verification System",
        status: "production",
        role: "Lead Full-Stack Developer — Real-Time Verification Platform",
        stack: [
            "FastAPI",
            "Python",
            "Express",
            "Node.js",
            "Salesforce LWC",
            "Apex",
            "Puppeteer",
            "MongoDB",
            "Docker",
            "AWS (EC2, CloudWatch, EventBridge, Lambda)",
            "GitHub Actions",
        ],
        period: "2024 – 2025",
        summary:
            "HIPAA-compliant real-time background verification platform handling both PII and PHI at scale. As Lead Full-Stack Developer I built the core services (FastAPI relay + Express PDF generation), developed the agent-facing Salesforce LWC, implemented a MongoDB caching layer, AWS monitoring infrastructure, and GitHub Actions CI/CD pipeline.",
        highlights: [
            "Architected FastAPI relay service connecting external verification APIs to Salesforce with strict real-time performance requirements for agents on live calls",
            "Built Express + Puppeteer service that processed large volumes of sensitive data and automatically generated two separate PDFs (background report + medical data) attached to prospect records",
            "Developed intuitive Lightning Web Component with guided step-by-step UX so agents could trigger and review verification results quickly during client calls",
            "Implemented MongoDB caching layer (Dockerized on EC2) to reduce repeated external API calls and significantly improve response speed under high volume",
            "Configured HIPAA-compliant AWS infrastructure on EC2 with CloudWatch alerts, EventBridge rules, and Lambda functions for monitoring and automated responses",
            "Wrote Apex classes and test coverage for all Salesforce integration points and set up GitHub Actions CI/CD for review-gated deployments",
            "Established automated cloud backups for both MongoDB and EC2 instances to ensure data durability and recovery readiness",
        ],
        links: [
            { label: "repo", note: "private — proprietary client work" },
            {
                label: "demo",
                note: "internal production system — not publicly accessible",
            },
        ],
    },
    {
        id: "cloudsentinel",
        name: "Plaid Operations Dashboard",
        status: "production",
        role: "Project Lead — The Legal Leads",
        stack: [
            "Next.js",
            "AWS Textract",
            "EventBridge",
            "CloudWatch RUM",
            "Salesforce Apex",
            "Salesforce LWC",
        ],
        period: "2025",
        summary:
            "Operations dashboard that replaced manual Plaid operations workflows. Served as project lead — owned the overall layout, component architecture, and system design while collaborating with the team on implementation. Cloud-native pipeline with full observability and Salesforce integration.",
        highlights: [
            "Led project design — defined layout, components, and integration architecture",
            "Next.js front end backed by AWS Textract, EventBridge, and CloudWatch RUM",
            "Salesforce Apex classes and LWC for ops workflows and data handoff",
            "Production-ready observability and monitoring for reliable financial data operations",
        ],
        links: [
            { label: "repo", note: "private — proprietary client work" },
            {
                label: "demo",
                note: "internal production system — no public demo",
            },
        ],
    },
    {
        id: "fraudshield",
        name: "Identity Verification & Fraud Prevention Pipeline",
        status: "production",
        role: "Full-Stack Developer — Identity Verification Integration",
        stack: [
            "Salesforce LWC",
            "Apex",
            "Plaid API",
            "Webhooks",
            "Document Verification",
            "Identity Matching",
        ],
        period: "2025",
        summary:
            "Production identity verification system for high-volume lead generation. Built the Salesforce Lightning Web Component layer and Apex integration that allowed agents to trigger secure document validation (ID/passport) and real-time selfie identity matching through Plaid, with webhook-driven updates from a backend relay service.",
        highlights: [
            "Developed intuitive Lightning Web Component that enabled agents to generate Plaid verification links for document and passport validation followed by selfie-based identity confirmation",
            "Integrated Plaid APIs via Apex classes connected to a backend relay service, including webhook handling for real-time status updates",
            "Collaborated with backend engineer to design the end-to-end verification flow between Salesforce and external identity services",
            "Delivered a production-ready agent workflow for secure identity verification at scale while maintaining compliance standards",
            "Actively troubleshot and iterated on the integration across frontend, Apex, and external API layers",
        ],
        links: [
            { label: "repo", note: "private — proprietary client work" },
            {
                label: "demo",
                note: "internal production system — not publicly accessible",
            },
        ],
    },
];

export const PROJECT_IDS = PROJECTS.map((project) => project.id);

export function getProject(id: string): Project | undefined {
    return PROJECTS.find((project) => project.id === id.toLowerCase());
}
