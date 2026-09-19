import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  {
    title: "Full Stack Intern",
    org: "EvoDoc",
    period: "May 2026 — Present",
    description:
      "Contributing to hospital management and clinical information systems, building digital workflows across OPD, patient management, and hospital administration.",
    points: [
      "Full-stack features for production healthcare applications",
      "Next.js, React, TypeScript, Supabase, and database workflows",
      "Translating hospital processes into scalable software",
    ],
  },
  {
    title: "Technical Lead",
    org: "Founders Club",
    period: "Mar 2025 — Present",
    description:
      "Leading the technical direction of a multi-project engineering team, from architecture to production delivery.",
    points: [
      "Architecture, code review, and Git workflow standards",
      "Mentoring developers on full-stack practices and code quality",
      "Delivery across the club's software ecosystem",
    ],
  },
];

const education = [
  {
    school: "SRM Institute of Science and Technology, Chennai",
    program: "B.Tech, Computer Science Engineering (Cybersecurity)",
    period: "Aug 2024 — May 2028",
  },
  {
    school: "Sri Chaitanya Techno School",
    program: "PCMC, CBSE 12th",
    period: "Jul 2022 — Mar 2024",
  },
];

const certifications = [
  { name: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "Jul 2025" },
  { name: "Introduction to Critical Infrastructure Protection", issuer: "OPSWAT Academy", date: "Jun 2025" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
        </motion.div>

        <div className="mt-14 max-w-3xl">
          <div className="relative border-l border-border pl-8 space-y-14">
            {experience.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[calc(2rem+3.5px)] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <p className="label-mono mb-2">{role.period}</p>
                <h3 className="text-xl font-medium">{role.title}</h3>
                <p className="text-primary text-sm mt-0.5">{role.org}</p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  {role.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-muted-foreground pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-border"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mt-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="section-kicker">Education</p>
            <div className="space-y-5">
              {education.map((entry) => (
                <div key={entry.school}>
                  <p className="text-sm font-medium">{entry.school}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{entry.program}</p>
                  <p className="label-mono mt-1">{entry.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="section-kicker">Certifications</p>
            <div className="space-y-5">
              {certifications.map((cert) => (
                <div key={cert.name}>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
                  <p className="label-mono mt-1">{cert.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
