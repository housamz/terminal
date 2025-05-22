// Type definitions for the terminal application

export interface DataEntry {
  description: string;
  lines: string[];
  type: "list" | "paragraph" | "welcome";
}

export interface ApiConfig {
  description: string;
  headers?: Record<string, string>;
  parse: (data: any) => string | string[];
  url: string;
}

export interface WeatherData {
  current_weather: Record<string, any>;
}

export interface LocationData {
  city: string;
  country_name: string;
  latitude: number;
  longitude: number;
  region: string;
}

export type CommandType =
  | ""
  | "clear"
  | "contact"
  | "date"
  | "fact"
  | "geek"
  | "help"
  | "history"
  | "ip"
  | "joke"
  | "projects"
  | "quote"
  | "skills"
  | "test"
  | "weather"
  | "welcome"
  | "whoami";
