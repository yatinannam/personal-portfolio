import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

const categories = ['All', 'Web App', 'Mobile', 'Design'];

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web App',
    description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'from-primary/30 to-accent/30',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Finance Dashboard',
    category: 'Web App',
    description: 'Interactive financial analytics dashboard with real-time data visualization and predictive insights.',
    tech: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    color: 'from-accent/30 to-secondary/30',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    category: 'Mobile',
    description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics.',
    tech: ['React Native', 'Firebase', 'HealthKit'],
    color: 'from-secondary/30 to-primary/30',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Brand Identity System',
    category: 'Design',
    description: 'Complete brand identity design including logo, typography, color system, and guidelines.',
    tech: ['Figma', 'Illustrator', 'After Effects'],
    color: 'from-primary/30 to-secondary/30',
    link: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'AI Chat Assistant',
    category: 'Web App',
    description: 'Intelligent chatbot powered by GPT with custom training and natural conversations.',
    tech: ['Next.js', 'OpenAI', 'Prisma', 'Tailwind'],
    color: 'from-accent/30 to-primary/30',
    link: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'Travel Booking App',
    category: 'Mobile',
    description: 'Beautiful travel booking experience with personalized recommendations and seamless payments.',
    tech: ['Flutter', 'Node.js', 'AWS', 'Stripe'],
    color: 'from-secondary/30 to-accent/30',
    link: '#',
    github: '#',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section relative">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <span className="gradient-text">My Projects</span>
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-muted'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="glass-hover p-6 h-full flex flex-col">
                {/* Project Image Placeholder */}
                <div className={`relative h-48 mb-6 rounded-xl bg-gradient-to-br ${project.color} overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                  >
                    <span className="text-sm font-medium">Click to view details</span>
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-background/20 backdrop-blur-sm"
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium bg-muted rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="glass p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-display font-bold mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`h-64 mb-6 rounded-xl bg-gradient-to-br ${selectedProject.color}`} />

            <p className="text-muted-foreground mb-6">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium bg-muted rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <motion.a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
              <motion.a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:border-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                Source Code
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
