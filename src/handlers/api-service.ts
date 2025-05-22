import { apis } from "../data/api-config";
import type { LocationData, WeatherData } from "../types";

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

    const processEntry = (key: string, value: any, indent: number = 0) => {
      const prefix = "  ".repeat(indent);
      if (typeof value === "object" && value !== null) {
        lines.push(`${prefix}<i>${key}</i>:`);
        Object.entries(value).forEach(([childKey, childValue]) => {
          processEntry(childKey, childValue, indent + 1);
        });
      } else {
        lines.push(`${prefix}<i>${key}</i>: ${value}`);
      }
    };

    Object.entries(weatherData).forEach(([k, v]) => {
      processEntry(k, v);
    });

    return lines;
  }
}
