import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  period: string;
  metric?: string;
  tagline: string;
  points: string[];
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    slug: "weir",
    title: "Weir",
    period: "2026",
    metric: "−94% cost · 747 → 14 ms",
    tagline:
      "A cost-aware gateway in front of a RAG service: a semantic cache decides whether an LLM call is needed at all, and a router picks the cheapest model that can answer well.",
    points: [
      "Cut cost per 1,000 requests by 94% and median latency from 747 ms to 14 ms on repeat-heavy traffic, with answer quality unchanged on a 158-question benchmark",
      "An entity guard checks numbers, negations, and named entities before serving a cached answer, taking wrong matches from 37% to 0%",
      "Model fallback and load shedding kept user-facing errors at 0 across 1,232 live requests during a provider outage",
      "318 tests, Prometheus/Grafana dashboards with alert rules, and k6 + Toxiproxy load and fault testing in CI",
    ],
    tech: ["Python", "FastAPI", "Postgres", "pgvector", "Prometheus", "Grafana", "Docker", "GitHub Actions"],
    github: "https://github.com/yatinannam/weir",
  },
  {
    slug: "veyl",
    title: "Veyl",
    period: "2026",
    metric: "468 tests · 17 modeled threats",
    tagline:
      "Permission-aware RAG over internal documents: people ask questions in plain language and only ever see answers built from what their role allows.",
    points: [
      "Access control runs inside the vector search with Postgres row-level security, so unauthorized text is never fetched, sent to the model, or cited",
      "Fail-closed by design: if nothing authorized is relevant, the model is never called; citations are verified on the server",
      "Revoked access applies on the next question, and every answer lands in an append-only audit log",
      "395 backend and 73 frontend tests, with a 17-threat model mapped to security tests",
    ],
    tech: ["Python", "FastAPI", "Postgres", "pgvector", "Next.js", "TypeScript", "Docker", "Caddy"],
    github: "https://github.com/yatinannam/Veyl",
  },
  {
    slug: "cross-cutting",
    title: "Cross-Cutting",
    period: "2026",
    metric: "Built for SRM Hospital",
    tagline:
      "An in-house HealthTech platform for SRM Hospital, letting clinicians manage patients and run structured digital assessments.",
    points: [
      "Digitized the 23-item DSM-5 Level 1 screen and a branching decision-capacity assessment",
      "A rule-based engine scores responses into a primary and two differential diagnoses with confidence scores, exported as PDF reports",
      "Clerk-authenticated APIs with doctor-scoped data access, resumable sessions, and offline PWA support",
    ],
    tech: ["Next.js", "React", "TypeScript", "Clerk", "Supabase"],
    github: "https://github.com/yatinannam/Cross-Cutting",
    live: "https://cross-cutting.vercel.app",
  },
  {
    slug: "parakh",
    title: "Parakh",
    period: "2026",
    metric: "In progress",
    tagline:
      "A test harness for voice agents that serve Indian callers, targeting Hinglish code-mixing, phone-quality audio, and interruptions.",
    points: [
      "Plays a scripted synthetic caller to an agent in real time on a 20 ms pacer and records both sides of the call",
      "Reports latency distributions (p50 to max) plus strict and script-tolerant WER/CER that handle Devanagari vs Roman Hinglish",
      "Talks Pipecat frames over WebSocket, so unmodified Pipecat agents can be tested; runs on a CPU-only laptop with free API tiers",
    ],
    tech: ["Python", "Pipecat", "Whisper", "Silero VAD", "edge-tts"],
    github: "https://github.com/yatinannam/parakh",
  },
  {
    slug: "loom",
    title: "Loom",
    period: "2026",
    metric: "GraphRAG vs vector RAG",
    tagline:
      "A GraphRAG system for multi-hop questions: it builds a knowledge graph from your documents and compares itself against a standard vector-only baseline.",
    points: [
      "LLM-driven entity and relation extraction with validation and conservative entity resolution",
      "Three retrieval modes: vector top-k, bounded graph traversal, and a hybrid using reciprocal rank fusion",
      "Grounded JSON answers with citations to evidence and graph paths; invalid citations are stripped and flagged",
    ],
    tech: ["Python", "FastAPI", "Neo4j", "ChromaDB", "Next.js", "Docker"],
    github: "https://github.com/yatinannam/Loom",
  },
  {
    slug: "zeroemit",
    title: "ZeroEmit",
    period: "2026",
    metric: "Live PWA",
    tagline:
      "A mobile-first app for EV drivers in India that shows when the regional grid is cleanest and helps them time their charges around it.",
    points: [
      "24-hour grid-intensity forecast with a charge planner that finds the cleanest start time for a ready-by deadline",
      "Charge scoring, CO₂ avoided, leaderboards, and scheduled Web Push reminders driven by a 15-minute scheduler",
      "Privacy-first: no accounts, data stays in local storage, and the server keeps only what each feature needs",
    ],
    tech: ["Next.js", "React", "TypeScript", "Upstash Redis", "Web Push", "Leaflet"],
    github: "https://github.com/yatinannam/ZeroEmit",
    live: "https://zero-emit.vercel.app",
  },
  {
    slug: "devpulse",
    title: "devpulse",
    period: "2026",
    metric: "Single static Go binary",
    tagline:
      "A local development observability CLI that shows what's running and what's receiving traffic, with no external infrastructure.",
    points: [
      "Finds listening sockets, probes them, and fingerprints frameworks like Next.js, Vite, FastAPI, and Spring",
      "A loopback reverse proxy records live HTTP traffic for diagnostics, baselines, and anomaly detection",
      "Local-first, cross-platform, and shipped with CodeQL, govulncheck, and signed release provenance",
    ],
    tech: ["Go", "CLI", "TUI", "GoReleaser"],
    github: "https://github.com/yatinannam/devpulse",
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel-AI",
    period: "2026",
    metric: "Endpoint detection",
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
    slug: "x86-64cnn",
    title: "x86-64CNN",
    period: "2026",
    metric: "Raw assembly, no frameworks",
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
    <div className="flex items-start justify-between mb-1">
      <h3 className="text-lg font-medium">{project.title}</h3>
      <span className="label-mono pt-1">{project.period}</span>
    </div>
    {project.metric ? (
      <p className="font-mono text-xs text-primary mb-3">{project.metric}</p>
    ) : (
      <div className="mb-2" />
    )}

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

  // Lock scroll while a project is open. Unlocking happens in onExitComplete
  // below, once the closing morph animation has actually finished - clearing
  // it as soon as openSlug changes would bring the scrollbar back mid-close,
  // shift the layout, and throw off the shared layoutId transform back to
  // the card (this was making the close animation look broken).
  useEffect(() => {
    if (openSlug) {
      document.body.style.overflow = "hidden";
    }
  }, [openSlug]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <a
            href="https://github.com/yatinannam?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            More on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence onExitComplete={() => { document.body.style.overflow = ""; }}>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80"
            onClick={() => setOpenSlug(null)}
          >
            <motion.div
              layoutId={`project-${activeProject.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="panel p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto"
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
              <p className="label-mono mb-6">
                {activeProject.period}
                {activeProject.metric && (
                  <span className="text-primary"> &middot; {activeProject.metric}</span>
                )}
              </p>

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
