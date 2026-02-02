import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent"
          />

          {/* Inner content */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-display font-bold gradient-text"
            >
              YA
            </motion.span>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-2"
        >
          <p className="text-muted-foreground">Loading my portfolio...</p>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
