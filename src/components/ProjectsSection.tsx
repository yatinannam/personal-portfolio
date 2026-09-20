import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  period: string;
  tagline: string;
  points: string[];
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    slug: "cross-cutting",
    title: "Cross-Cutting",
    period: "2026",
    tagline:
      "An in-house HealthTech platform for SRM Hospital, letting clinicians manage patients and run structured digital assessments.",
    points: [
      "End-to-end clinical workflows for DSM-5 mental-health screening and decision-capacity assessment",
      "Scoring logic, session tracking, clinical notes, and authenticated dashboards",
      "Reusable assessment flows with branching clinical logic, form versioning, and doctor-specific data access",
    ],
    tech: ["Next.js", "React", "TypeScript", "Clerk", "Supabase"],
    github: "https://github.com/yatinannam/Cross-Cutting",
    live: "https://cross-cutting.vercel.app",
  },
  {
    slug: "dbguree",
    title: "DBGuree",
    period: "2026",
    tagline:
      "A desktop AI-powered SQL workbench that turns natural-language queries into executable SQL against real databases.",
    points: [
      "Schema-aware RAG pipeline with ChromaDB and llama.cpp for local LLM inference",
      "SQL parsing, validation, persistent query history, and secure credential management",
      "Support for PostgreSQL, MySQL/MariaDB, and Microsoft SQL Server",
    ],
    tech: ["Electron", "Python", "FastAPI", "LangChain", "Qwen2.5-Coder"],
    github: "https://github.com/saurovpaul16/dbguree",
  },
  {
    slug: "x86-64cnn",
    title: "x86-64CNN",
    period: "2026",
    tagline:
      "A convolutional neural network built from scratch in x86-64 assembly for MNIST inference, no ML framework involved.",
    points: [
      "AVX2/FMA SIMD-optimized convolution, ReLU, pooling, and dense layers",
      "Custom memory management and matrix multiplication kernels",
      "Modular assembly interfaces for low-level inference infrastructure",
    ],
    tech: ["x86-64 Assembly", "NASM", "AVX2/FMA", "Linux"],
    github: "https://github.com/nkminion/x86-64CNN",
  },
  {
    slug: "risklattice",
    title: "RiskLattice",
    period: "2026",
    tagline:
      "Fraud-containment intelligence that finds the minimal action to stop coordinated fraud without harming real customers.",
    points: [
      "A relationship graph links users, devices, payment instruments, and IPs to surface coordinated campaigns, not just risky transactions",
      "A containment optimizer simulates allow/review/block actions against the full dataset to bound collateral damage before anything is applied",
      "A reporting layer drafts investigation notes grounded only in structured evidence, and never executes an action autonomously",
    ],
    tech: ["Python", "Pydantic", "Logistic Regression", "Random Forest"],
    github: "https://github.com/yatinannam/RiskLattice",
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel-AI",
    period: "2026",
    tagline:
      "A Windows endpoint detection and response app with real-time monitoring and ML-based threat classification.",
    points: [
      "Real-time monitoring of processes, network connections, the file system, and the registry",
      "YARA pattern matching combined with a behavioral ML model for confidence-scored classification",
      "Optional VirusTotal verification alongside a fully local detection and quarantine path",
    ],
    tech: ["Electron", "React", "Python", "scikit-learn", "YARA"],
    github: "https://github.com/yatinannam/Sentinel-AI",
  },
  {
    slug: "devpulse",
    title: "devpulse",
    period: "2026",
    tagline:
      "A local development observability CLI that shows what's running and what's receiving traffic, with no external infrastructure.",
    points: [
      "A local reverse proxy captures live HTTP traffic between services as it happens",
      "Cross-platform socket inspection discovers what's actually listening, correlated against captured traffic",
      "Local-first by design: session data stays on the machine unless explicitly moved",
    ],
    tech: ["Go", "CLI", "TUI"],
    github: "https://github.com/yatinannam/devpulse",
  },
  {
    slug: "loreloom",
    title: "loreloom",
    period: "2026",
    tagline:
      "A choice-driven narrative game with a deterministic, offline-first engine — weave a character, discover their story.",
    points: [
      "A seven-chapter story tracks hidden stats and personality axes that shift with player choices",
      "A deterministic engine with a seeded PRNG means replays are identical and no backend is required",
      "Runs fully offline as an installable PWA; Claude only enhances two prose fields on the final result",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yatinannam/loreloom",
  },
];

const ProjectCard = ({
  project,
  index,
  isInView,
  onOpen,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onOpen: () => void;
}) => (
  <motion.button
    layoutId={`project-${project.slug}`}
    initial={{ opacity: 0, y: 16 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    onClick={onOpen}
    className="panel-hover text-left p-6 flex flex-col h-full"
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-medium">{project.title}</h3>
      <span className="label-mono pt-1">{project.period}</span>
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
      {project.tagline}
    </p>

    <div className="flex flex-wrap gap-2">
      {project.tech.slice(0, 3).map((tech) => (
        <span key={tech} className="chip">
          {tech}
        </span>
      ))}
      {project.tech.length > 3 && (
        <span className="chip">+{project.tech.length - 3}</span>
      )}
    </div>
  </motion.button>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    document.body.style.overflow = openSlug ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSlug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="section">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">Selected work</p>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              isInView={isInView}
              onOpen={() => setOpenSlug(project.slug)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80"
            onClick={() => setOpenSlug(null)}
          >
            <motion.div
              layoutId={`project-${activeProject.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="panel p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-semibold">{activeProject.title}</h3>
                <button
                  onClick={() => setOpenSlug(null)}
                  aria-label="Close"
                  className="p-1.5 -mt-1 -mr-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="label-mono mb-6">{activeProject.period}</p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {activeProject.tagline}
              </p>

              <ul className="space-y-2.5 mb-6">
                {activeProject.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-muted-foreground pl-4 relative before:content-['\2014'] before:absolute before:left-0 before:text-border"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              {(activeProject.github || activeProject.live) ? (
                <div className="flex gap-4 pt-6 border-t border-border">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm font-medium hover:border-primary/50 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  )}
                  {activeProject.live && (
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                </div>
              ) : (
                <p className="label-mono pt-6 border-t border-border">
                  Private repository
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
