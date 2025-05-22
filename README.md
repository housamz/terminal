# Terminal Website

A modern, interactive terminal-style website built with TypeScript. This project demonstrates a clean, modular architecture by breaking down a large JavaScript file into organized TypeScript modules.

## 🏗️ Architecture

The application is structured into the following modules:

### Core Types & Configuration
- **`types.ts`** - TypeScript interfaces and type definitions
- **`constants.ts`** - Application constants and configuration values
- **`data.ts`** - Static content data (about, skills, projects, etc.)
- **`api-config.ts`** - API endpoint configurations

### Services & Utilities
- **`api-service.ts`** - HTTP API calls and data fetching
- **`dom-utils.ts`** - DOM manipulation utilities
- **`spinner.ts`** - Loading spinner functionality
- **`typewriter.ts`** - Text typing animation effects

### Core Logic
- **`command-handler.ts`** - Command processing and execution
- **`cursor-manager.ts`** - Terminal cursor position management
- **`keyboard-handler.ts`** - Keyboard input and navigation
- **`terminal-app.ts`** - Main application orchestration
- **`main.ts`** - Application entry point

## 🚀 Features

- **Interactive Terminal Interface** - Fully functional command-line experience
- **Command Completion** - Tab completion for available commands
- **Command History** - Arrow key navigation through command history
- **API Integration** - Fetch jokes, facts, weather, and IP information
- **Typing Animation** - Smooth typewriter effects for output
- **Responsive Design** - Works on desktop and mobile devices

## 📦 Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server with file watching
npm run dev

# Serve the built files
npm start
```

## 🎮 Available Commands

### Information Commands
- `welcome` - Show welcome screen
- `whoami` - About the developer
- `skills` - Technical skills overview
- `projects` - Project showcase
- `contact` - Contact information

### Utility Commands
- `help` - Show all available commands
- `history` - Display command history
- `date` - Show current date and time
- `clear` - Clear the terminal screen

### API Commands
- `joke` - Get a random dad joke
- `geek` - Get a random programming joke
- `fact` - Get a random interesting fact
- `ip` - Show your IP address and location
- `weather` - Get current weather for your location

## 🛠️ Development

### Project Structure
```
├── types.ts              # Type definitions
├── constants.ts          # App constants
├── data.ts              # Static content
├── api-config.ts        # API configurations
├── dom-utils.ts         # DOM utilities
├── api-service.ts       # API service layer
├── spinner.ts           # Loading spinner
├── typewriter.ts        # Typing effects
├── cursor-manager.ts    # Cursor management
├── keyboard-handler.ts  # Input handling
├── command-handler.ts   # Command processing
├── terminal-app.ts      # Main app class
└── main.ts             # Entry point
```

### Key Benefits of This Architecture

1. **Separation of Concerns** - Each module has a single responsibility
2. **Type Safety** - Full TypeScript support with proper typing
3. **Maintainability** - Easy to modify individual features
4. **Testability** - Modular design allows for easy unit testing
5. **Scalability** - Simple to add new commands or features
6. **Reusability** - Components can be reused across different parts

### Adding New Commands

1. Add command type to `types.ts`
2. Add command logic to `command-handler.ts`
3. Update help text and available commands list

### Adding New APIs

1. Add API configuration to `api-config.ts`
2. Add parsing logic if needed
3. The command handler will automatically pick up new APIs

## 🔧 Build Process

The TypeScript compiler will:
- Type-check all files
- Generate JavaScript output in the `dist/` directory
- Create source maps for debugging
- Generate declaration files for library usage

## 📝 License

MIT License - feel free to use this code for your own projects!