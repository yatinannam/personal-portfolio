import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Next.js" },
      { name: "Flutter" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Python" },
      { name: "PostgreSQL" },
    ],
  },
  {
    name: "Languages",
    skills: [
      { name: "Java" },
      { name: "C" },
      { name: "Python" },
      { name: "C++" },
      { name: "Ruby" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git/GitHub" },
      { name: "AWS" },
      { name: "n8n" },
      { name: "Docker" },
      { name: "Figma" },
    ],
  },
];

const SkillCard = ({
  skill,
  index,
  isInView,
}: {
  skill: { name: string };
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-hover p-6 text-center cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="text-2xl font-display font-bold text-primary">
          {skill.name.slice(0, 2)}
        </span>
      </div>
      <h4 className="font-display font-semibold">{skill.name}</h4>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="section relative">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <span className="gradient-text">Skills & Expertise</span>
        </motion.h2>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-muted"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[
            { label: "Projects Completed", value: "20+" },
            { label: "Year Experience", value: "1" },
            { label: "Technologies", value: "10+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <motion.span
                className="text-4xl md:text-5xl font-display font-bold gradient-text"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
