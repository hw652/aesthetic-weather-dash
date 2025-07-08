import { useState, useCallback } from 'react';
import { WeatherData, WeatherCondition, TemperatureUnit } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const getWeatherCondition = useCallback((conditionCode: number): WeatherCondition => {
    // WeatherAPI.com 조건 코드 기반 매핑
    if (conditionCode >= 1000 && conditionCode <= 1003) return 'clear';
    if (conditionCode >= 1006 && conditionCode <= 1030) return 'cloudy';
    if (conditionCode >= 1063 && conditionCode <= 1201) return 'rainy';
    if (conditionCode >= 1210 && conditionCode <= 1282) return 'snowy';
    return 'default';
  }, []);

  const weatherCondition = weatherData 
    ? getWeatherCondition(weatherData.current.condition.code)
    : 'default';

  const searchWeather = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getCurrentWeather(query);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocationWeather = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('위치 서비스가 지원되지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      const data = await weatherApi.getCurrentLocationWeather(latitude, longitude);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('위치 접근이 거부되었습니다.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('위치 정보를 사용할 수 없습니다.');
            break;
          case err.TIMEOUT:
            setError('위치 요청 시간이 초과되었습니다.');
            break;
          default:
            setError('위치를 가져오는데 실패했습니다.');
        }
      } else {
        setError('현재 위치의 날씨 정보를 가져오는데 실패했습니다.');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTemperatureUnit = useCallback(() => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  }, []);

  return {
    weatherData,
    loading,
    error,
    temperatureUnit,
    weatherCondition,
    searchWeather,
    getCurrentLocationWeather,
    toggleTemperatureUnit,
  };
};