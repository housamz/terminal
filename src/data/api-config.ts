import type { ApiConfig } from "../types";

export const apis: Record<string, ApiConfig> = {
  joke: {
    url: "https://icanhazdadjoke.com/",
    headers: { Accept: "application/json" },
    parse: (res: { joke: string }): string => res.joke,
    description: "Get a random joke",
  },
  geek: {
    url: "https://geek-jokes.sameerkumar.website/api?format=json",
    parse: (res: { joke: string }): string => res.joke,
    description: "Get a random geek joke",
  },
  fact: {
    url: "https://uselessfacts.jsph.pl/api/v2/facts/random",
    parse: (res: { text: string }): string => res.text,
    description: "Get a random fact",
  },
  ip: {
    url: "https://ipapi.co/json/",
    parse: (res: { [k: string]: string }): string[] =>
      Object.keys(res).map((k) => `<i>${k}</i> ${res[k]}`),
    description: "Get IP and location info",
  },
  weather: {
    url: "", // This is handled differently in the weather command
    parse: (): string[] => [],
    description: "Get Weather info for location",
  },
};
