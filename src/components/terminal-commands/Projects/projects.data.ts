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
    company: string;
    role: string;
    stack: string[];
    period: string;
    summary: string;
    highlights: string[];
    skillsDemonstrated?: string[];
    links?: ProjectLink[];
};

export const PROJECTS: Project[] = [
    {
        id: "pathzero",
        name: "AI for Smart Cities — LADOT Bike Route Safety",
        status: "archived",
        company: "CSULA Senior Capstone",
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
        status: "nda",
        company: "The Legal Leads",
        role: "Lead Full-Stack Developer",
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
            "Led full-stack delivery of a HIPAA-aware, real-time verification platform used in live agent workflows. Owned backend relay services, Salesforce agent UI, caching, observability, and CI/CD — integrating with third-party verification providers whose names and contracts remain confidential.",
        highlights: [
            "Designed and built API relay services that connected Salesforce to external verification providers under strict real-time latency requirements",
            "Delivered agent-facing Lightning Web Components with guided step-by-step UX for triggering and reviewing results during live calls",
            "Implemented document generation and attachment workflows for sensitive records using Node.js and headless browser automation",
            "Added a Dockerized caching layer to reduce redundant third-party calls and improve response times under high volume",
            "Configured AWS monitoring, alerting, and automated response patterns for production reliability",
            "Established review-gated CI/CD and Apex test coverage across Salesforce integration points",
        ],
        skillsDemonstrated: [
            "Full-stack architecture & service design",
            "FastAPI / Python backend development",
            "Node.js / Express microservices",
            "Salesforce LWC & Apex integration",
            "HIPAA-aware infrastructure on AWS",
            "MongoDB caching & Docker deployment",
            "CI/CD with GitHub Actions",
            "Real-time third-party API orchestration",
        ],
    },
    {
        id: "cloudsentinel",
        name: "In-House Verification Platform",
        status: "nda",
        company: "The Legal Leads",
        role: "Project Lead",
        stack: [
            "Next.js",
            "REST API",
            "Webhooks",
            "AWS Textract",
            "EventBridge",
            "CloudWatch RUM",
            "Salesforce Apex",
            "Salesforce LWC",
        ],
        period: "2025",
        summary:
            "Project lead for a 3-person team building an in-house verification platform that reduced reliance on a prior third-party vendor workflow (including Plaid on the frontend). Owned planning, stakeholder updates, Next.js admin UI delivery, and Salesforce integration — while two full-stack developers built the internal REST API backend.",
        highlights: [
            "Led delivery of an in-house verification platform, coordinating two full-stack developers through timelines, goals, and milestones",
            "Ran recurring status updates and presentations for admin stakeholders throughout the project lifecycle",
            "Built a mobile-friendly Next.js admin UI for creating and reviewing verification sessions",
            "Implemented Salesforce integration with Apex classes and webhooks to connect agents to the team's REST API",
            "Improved verification session throughput significantly compared to the previous third-party workflow",
            "Integrated AWS Textract, EventBridge, and CloudWatch RUM with Salesforce for an observable production pipeline",
        ],
        skillsDemonstrated: [
            "Technical project leadership",
            "Timeline, milestone & stakeholder management",
            "Next.js / React UI development",
            "Mobile-responsive admin interfaces",
            "Salesforce Apex & webhook integrations",
            "REST API integration patterns",
            "AWS observability (EventBridge, CloudWatch RUM)",
            "Cross-functional team coordination",
        ],
    },
    {
        id: "fraudshield",
        name: "Identity Verification & Fraud Prevention Pipeline",
        status: "nda",
        company: "The Legal Leads",
        role: "Full-Stack Developer",
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
            "Built the Salesforce-facing layer of a production identity verification workflow for high-volume lead operations. Focused on agent UX, Apex integrations, and webhook-driven status updates — including frontend integration with Plaid for document and selfie verification, while other provider integrations remain confidential.",
        highlights: [
            "Developed Lightning Web Components that let agents launch verification flows for document and identity confirmation",
            "Integrated Plaid on the Salesforce frontend via Apex and a backend relay service, with webhook handling for real-time status updates",
            "Collaborated with a backend engineer to design the end-to-end flow between Salesforce and external identity services",
            "Delivered a production-ready agent workflow for secure verification at scale",
            "Iterated across LWC, Apex, and integration layers based on live production feedback",
        ],
        skillsDemonstrated: [
            "Salesforce LWC & Apex development",
            "Third-party API integration (Plaid — frontend)",
            "Webhook-driven async workflows",
            "Agent UX design for high-volume ops",
            "Cross-layer debugging (UI, Apex, APIs)",
            "Production identity verification flows",
        ],
    },
];

export const PROJECT_IDS = PROJECTS.map((project) => project.id);

export function getProject(id: string): Project | undefined {
    return PROJECTS.find((project) => project.id === id.toLowerCase());
}
