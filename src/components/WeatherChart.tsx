import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { WeatherData, TemperatureUnit } from '../types/weather';

interface WeatherChartProps {
  data: WeatherData;
  temperatureUnit: TemperatureUnit;
}

const WeatherChart = ({ data, temperatureUnit }: WeatherChartProps) => {
  if (!data.forecast?.forecastday?.[0]?.hour) {
    return null;
  }

  // 24시간 온도 데이터 준비
  const hourlyData = data.forecast.forecastday[0].hour.map((hour, index) => ({
    time: new Date(hour.time).getHours() + ':00',
    temp: temperatureUnit === 'celsius' ? hour.temp_c : hour.temp_f,
    hour: index
  }));

  // 7일 예보 데이터 준비
  const weeklyData = data.forecast.forecastday.slice(0, 7).map((day) => ({
    date: new Date(day.date).toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    }),
    max: temperatureUnit === 'celsius' ? day.day.maxtemp_c : day.day.maxtemp_f,
    min: temperatureUnit === 'celsius' ? day.day.mintemp_c : day.day.mintemp_f,
    rain: day.day.chance_of_rain
  }));

  const unit = temperatureUnit === 'celsius' ? '°C' : '°F';

  const chartVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // 커스텀 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 text-white p-3 rounded-lg border border-white/20 backdrop-blur-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'rain' ? '%' : unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 24시간 온도 변화 차트 */}
      <div className="glass-card rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white mb-6 text-shadow">
          24시간 온도 변화
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.7)"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                tick={{ fontSize: 12 }}
                label={{ 
                  value: `온도 (${unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#60A5FA"
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 주간 예보 차트 */}
      <div className="glass-card rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white mb-6 text-shadow">
          주간 날씨 예보
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.7)"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="temp"
                orientation="left"
                stroke="rgba(255,255,255,0.7)"
                tick={{ fontSize: 12 }}
                label={{ 
                  value: `온도 (${unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <YAxis 
                yAxisId="rain"
                orientation="right"
                stroke="rgba(255,255,255,0.7)"
                tick={{ fontSize: 12 }}
                label={{ 
                  value: '강수확률 (%)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="temp"
                dataKey="max" 
                fill="#F87171" 
                name="최고온도"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="temp"
                dataKey="min" 
                fill="#60A5FA" 
                name="최저온도"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="rain"
                type="monotone"
                dataKey="rain"
                stroke="#34D399"
                strokeWidth={2}
                name="강수확률"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherChart;