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
        id: "moosecare",
        name: "MooseCare Patient Portal",
        status: "production",
        role: "Full-Stack Developer & Acting Tech Lead",
        stack: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "AWS",
            "Docker",
        ],
        period: "2022 – Present",
        summary:
            "HIPAA-compliant patient portal with real-time messaging, appointment scheduling, and secure document sharing. Served clinical staff and patients across multiple care locations.",
        highlights: [
            "Architected WebSocket layer for live notifications and chat",
            "Led AWS migration, Dockerized services, and GitHub Actions CI/CD",
            "Acted as HIPAA Compliance Lead — audit logging, encryption at rest",
            "Mentored junior devs; drove sprint planning and code review culture",
        ],
        links: [
            { label: "repo", note: "private — available on request" },
            { label: "demo", note: "internal staging only" },
        ],
    },
    {
        id: "healthsync",
        name: "Healthcare Claims Platform",
        status: "nda",
        role: "Full-Stack Developer",
        stack: [
            "React",
            "TypeScript",
            "C#",
            ".NET",
            "SQL Server",
            "Azure",
        ],
        period: "2020 – 2022",
        summary:
            "Anonymized case study. Enterprise claims intake and adjudication platform for a U.S. healthcare payer. Client name, screenshots, and repository are confidential under NDA — details below are sanitized.",
        highlights: [
            "Built provider-facing submission workflows and internal review dashboards",
            "Integrated legacy SOAP services with a modern React front end",
            "Improved claim routing throughput with queue-based processing patterns",
            "Collaborated with compliance team on audit trails and access controls",
        ],
        links: [
            { label: "repo", note: "NDA — not publicly available" },
            { label: "demo", note: "no public demo" },
            {
                label: "case",
                note: "architecture walkthrough available in interviews",
            },
        ],
    },
    {
        id: "portfolio",
        name: "Linux-Style Portfolio Terminal",
        status: "demo",
        role: "Creator & Maintainer",
        stack: ["React", "TypeScript", "Vite", "Framer Motion", "CSS"],
        period: "2026",
        summary:
            "Interactive CLI-themed portfolio where visitors explore my background through terminal commands — help, about, skills, projects, and more.",
        highlights: [
            "Custom command parser with quoted args and subcommands",
            "Theme switcher with green, amber, and solarized palettes",
            "ASCII art hero with fastfetch-style system info",
            "Project READMEs rendered as cat ~/projects/<id>/README.md",
        ],
        links: [
            {
                label: "repo",
                url: "https://github.com/Alejandro-Bernal/alexb-portfolio",
            },
            { label: "demo", note: "you're looking at it" },
        ],
    },
];

export const PROJECT_IDS = PROJECTS.map((project) => project.id);

export function getProject(id: string): Project | undefined {
    return PROJECTS.find((project) => project.id === id.toLowerCase());
}