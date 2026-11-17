import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const domains = [
  {
    name: "Full-Stack Engineering",
    detail: "Production hospital software at EvoDoc, and Cross-Cutting for SRM Hospital",
  },
  {
    name: "AI Systems",
    detail: "A cost-aware LLM gateway in Weir, GraphRAG in Loom, voice-agent testing in Parakh",
  },
  {
    name: "Security",
    detail: "Permission-aware retrieval in Veyl, endpoint detection in Sentinel-AI",
  },
  {
    name: "Systems & Tooling",
    detail: "A Go observability CLI in devpulse, a CNN in raw x86-64 assembly",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-kicker">About</p>
          <h2 className="section-title">Range, applied deliberately</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-16 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="aspect-square rounded-md border border-border overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Yatin Annam"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a third-year Computer Science &amp; Cybersecurity student
              at SRM. Right now I'm a technical intern at Siemens, building
              automation with Asia Pacific teams, and a full-stack intern at
              EvoDoc, shipping hospital software. Outside of that, I build
              things nobody assigned me &mdash; a few of them are below. I
              like measuring what I build (cost, latency, test coverage)
              instead of assuming it works, and I bring a security-first habit
              to everything I ship.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-16 rounded-md overflow-hidden"
        >
          {domains.map((domain) => (
            <div key={domain.name} className="bg-card p-6">
              <h3 className="font-medium mb-2">{domain.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {domain.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
