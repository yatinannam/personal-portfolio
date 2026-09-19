import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    name: "Languages",
    skills: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Web Development",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "REST APIs", "Tailwind CSS"],
  },
  {
    name: "AI / ML",
    skills: ["Machine Learning", "Generative AI", "LLMs", "RAG", "LangChain", "CNNs", "Scikit-learn"],
  },
  {
    name: "Cybersecurity & Systems",
    skills: ["Web Security", "OWASP", "API Security", "Linux", "Docker", "Git/GitHub", "x86-64 Assembly"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">What I work with</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <h3 className="text-sm font-medium mb-4 pb-3 border-b border-border">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
