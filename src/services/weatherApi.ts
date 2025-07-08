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

// 도시별 Mock 데이터 생성 함수
function generateMockDataForCity(query: string): WeatherData {
  const cityMockData = { ...mockWeatherData };
  const lowerQuery = query.toLowerCase();
  
  // 도시별 기본 정보와 날씨 패턴 설정
  const cityData: Record<string, { name: string; country: string; temp: number; condition: string; code: number; humidity: number; windKph: number }> = {
    // 한국 도시들
    'seoul': { name: 'Seoul', country: 'South Korea', temp: 22, condition: 'Partly cloudy', code: 1003, humidity: 65, windKph: 10.8 },
    'busan': { name: 'Busan', country: 'South Korea', temp: 24, condition: 'Clear', code: 1000, humidity: 70, windKph: 12.3 },
    'incheon': { name: 'Incheon', country: 'South Korea', temp: 21, condition: 'Cloudy', code: 1006, humidity: 68, windKph: 9.5 },
    'daegu': { name: 'Daegu', country: 'South Korea', temp: 25, condition: 'Sunny', code: 1000, humidity: 60, windKph: 8.2 },
    'daejeon': { name: 'Daejeon', country: 'South Korea', temp: 23, condition: 'Partly cloudy', code: 1003, humidity: 63, windKph: 11.1 },
    'gwangju': { name: 'Gwangju', country: 'South Korea', temp: 26, condition: 'Clear', code: 1000, humidity: 58, windKph: 7.8 },
    
    // 일본 도시들
    'tokyo': { name: 'Tokyo', country: 'Japan', temp: 26, condition: 'Clear', code: 1000, humidity: 72, windKph: 13.5 },
    'osaka': { name: 'Osaka', country: 'Japan', temp: 27, condition: 'Partly cloudy', code: 1003, humidity: 75, windKph: 11.8 },
    'kyoto': { name: 'Kyoto', country: 'Japan', temp: 25, condition: 'Cloudy', code: 1006, humidity: 78, windKph: 9.2 },
    'yokohama': { name: 'Yokohama', country: 'Japan', temp: 26, condition: 'Clear', code: 1000, humidity: 73, windKph: 12.7 },
    
    // 중국 도시들
    'beijing': { name: 'Beijing', country: 'China', temp: 28, condition: 'Hazy', code: 1030, humidity: 45, windKph: 15.2 },
    'shanghai': { name: 'Shanghai', country: 'China', temp: 29, condition: 'Partly cloudy', code: 1003, humidity: 80, windKph: 14.1 },
    'guangzhou': { name: 'Guangzhou', country: 'China', temp: 32, condition: 'Hot', code: 1000, humidity: 85, windKph: 8.9 },
    
    // 미국 도시들
    'new york': { name: 'New York', country: 'United States', temp: 20, condition: 'Light rain', code: 1063, humidity: 82, windKph: 16.4 },
    'los angeles': { name: 'Los Angeles', country: 'United States', temp: 24, condition: 'Sunny', code: 1000, humidity: 55, windKph: 7.3 },
    'chicago': { name: 'Chicago', country: 'United States', temp: 18, condition: 'Overcast', code: 1009, humidity: 75, windKph: 19.2 },
    'miami': { name: 'Miami', country: 'United States', temp: 30, condition: 'Partly cloudy', code: 1003, humidity: 88, windKph: 12.1 },
    'san francisco': { name: 'San Francisco', country: 'United States', temp: 16, condition: 'Fog', code: 1135, humidity: 90, windKph: 13.8 },
    
    // 유럽 도시들
    'london': { name: 'London', country: 'United Kingdom', temp: 15, condition: 'Light rain', code: 1063, humidity: 85, windKph: 14.7 },
    'paris': { name: 'Paris', country: 'France', temp: 19, condition: 'Cloudy', code: 1006, humidity: 68, windKph: 11.3 },
    'berlin': { name: 'Berlin', country: 'Germany', temp: 17, condition: 'Overcast', code: 1009, humidity: 72, windKph: 12.9 },
    'madrid': { name: 'Madrid', country: 'Spain', temp: 27, condition: 'Sunny', code: 1000, humidity: 42, windKph: 8.5 },
    'rome': { name: 'Rome', country: 'Italy', temp: 25, condition: 'Clear', code: 1000, humidity: 58, windKph: 9.7 },
    
    // 동남아시아 도시들
    'bangkok': { name: 'Bangkok', country: 'Thailand', temp: 33, condition: 'Hot', code: 1000, humidity: 78, windKph: 6.2 },
    'singapore': { name: 'Singapore', country: 'Singapore', temp: 31, condition: 'Thundery outbreaks possible', code: 1087, humidity: 84, windKph: 8.1 },
    'kuala lumpur': { name: 'Kuala Lumpur', country: 'Malaysia', temp: 32, condition: 'Partly cloudy', code: 1003, humidity: 82, windKph: 7.4 },
    'jakarta': { name: 'Jakarta', country: 'Indonesia', temp: 30, condition: 'Heavy rain', code: 1195, humidity: 89, windKph: 5.8 },
    
    // 기타 주요 도시들
    'sydney': { name: 'Sydney', country: 'Australia', temp: 21, condition: 'Partly cloudy', code: 1003, humidity: 65, windKph: 18.3 },
    'dubai': { name: 'Dubai', country: 'United Arab Emirates', temp: 38, condition: 'Sunny', code: 1000, humidity: 35, windKph: 12.6 },
    'mumbai': { name: 'Mumbai', country: 'India', temp: 29, condition: 'Monsoon rain', code: 1201, humidity: 92, windKph: 22.1 }
  };
  
  // 도시 찾기
  let cityInfo = null;
  for (const [key, value] of Object.entries(cityData)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      cityInfo = value;
      break;
    }
  }
  
  // 도시를 찾지 못한 경우, 기본값으로 Seoul 사용하되 이름만 변경
  if (!cityInfo) {
    cityInfo = { 
      name: query, 
      country: 'Unknown', 
      temp: 20 + Math.floor(Math.random() * 15), 
      condition: 'Partly cloudy', 
      code: 1003, 
      humidity: 60 + Math.floor(Math.random() * 30),
      windKph: 5 + Math.floor(Math.random() * 15)
    };
  }
  
  // Mock 데이터 업데이트
  cityMockData.location.name = cityInfo.name;
  cityMockData.location.country = cityInfo.country;
  cityMockData.current.temp_c = cityInfo.temp;
  cityMockData.current.temp_f = Math.round(cityInfo.temp * 9/5 + 32);
  cityMockData.current.condition.text = cityInfo.condition;
  cityMockData.current.condition.code = cityInfo.code;
  cityMockData.current.humidity = cityInfo.humidity;
  cityMockData.current.wind_kph = cityInfo.windKph;
  cityMockData.current.wind_mph = Math.round(cityInfo.windKph * 0.621371);
  cityMockData.current.feels_like_c = cityInfo.temp + Math.floor(Math.random() * 4) - 2;
  cityMockData.current.feels_like_f = Math.round(cityMockData.current.feels_like_c * 9/5 + 32);
  
  return cityMockData;
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
      
      // 쿼리에 따른 mock 데이터 생성
      const mockData = generateMockDataForCity(query);
      
      return mockData;
    } catch (error) {
      console.error('Weather API error:', error);
      throw new Error(`${query}의 날씨 정보를 찾을 수 없습니다. 다른 도시명을 시도해보세요.`);
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