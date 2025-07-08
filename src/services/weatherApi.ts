import axios from 'axios';
import { WeatherData } from '../types/weather';

// WeatherAPI.com 무료 API 사용 (실제 사용 시 사용자의 API 키가 필요)
const API_KEY = 'your-api-key-here'; // 실제 사용 시 환경 변수로 관리
const BASE_URL = 'https://api.weatherapi.com/v1';

// Mock 데이터 (실제 API 키가 없을 때 사용)
const mockWeatherData: WeatherData = {
  location: {
    name: "Seoul",
    country: "South Korea",
    region: "Seoul",
    lat: 37.57,
    lon: 126.98
  },
  current: {
    temp_c: 22,
    temp_f: 72,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 1003
    },
    humidity: 65,
    wind_kph: 10.8,
    wind_mph: 6.7,
    feels_like_c: 24,
    feels_like_f: 75,
    uv: 5,
    vis_km: 10
  },
  forecast: {
    forecastday: [
      {
        date: "2024-07-08",
        day: {
          maxtemp_c: 28,
          maxtemp_f: 82,
          mintemp_c: 18,
          mintemp_f: 64,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          chance_of_rain: 20
        },
        hour: generateHourlyData()
      },
      {
        date: "2024-07-09",
        day: {
          maxtemp_c: 25,
          maxtemp_f: 77,
          mintemp_c: 16,
          mintemp_f: 61,
          condition: {
            text: "Light rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
          },
          chance_of_rain: 80
        },
        hour: generateHourlyData()
      },
      {
        date: "2024-07-10",
        day: {
          maxtemp_c: 30,
          maxtemp_f: 86,
          mintemp_c: 20,
          mintemp_f: 68,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
          },
          chance_of_rain: 5
        },
        hour: generateHourlyData()
      }
    ]
  }
};

function generateHourlyData() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({
      time: `2024-07-08 ${i.toString().padStart(2, '0')}:00`,
      temp_c: Math.floor(Math.random() * 15) + 15,
      temp_f: Math.floor(Math.random() * 27) + 59,
      condition: {
        text: i % 3 === 0 ? "Clear" : i % 3 === 1 ? "Partly cloudy" : "Cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
      }
    });
  }
  return hours;
}

export const weatherApi = {
  getCurrentWeather: async (query: string): Promise<WeatherData> => {
    try {
      // 실제 API 호출 (API 키가 있을 때)
      if (API_KEY && API_KEY !== 'your-api-key-here') {
        const response = await axios.get(
          `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=no`
        );
        return response.data;
      }
      
      // Mock 데이터 반환 (데모용)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
      
      // 쿼리에 따른 mock 데이터 변경
      const mockData = { ...mockWeatherData };
      if (query.toLowerCase().includes('tokyo')) {
        mockData.location.name = 'Tokyo';
        mockData.location.country = 'Japan';
        mockData.current.temp_c = 26;
      } else if (query.toLowerCase().includes('new york')) {
        mockData.location.name = 'New York';
        mockData.location.country = 'United States';
        mockData.current.temp_c = 20;
      } else if (query.toLowerCase().includes('london')) {
        mockData.location.name = 'London';
        mockData.location.country = 'United Kingdom';
        mockData.current.temp_c = 15;
        mockData.current.condition.text = 'Light rain';
        mockData.current.condition.code = 296;
      }
      
      return mockData;
    } catch (error) {
      console.error('Weather API error:', error);
      throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }
  },

  getCurrentLocationWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      if (API_KEY && API_KEY !== 'your-api-key-here') {
        const response = await axios.get(
          `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
        );
        return response.data;
      }
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockWeatherData;
    } catch (error) {
      console.error('Geolocation weather API error:', error);
      throw new Error('현재 위치의 날씨 정보를 가져오는데 실패했습니다.');
    }
  }
};