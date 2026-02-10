import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Zap, Heart } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    label: "Clean Code",
    description: "Writing maintainable, scalable solutions",
  },
  {
    icon: Palette,
    label: "Creative Design",
    description: "Crafting beautiful user experiences",
  },
  {
    icon: Zap,
    label: "Fast Delivery",
    description: "Efficient and timely project completion",
  },
  {
    icon: Heart,
    label: "Passionate",
    description: "Dedicated to continuous learning",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section relative">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <span className="gradient-text">About Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>

              {/* Profile placeholder */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Yatin Annam"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-medium">1 Year Exp</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-medium">15+ Projects</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold">
              Crafting Digital Experiences with{" "}
              <span className="gradient-text">Passion & Precision</span>
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a full-stack developer and designer based in San Francisco,
                with a passion for creating beautiful, functional, and
                user-centered digital experiences.
              </p>
              <p>
                With over 5 years of experience in the tech industry, I've had
                the privilege of working with startups and established companies
                alike, helping them bring their visions to life through
                thoughtful design and clean code.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or enjoying a good cup of
                coffee while sketching new ideas.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-hover p-6 text-center group"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <h4 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
