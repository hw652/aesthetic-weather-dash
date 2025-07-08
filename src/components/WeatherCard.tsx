import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { Button } from './ui/button';

interface WeatherCardProps {
  data: WeatherData;
  temperatureUnit: TemperatureUnit;
  onToggleUnit: () => void;
}

const WeatherCard = ({ data, temperatureUnit, onToggleUnit }: WeatherCardProps) => {
  const currentTemp = temperatureUnit === 'celsius' ? data.current.temp_c : data.current.temp_f;
  const feelsLike = temperatureUnit === 'celsius' ? data.current.feels_like_c : data.current.feels_like_f;
  const unit = temperatureUnit === 'celsius' ? '°C' : '°F';

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="glass-card rounded-3xl p-8 backdrop-blur-md mx-auto max-w-md w-full text-white shadow-2xl"
    >
      {/* Location and Temperature Unit Toggle */}
      <motion.div variants={itemVariants} className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-shadow">
            {data.location.name}
          </h2>
          <p className="text-white/80 text-sm">
            {data.location.region}, {data.location.country}
          </p>
        </div>
        <Button
          onClick={onToggleUnit}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          {unit}
        </Button>
      </motion.div>

      {/* Main Temperature Display */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src={data.current.condition.icon} 
            alt={data.current.condition.text}
            className="w-16 h-16"
          />
          <div className="text-6xl font-thin text-shadow">
            {Math.round(currentTemp)}
            <span className="text-3xl">{unit}</span>
          </div>
        </div>
        
        <p className="text-lg text-white/90 text-shadow capitalize">
          {data.current.condition.text}
        </p>
        <p className="text-sm text-white/70">
          체감온도 {Math.round(feelsLike)}{unit}
        </p>
      </motion.div>

      {/* Weather Details Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-5 w-5 text-blue-300" />
            <span className="text-sm text-white/80">습도</span>
          </div>
          <p className="text-xl font-semibold">{data.current.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="h-5 w-5 text-green-300" />
            <span className="text-sm text-white/80">풍속</span>
          </div>
          <p className="text-xl font-semibold">{data.current.wind_kph} km/h</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5 text-purple-300" />
            <span className="text-sm text-white/80">가시거리</span>
          </div>
          <p className="text-xl font-semibold">{data.current.vis_km} km</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-orange-300" />
            <span className="text-sm text-white/80">UV 지수</span>
          </div>
          <p className="text-xl font-semibold">{data.current.uv}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard;