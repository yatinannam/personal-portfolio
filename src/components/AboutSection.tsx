import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const domains = [
  {
    name: "Full-Stack Engineering",
    detail: "Production apps at EvoDoc and Cross-Cutting, built end to end",
  },
  {
    name: "AI / ML",
    detail: "RAG pipelines in DBGuree, graph-based fraud detection in RiskLattice",
  },
  {
    name: "Cybersecurity",
    detail: "Endpoint detection in Sentinel-AI, OWASP-aligned web security",
  },
  {
    name: "Systems Programming",
    detail: "A CNN in raw x86-64 assembly, SIMD-optimized from scratch",
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

        <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] gap-16 items-start mt-12">
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
            className="space-y-5 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a Computer Science &amp; Cybersecurity student at SRM Institute
              of Science and Technology, currently working as a full-stack
              intern at EvoDoc, where I build clinical and hospital-administration
              software used by real clinicians. I also lead the technical
              direction of Founders Club, a student engineering team, where I
              own architecture decisions, code review standards, and delivery
              across several concurrent projects.
            </p>
            <p>
              Outside of work I build things nobody assigned me: a fraud-graph
              engine that reasons about coordinated attacks instead of scoring
              transactions one at a time, an endpoint-detection app that
              classifies threats locally, a CLI that watches what my own dev
              environment is doing, and a narrative game with a fully
              offline, deterministic engine. Most of it starts from wanting to
              understand a system well enough to rebuild a piece of it myself
              &mdash; which is also why I ended up writing a CNN in raw
              assembly instead of just calling a library.
            </p>
            <p>
              That instinct carries into how I ship production work too:
              I care about security and correctness by default, not as an
              afterthought, and I'd rather read the RFC or the source than
              take a library's behavior on faith.
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
