import { apis } from "../data/api-config";
import type { LocationData, WeatherData } from "../types";

const weatherIcons: Record<string, { description: string; emoji: string; icon: string }> = {
  "0": { "description": "Clear sky", "emoji": "☀️", "icon": "sun" },
  "1": { "description": "Partly cloudy", "emoji": "🌤️", "icon": "cloud-sun" },
  "2": { "description": "Cloudy", "emoji": "☁️", "icon": "cloud" },
  "3": { "description": "Overcast", "emoji": "🌥️", "icon": "cloud-meatball" },
  "4": { "description": "Fog", "emoji": "🌫️", "icon": "smog" },
  "9": { "description": "Drizzle", "emoji": "🌦️", "icon": "cloud-drizzle" },
  "10": { "description": "Rain", "emoji": "🌧️", "icon": "cloud-rain" },
  "11": { "description": "Thunderstorm", "emoji": "⛈️", "icon": "cloud-bolt" },
  "13": { "description": "Snow", "emoji": "🌨️", "icon": "cloud-snow" },
  "14": { "description": "Blowing snow", "emoji": "🌬️❄️", "icon": "wind-snow" },
  "15": { "description": "Hail", "emoji": "🌩️🧊", "icon": "cloud-hail" },
  "17": { "description": "Thunderstorm without precipitation", "emoji": "🌩️", "icon": "bolt" },
  "20": { "description": "Mist", "emoji": "🌫️", "icon": "water" },
  "30": { "description": "Duststorm", "emoji": "🌪️", "icon": "wind" },
  "40": { "description": "Rain showers", "emoji": "🌦️", "icon": "cloud-showers-heavy" },
  "50": { "description": "Drizzle, not freezing", "emoji": "🌧️", "icon": "cloud-drizzle" },
  "60": { "description": "Rain, not freezing", "emoji": "🌧️", "icon": "cloud-rain" },
  "70": { "description": "Snow", "emoji": "❄️", "icon": "snowflake" },
  "80": { "description": "Rain showers", "emoji": "🌦️", "icon": "cloud-showers-heavy" },
  "81": { "description": "Rain showers, slight", "emoji": "🌧️", "icon": "cloud-sun-rain" },
  "82": { "description": "Rain showers, heavy", "emoji": "🌧️🌧️", "icon": "cloud-showers-heavy" },
  "85": { "description": "Snow showers, slight", "emoji": "🌨️", "icon": "cloud-snow" },
  "86": { "description": "Snow showers, heavy", "emoji": "🌨️❄️", "icon": "snowflake" },
  "95": { "description": "Thunderstorm, slight or moderate", "emoji": "⛈️", "icon": "cloud-bolt" },
  "96": { "description": "Thunderstorm with hail", "emoji": "⛈️🧊", "icon": "cloud-bolt-hail" },
  "99": { "description": "Severe thunderstorm", "emoji": "🌩️⚡", "icon": "bolt" }
};


export class ApiService {
  static async fetchAPI(command: string): Promise<string | string[]> {
    const api = apis[command];
    if (!api) {
      throw new Error("API not found");
    }

    const response = await fetch(api.url, {
      headers: api.headers || {},
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return api.parse(data);
  }

  static async fetchLocation(): Promise<LocationData> {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    return response.json();
  }

  static async fetchWeather(location: LocationData): Promise<string[]> {
    const { latitude, longitude, city, country_name } = location;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: WeatherData = await response.json();
    const lines = [`Weather for ${city}, ${country_name}`];

    const processEntry = (key: string, value: any) => {
      if (typeof value === "object" && value !== null) {
        lines.push(`<i>${key}</i>`);
        Object.entries(value).forEach(([childKey, childValue]) => {
          processEntry(childKey, childValue);
        });
      } else {
        if (key === "weathercode") {
          const code = String(value);
          const entry = weatherIcons[code];

          if (entry) {
            lines.push(`<i>${key}</i> ${entry.emoji}`);
          } else {
            lines.push(`<i>${key}</i> ${value}`);
          }
          return;
        }
        lines.push(`<i>${key}</i> ${value}`);
      }
    };

    Object.entries(weatherData).forEach(([k, v]) => {
      processEntry(k, v);
    });

    return lines;
  }
}
