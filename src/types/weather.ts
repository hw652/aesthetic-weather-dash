export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    feels_like_c: number;
    feels_like_f: number;
    uv: number;
    vis_km: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export type WeatherCondition = 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'default';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  temperatureUnit: TemperatureUnit;
  weatherCondition: WeatherCondition;
  searchWeather: (query: string) => Promise<void>;
  getCurrentLocationWeather: () => Promise<void>;
  toggleTemperatureUnit: () => void;
}