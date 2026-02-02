import { motion } from 'framer-motion';

const shapes = [
  { size: 'w-64 h-64', position: 'top-20 -left-32', delay: 0, duration: 6 },
  { size: 'w-96 h-96', position: 'top-40 -right-48', delay: 1, duration: 8 },
  { size: 'w-48 h-48', position: 'bottom-32 left-20', delay: 2, duration: 7 },
  { size: 'w-72 h-72', position: '-bottom-20 right-10', delay: 0.5, duration: 9 },
  { size: 'w-40 h-40', position: 'top-1/2 left-1/3', delay: 1.5, duration: 6.5 },
];

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.position}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-3xl animate-morph"
          />
        </motion.div>
      ))}
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default FloatingShapes;
