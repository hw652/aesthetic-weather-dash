import { motion } from 'framer-motion';
import { WeatherCondition } from '../types/weather';

interface WeatherBackgroundProps {
  condition: WeatherCondition;
  children: React.ReactNode;
}

const backgroundClasses = {
  clear: 'bg-sunny',
  cloudy: 'bg-cloudy floating-clouds',
  rainy: 'bg-rainy',
  snowy: 'bg-snowy',
  default: 'bg-cloudy'
};

const WeatherBackground = ({ condition, children }: WeatherBackgroundProps) => {
  return (
    <motion.div 
      className={`min-h-screen w-full relative overflow-hidden ${backgroundClasses[condition]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Animated particles based on weather */}
      {condition === 'rainy' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-200 opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
              }}
              animate={{
                y: '100vh',
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
      
      {condition === 'snowy' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
              }}
              animate={{
                y: '100vh',
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default WeatherBackground;