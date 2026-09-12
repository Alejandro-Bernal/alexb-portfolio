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

export type StackItem = {
    name: string;
    use: string;
};

export type ProjectStar = {
    situation: string;
    task: string;
    action: string[];
    result: string[];
};

export type Project = {
    id: string;
    name: string;
    status: ProjectStatus;
    company: string;
    role: string;
    period: string;
    tagline: string;
    star: ProjectStar;
    stack: StackItem[];
    links?: ProjectLink[];
};

export const PROJECTS: Project[] = [
    {
        id: "pathzero",
        name: "AI for Smart Cities: LADOT Bike Route Safety",
        status: "archived",
        company: "CSULA Senior Capstone",
        role: "Android Developer and Risk Algorithm Contributor",
        period: "2019 - 2020",
        tagline:
            "Civic routing tool that scored cyclist mortality risk and recommended safer bike paths across Greater Los Angeles.",
        star: {
            situation:
                "A 5-person senior capstone with LADOT and the City of Los Angeles, aimed at Vision Zero and 2028 Olympics infrastructure planning. The city had years of collision records and Metro Bike Share data, but no rider-facing way to turn that into a safer route.",
            task: "On the team I owned the Android visualization app and co-developed the risk-classification algorithm. The job was to score areas by cyclist mortality risk and turn those scores into safest-route recommendations in real time.",
            action: [
                "Worked with LADOT and City of LA staff against 3+ years of collision and Metro Bike Share data.",
                "Co-developed a classifier that labeled areas low, moderate, or high mortality risk (green / yellow / red).",
                "Built the Android visualization app with a teammate: heatmaps plus live low-risk route suggestions.",
                "Implemented pathfinding that preferred corridors with lower historical cyclist mortality across Greater Los Angeles.",
                "Wrote the public deliverable set: SRS, SDD, diagrams, poster, presentation, and final report on Ascent.",
            ],
            result: [
                "Shipped a complete civic prototype: risk map, safest-route engine, and Android client.",
                "Documentation and source artifacts are public on Ascent for review.",
                "The green / yellow / red model gave planners and riders a shared language for where cycling was actually dangerous.",
            ],
        },
        stack: [
            {
                name: "Android Studio / Java",
                use: "Rider-facing client. Heatmaps, route overlay, and live recommendations on device.",
            },
            {
                name: "Python",
                use: "Risk-classification work and data processing behind the green / yellow / red scores.",
            },
            {
                name: "Risk algorithm",
                use: "Scored map cells by cyclist mortality so pathfinding could prefer lower-risk corridors.",
            },
            {
                name: "GIS / urban data",
                use: "Placed collision and bike-share history onto Greater Los Angeles geography.",
            },
            {
                name: "Metro Bike Share API",
                use: "Live station and trip context mixed with historical mortality to keep routes current.",
            },
            {
                name: "Data visualization",
                use: "Heatmaps in the Android app so risk was readable at a glance, not only in a table.",
            },
        ],
        links: [
            {
                label: "View Project",
                url: "https://ascent.cysun.org/project/project/view/191",
            },
            {
                label: "Documentation",
                note: "Poster, presentation, SRS, SDD, and full project report on Ascent.",
            },
        ],
    },
    {
        id: "verifyforge",
        name: "Real-Time Background Verification System",
        status: "nda",
        company: "The Legal Leads",
        role: "Lead Full-Stack Developer",
        period: "2024 - 2025",
        tagline:
            "HIPAA-aware verification relay for live agent calls. Salesforce in the front, vendor APIs in the back, no extra seconds on the line.",
        star: {
            situation:
                "Agents at The Legal Leads had to run background verification during live calls. Results had to come back in real time, stay HIPAA-aware, and talk to third-party providers whose names and contracts stay confidential. Extra vendor calls were slow and expensive. Failure on the line was dead air.",
            task: "Lead full-stack delivery of the platform agents actually used. Own the relay APIs, the Salesforce agent UI, caching, observability, and CI/CD so a verification could be triggered, tracked, and filed without leaving the call.",
            action: [
                "Designed API relay services that connected Salesforce to external verification providers under a hard latency budget.",
                "Built agent-facing Lightning Web Components with a guided, step-by-step flow for kicking off a check and reading the result mid-call.",
                "Added Node.js document generation and attachment for sensitive records, using headless browser automation.",
                "Stood up a Dockerized MongoDB cache so repeat checks did not hit the vendor again.",
                "Wired AWS monitoring, alerting, and automated response so production issues showed up before agents felt them.",
                "Put review-gated GitHub Actions and Apex test coverage on the Salesforce integration points.",
            ],
            result: [
                "The flow ran in live agent workflows, not a staging demo.",
                "Caching cut redundant third-party calls and improved response time under volume.",
                "CloudWatch alerting and automated response gave the team a production pulse on the relay.",
                "Deploys went through review gates instead of hotfixes on the call floor.",
            ],
        },
        stack: [
            {
                name: "FastAPI / Python",
                use: "Relay layer. Request and response contracts between Salesforce and verification providers, built for low latency.",
            },
            {
                name: "Node.js / Express",
                use: "Document generation service. Built PDFs and attachments for sensitive records without blocking the agent UI.",
            },
            {
                name: "Puppeteer",
                use: "Headless browser automation for those documents when a render step was required.",
            },
            {
                name: "Salesforce LWC",
                use: "Agent console. Step-by-step UX to start a verification and read status during a live call.",
            },
            {
                name: "Apex",
                use: "Salesforce-side integration and tests against the relay, with coverage on the call path.",
            },
            {
                name: "MongoDB",
                use: "Cache of recent verification results so high volume did not mean high vendor spend.",
            },
            {
                name: "Docker",
                use: "Packaged the cache and services so the relay could be deployed the same way every time.",
            },
            {
                name: "AWS EC2",
                use: "Hosted the relay and related services in the company cloud.",
            },
            {
                name: "CloudWatch",
                use: "Metrics, logs, and alerts on relay health so failures were visible before the next call.",
            },
            {
                name: "EventBridge / Lambda",
                use: "Automated response patterns when monitors fired, without waiting on a manual restart.",
            },
            {
                name: "GitHub Actions",
                use: "Review-gated CI/CD for the services and Salesforce packaging.",
            },
        ],
    },
    {
        id: "cloudsentinel",
        name: "In-House Verification Platform",
        status: "nda",
        company: "The Legal Leads",
        role: "Project Lead",
        period: "2025",
        tagline:
            "Replaced a rented verification vendor with an in-house platform: admin UI, internal API, Salesforce, and an observable AWS pipeline.",
        star: {
            situation:
                "The company was running verification through a third-party vendor workflow, including Plaid on the frontend. Sessions were slower than the floor needed, and the team wanted the pipeline in-house so agents and admins were not stuck on someone else's product.",
            task: "Lead a 3-person build. I owned planning, stakeholder updates, the Next.js admin UI, and Salesforce integration. Two full-stack developers owned the internal REST API backend.",
            action: [
                "Set timelines, goals, and milestones and kept two full-stack developers moving against them.",
                "Ran recurring status updates and presentations for admin stakeholders through the lifecycle.",
                "Built a mobile-friendly Next.js admin UI for creating and reviewing verification sessions.",
                "Implemented Salesforce Apex classes and webhooks so agents could talk to the team's REST API instead of the old vendor path.",
                "Integrated AWS Textract, EventBridge, and CloudWatch RUM with Salesforce so the pipeline was observable in production.",
            ],
            result: [
                "Verification no longer depended on the prior third-party frontend workflow.",
                "Session throughput improved significantly versus the vendor path.",
                "Admins got an in-house console. Agents got a Salesforce path onto the team's own API.",
                "Textract plus EventBridge plus CloudWatch RUM gave the staff a production picture of every session.",
            ],
        },
        stack: [
            {
                name: "Next.js",
                use: "Admin console I built. Create and review verification sessions on desktop and mobile.",
            },
            {
                name: "REST API",
                use: "Internal backend owned by two teammates. I integrated it. I did not write that service.",
            },
            {
                name: "Salesforce LWC",
                use: "Agent-facing pieces that sat on the new in-house path instead of the vendor UI.",
            },
            {
                name: "Apex / webhooks",
                use: "Salesforce glue. Agents triggered sessions and received status from the team's API.",
            },
            {
                name: "AWS Textract",
                use: "Document text extraction in the in-house pipeline, no longer parked behind the old vendor.",
            },
            {
                name: "EventBridge",
                use: "Event routing for session lifecycle so Salesforce and AWS stayed in sync.",
            },
            {
                name: "CloudWatch RUM",
                use: "Real-user monitoring on the admin and agent path so we could see production friction.",
            },
        ],
    },
    {
        id: "fraudshield",
        name: "Identity Verification and Fraud Prevention Pipeline",
        status: "nda",
        company: "The Legal Leads",
        role: "Full-Stack Developer",
        period: "2025",
        tagline:
            "Salesforce-facing identity flow for high-volume lead ops. Agents launch document and selfie checks and get status back on the call.",
        star: {
            situation:
                "High-volume lead operations needed identity checks and fraud controls inside Salesforce. Agents could not bounce to a separate portal. Document and selfie verification had to start from the console they already lived in, with status coming back as the lead was still on the line. Other identity providers stay unnamed. Plaid on the frontend is the piece that is public.",
            task: "Build the Salesforce-facing layer of that production workflow: agent UX, Apex integrations, and webhook-driven status, including the Plaid frontend path for document and selfie verification.",
            action: [
                "Developed Lightning Web Components so agents could launch document and identity confirmation from the console.",
                "Integrated Plaid on the Salesforce frontend through Apex and a backend relay, with webhooks for live status.",
                "Worked with a backend engineer on the end-to-end path between Salesforce and external identity services.",
                "Iterated on LWC, Apex, and the integration layer from live production feedback, not a spec freeze.",
            ],
            result: [
                "Agents ran identity verification from Salesforce without a side tool.",
                "Webhook status updates made the flow usable during a live lead, not after the call.",
                "The workflow shipped to production at the volume the floor actually runs.",
            ],
        },
        stack: [
            {
                name: "Salesforce LWC",
                use: "Agent UI to start document and identity checks without leaving the lead record.",
            },
            {
                name: "Apex",
                use: "Server-side Salesforce logic that called the relay and handled Plaid on the frontend path.",
            },
            {
                name: "Plaid API",
                use: "Document and selfie verification on the Salesforce frontend. Named because it was public on that layer.",
            },
            {
                name: "Webhooks",
                use: "Async status back into Salesforce so agents saw matched, failed, or retry without polling.",
            },
            {
                name: "Backend relay",
                use: "Shared with a backend engineer. Moved identity traffic off the browser and into a controlled service.",
            },
            {
                name: "Identity matching",
                use: "Tied document and selfie results back to the lead the agent was working.",
            },
        ],
    },
];

export const PROJECT_IDS = PROJECTS.map((project) => project.id);

export function getProject(id: string): Project | undefined {
    return PROJECTS.find((project) => project.id === id.toLowerCase());
}
