import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useWeather } from '../hooks/useWeather';
import WeatherBackground from '../components/WeatherBackground';
import SearchBox from '../components/SearchBox';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';

const Index = () => {
  const { toast } = useToast();
  const {
    weatherData,
    loading,
    error,
    temperatureUnit,
    weatherCondition,
    searchWeather,
    getCurrentLocationWeather,
    toggleTemperatureUnit,
  } = useWeather();

  const handleSearch = async (query: string) => {
    try {
      await searchWeather(query);
      toast({
        title: "날씨 정보 조회 완료",
        description: `${query}의 날씨 정보를 성공적으로 가져왔습니다.`,
      });
    } catch (err) {
      toast({
        title: "오류",
        description: "날씨 정보를 가져오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleLocationSearch = async () => {
    try {
      await getCurrentLocationWeather();
      toast({
        title: "현재 위치 날씨 조회 완료",
        description: "현재 위치의 날씨 정보를 성공적으로 가져왔습니다.",
      });
    } catch (err) {
      toast({
        title: "위치 오류",
        description: error || "현재 위치의 날씨 정보를 가져올 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <WeatherBackground condition={weatherCondition}>
      <div className="min-h-screen">
        {/* Header */}
        <motion.div
          className="pt-8 pb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2 text-shadow">
              날씨 감성 대시보드
            </h1>
            <p className="text-white/80 text-center text-lg">
              실시간 날씨 정보와 아름다운 시각화를 만나보세요
            </p>
          </div>
        </motion.div>

        {/* Search Section */}
        <div className="container mx-auto px-4 mb-8">
          <SearchBox 
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            loading={loading}
          />
        </div>

        {/* Weather Content */}
        <div className="container mx-auto px-4 pb-8">
          {loading && (
            <motion.div
              className="flex items-center justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="glass-card rounded-2xl p-8 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white">
                  <motion.div
                    className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-lg">날씨 정보를 가져오는 중...</span>
                </div>
              </div>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              className="flex items-center justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="glass-card rounded-2xl p-8 backdrop-blur-md text-center">
                <p className="text-red-300 text-lg mb-4">{error}</p>
                <p className="text-white/70">
                  다른 도시명으로 다시 시도해보거나 현재 위치를 사용해주세요.
                </p>
              </div>
            </motion.div>
          )}

          {weatherData && !loading && (
            <div className="space-y-8">
              {/* Weather Card */}
              <div className="flex justify-center">
                <WeatherCard
                  data={weatherData}
                  temperatureUnit={temperatureUnit}
                  onToggleUnit={toggleTemperatureUnit}
                />
              </div>

              {/* Weather Charts */}
              {weatherData.forecast && (
                <div className="max-w-6xl mx-auto">
                  <WeatherChart
                    data={weatherData}
                    temperatureUnit={temperatureUnit}
                  />
                </div>
              )}
            </div>
          )}

          {!weatherData && !loading && !error && (
            <motion.div
              className="flex items-center justify-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card rounded-2xl p-8 backdrop-blur-md text-center max-w-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  🌤️ 환영합니다!
                </h3>
                <p className="text-white/80 mb-6">
                  원하는 도시의 날씨를 검색하거나 현재 위치의 날씨를 확인해보세요.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <p>도시명으로 검색</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📍</div>
                    <p>현재 위치 날씨</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </WeatherBackground>
  );
};

export default Index;
