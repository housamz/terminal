import type { DataEntry } from "../types";

export const data: Record<string, DataEntry> = {
  welcome: {
    description: "Welcome and splash screen",
    lines: [
      "<em>Housamz (<em>housamz</em>.com). All rights are not reserved.</em>",
      " ",
      "0000000000000000000111111111110001111111100",
      "0000000000000000011111111111111111111111110",
      "0000000000000000111111110000011111111100111",
      "0000000111111001111111100000111111111001110",
      "0001111111111111111111000001111111111111100",
      "0111110000001111111110000011111111100000000",
      "0111000000001111111111100011111111000000000",
      "1110000000011111111001111111111111000000000",
      "1100000000111111110000011111111110000111110",
      "1100000001111111100000011111111100000011111",
      "1110000111111111000000111111111000000011111",
      "0111111111111110000011111111111111000111110",
      "0011111111111000001111111111000111111111100",
      " ",
      "<em>Type '<i>help</i>' to see available commands.</em>",
      " ",
    ],
    type: "welcome",
  },
  whoami: {
    description: "Who is Housamz?",
    lines: [
      "👨‍💻 By day, I'm a Software Engineer. By night, a pos-grad lecturer. And in between? I'm probably fixing a toaster or building a robot for fun. Basically: full-time nerd, part-time superhero 🦸‍♂️🔧",
      "🕹️ My tech story began in '98 as a starry-eyed Web Designer (weren't we all?), and by 2008 I was knee-deep in Web Dev—LEGO bricks turned to skyscrapers 🧱➡️🏙️",
      "💼 Since then, I've dabbled in everything from biz dev to marketing, even had a go at entrepreneurship (RIP my lemonade empire 🍋💸).",
      "🎨 My real love? Making things look so good they give Mona Lisa an identity crisis. Pixel-perfect is my love language 💖🖼️",
      "🇮🇪 Oh, and I'm also a Peace Commissioner in Ireland—because why not fight bugs and crime? ⚖️🐛",
    ],
    type: "paragraph",
  },
  skills: {
    description: "What can I do?",
    lines: [
      "<i>My Technical Skills</i>",
      "<i>Frontend</i> HTML, CSS, JavaScript",
      "<i>Backend</i> Node.js, Python",
      "<i>DevOps</i> Docker, Git",
      "<i>Linux Administration</i>",
      "<i>Shell Scripting</i>",
    ],
    type: "list",
  },
  projects: {
    description: "My projects",
    lines: [
      "<i>My Projects</i>",
      "<i>Terminal Website</i> This interactive terminal-like website",
    ],
    type: "list",
  },
  contact: {
    description: "How to reach me",
    lines: [
      "<i>Contact Information</i>",
      "<i>Universal name</i> <em>housamz</em>",
      "<i>GitHub</i> <span>github.com/<em>housamz</em></span>",
      "<i>Codepen</i> <span>codepen.io/<em>housamz</em></span>",
      "<i>LinkedIn</i> <span>linkedin.com/in/<em>housamz</em></span>",
      "<i>Twitter</i> <span>twitter.com/<em>housamz</em></span>",
      "<i>Website</i> <span><em>housamz</em>.com</span>",
    ],
    type: "list",
  },
};
