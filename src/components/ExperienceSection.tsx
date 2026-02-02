import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    description: 'Leading the frontend team in building scalable web applications using React and TypeScript. Mentoring junior developers and implementing best practices.',
    achievements: ['Improved app performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipelines'],
  },
  {
    id: 2,
    type: 'work',
    title: 'Full Stack Developer',
    company: 'StartupHub',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple full-stack applications. Collaborated with design team to create intuitive user interfaces.',
    achievements: ['Built 3 products from scratch', 'Reduced load time by 60%', 'Integrated 10+ third-party APIs'],
  },
  {
    id: 3,
    type: 'education',
    title: 'Master of Computer Science',
    company: 'Stanford University',
    period: '2018 - 2020',
    description: 'Specialized in Human-Computer Interaction and Software Engineering. Thesis on improving accessibility in web applications.',
    achievements: ['GPA: 3.9/4.0', 'Published 2 research papers', 'Teaching Assistant for Web Dev'],
  },
  {
    id: 4,
    type: 'work',
    title: 'Junior Developer',
    company: 'Digital Agency',
    period: '2017 - 2018',
    description: 'Started my professional journey building websites and web applications for various clients across different industries.',
    achievements: ['Completed 20+ client projects', 'Learned agile methodologies', 'First experience with React'],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section relative">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary origin-top"
          />

          {/* Timeline Items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
              >
                <div className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center pulse-glow">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-5 h-5 text-primary" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  )}
                </div>
              </motion.div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-hover p-6"
                >
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                  <h3 className="text-xl font-display font-semibold mt-2">{exp.title}</h3>
                  <p className="text-muted-foreground mt-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-4">{exp.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.7 + index * 0.2 + i * 0.1 }}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {achievement}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
