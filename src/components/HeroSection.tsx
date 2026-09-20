import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const statusRows = [
  { label: "ROLE", value: "Full-Stack Intern, EvoDoc" },
  { label: "LEAD", value: "Technical Lead, Founders Club" },
  { label: "BASE", value: "Bengaluru, India" },
  { label: "FOCUS", value: "Healthcare systems, AI/ML, security" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeroSection = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen pt-16 px-4 md:px-8 lg:px-16"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center py-20"
      >
        <div>
          <motion.p variants={item} className="label-mono mb-6">
            Full-stack engineer &mdash; systems &amp; security
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-8"
          >
            Yatin Annam
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            I build production software end to end &mdash; from clinical
            workflows and AI-assisted developer tools to inference engines
            written in raw assembly. Currently studying cybersecurity at SRM
            and shipping healthcare software at EvoDoc.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View my work
            </a>

            <a
              href="/Yatin-Annam-Resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-md text-sm font-medium hover:border-primary/50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Résumé
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/yatinannam", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/yatinannam/", label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Status panel */}
        <motion.div variants={item} className="panel p-6">
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="label-mono">Currently</span>
          </div>
          <dl className="space-y-4">
            {statusRows.map((row) => (
              <div key={row.label} className="flex gap-4">
                <dt className="label-mono w-14 shrink-0 pt-0.5">
                  {row.label}
                </dt>
                <dd className="text-sm text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScrollHint && (
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="label-mono">Scroll</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
