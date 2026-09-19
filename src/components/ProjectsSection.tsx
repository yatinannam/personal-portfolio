import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Cross-Cutting",
    period: "2026",
    description:
      "An in-house HealthTech platform built for SRM Hospital, enabling clinicians to manage patients and conduct structured digital assessments.",
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
    title: "DBGuree",
    period: "2026",
    description:
      "A desktop AI-powered SQL workbench that translates natural-language queries into executable SQL against real databases.",
    points: [
      "Schema-aware RAG pipeline with ChromaDB and llama.cpp for local LLM inference",
      "SQL parsing, validation, persistent query history, and secure credential management",
      "Support for PostgreSQL, MySQL/MariaDB, and Microsoft SQL Server",
    ],
    tech: ["Electron", "Python", "FastAPI", "LangChain", "Qwen2.5-Coder"],
    github: "https://github.com/saurovpaul16/dbguree",
    live: undefined as string | undefined,
  },
  {
    title: "x86-64CNN",
    period: "2026",
    description:
      "A convolutional neural network implemented from scratch in x86-64 assembly for MNIST inference, without any high-level ML framework.",
    points: [
      "AVX2/FMA SIMD-optimized convolution, ReLU, pooling, and dense layers",
      "Custom memory management and matrix multiplication kernels",
      "Modular assembly interfaces for low-level inference infrastructure",
    ],
    tech: ["x86-64 Assembly", "NASM", "AVX2/FMA", "Linux"],
    github: "https://github.com/nkminion/x86-64CNN",
    live: undefined as string | undefined,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        <div className="grid lg:grid-cols-3 gap-px bg-border mt-12 rounded-md overflow-hidden">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <span className="label-mono pt-1">{project.period}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <ul className="space-y-1.5 mb-5 flex-1">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="text-xs text-muted-foreground pl-3.5 relative before:content-['—'] before:absolute before:left-0 before:text-border"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              {(project.github || project.live) ? (
                <div className="flex gap-4 pt-4 border-t border-border">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              ) : (
                <p className="label-mono pt-4 border-t border-border">
                  Private repository
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
