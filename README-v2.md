# Pub Coastal Game - Educational Coastal Protection Simulation

## Project Overview

**Pub Coastal Game** is an educational multiplayer simulation game designed to teach players about coastal protection strategies and their environmental impacts. The game simulates rising sea levels and storm scenarios in Singapore, allowing players to make decisions about coastal defense measures across different sectors.

## Core Concept

Players take on roles as coastal managers for different Singapore sectors (Changi & East Coast, CBD & Jurong, North Woodlands to Punggol) and must make strategic decisions about coastal protection measures within budget constraints. The game demonstrates the real-world consequences of climate change and infrastructure decisions through interactive scenarios.

## Technology Stack

- **Frontend**: Next.js 15.3.1 with TypeScript
- **Game Engine**: Phaser 3.88.2 for 2D game elements
- **3D Graphics**: Spline for interactive 3D coastal visualization
- **Real-time Database**: Firebase for multiplayer synchronization
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context with Firebase synchronization

## Game Architecture

### Multiplayer System
- **3-Player Simultaneous Gameplay**: Each player controls a different coastal sector
- **Real-time Synchronization**: Firebase ensures all players see consistent game state
- **All game state (actions, round, scores, etc.) is managed in a single React Context, which is synced in real time via Firebase. Any action by any player is instantly reflected for all players and viewers.**
- **Sector-based Roles**: 
  - Player 1: Changi & East Coast (Sectors 1A/1B)
  - Player 2: CBD & Jurong (Sectors 2A/2B) 
  - Player 3: North Woodlands to Punggol (Sectors 3A/3B)

#### Controller vs. Viewer

- The main page (`/`) shows only the Spline 3D viewer (no controls).
- The controller UI (under `/control/`) is where players make decisions; these are then reflected in the Spline scene for all viewers.

### Game Flow
1. **Lobby Phase**: Players select their sectors and wait for others to join
2. **Decision Phase**: 30-second rounds where players choose coastal protection measures
3. **Scenario Resolution**: Game calculates outcomes based on choices and random events
4. **Cutscene Display**: Video scenarios show consequences of decisions
5. **Scoring**: Players scored based on effectiveness and cost-efficiency

#### Technical Flow

Player clicks in React UI → Updates Context/Firebase → SplineCanvasWithAction listens for changes → Triggers Spline object → 3D scene updates for all.

### Coastal Protection Measures

**Sector-Specific Options:**
- **Mangroves**: Natural barriers, low cost but limited effectiveness
- **Land Reclamation**: Moderate cost, good protection with varying heights (0.5m, 1.15m, 2m)
- **Seawalls**: High protection, higher costs, aesthetic trade-offs
- **Storm Surge Barriers** (CBD/Jurong only): Premium protection for critical areas
- **Artificial Reefs** (Woodlands/Punggol only): Eco-friendly solutions
- **Hybrid Measures** (Woodlands/Punggol only): Combined approaches

## Key Features

### Multiplayer Sync & Room Management

- Multiplayer state and real-time sync are powered by Firebase Realtime Database.
- The `GameRoomService` class (in `src/lib/gameRoom.ts`) manages:
  - Room creation and joining
  - Player presence tracking (who is online)
  - Logging all player actions and activities
  - Syncing lobby/game state (round, timer, water level, etc.)
  - Broadcasting changes to all players instantly
- The UI and game logic subscribe to these updates, so all players see the same state and actions in real time.
- All multiplayer state is stored in Firebase and updated via the exported `database` object from `src/lib/firebase.ts`.

### Scenario Logic & Configuration

- All scenario rules, scoring, and cutscene mappings are centralized in `src/lib/constants.ts`.
- This file defines:
  - Game constants (timers, round settings, etc.)
  - Spline trigger configurations for every possible player action
  - Sector and sub-sector mappings to available actions
  - Default lobby/game state values
  - URLs for the main Spline scene and all cutscenes
  - Mappings from player actions and random events to scores, coin costs, and cutscenes
  - Flash report data for scenario outcomes (text, score, effect, sea level)
- When a player takes an action, the app uses this file to:
  1. Find the correct Spline trigger for the 3D scene
  2. Determine the score, coin cost, and cutscene for the action
  3. Show the correct animation/video and feedback
- This makes it easy to update the game’s rules, add new scenarios, or tweak scoring by editing a single file.

### Modular Player Actions UI

- The player’s decision interface is built from modular React components:
  - `SectorControl` composes all available measures for a sector.
  - `CoastalProtectionMeasure` displays each measure as a card with selectable options.
  - `MeasureOption` represents each actionable choice (e.g., build/upgrade).
- When a player selects an option, the UI triggers an update to the global game state (via React Context and Firebase), which in turn updates the Spline 3D visualization and synchronizes with all players.

### Interactive 3D Visualization
- **Spline Integration**: Real-time 3D coastal map that updates based on player decisions
- **Dynamic Scenarios**: Visual representation of flooding and protection measures
- **Cutscene System**: 18 different video scenarios showing decision consequences

### Spline Integration & Virtual Controls

- The Spline 3D scene contains interactive objects (such as hidden buttons) that are not part of the visible UI.
- The React app (controller UI) is completely separate from the Spline scene.
- When a player takes an action in the React UI, the app updates the global game state (using React Context and Firebase).
- The `SplineCanvasWithAction` component listens for these state changes and programmatically triggers the corresponding Spline object (e.g., simulating a click or hover).
- All 3D scene changes are “puppeteered” by the React UI, not by direct user interaction with the Spline canvas.

### Realistic Simulation
- **Sea Level Rise**: Progressive increase across rounds (0.3m → 0.7m → 1.0m)
- **Random Events**: Storm surges and unpredictable weather patterns
- **Economic Constraints**: Budget system with coin-based resource management
- **Environmental Trade-offs**: Each measure has pros, cons, and opportunity costs

### Educational Components
- **Scenario-based Learning**: Real-world Singapore coastal challenges
- **Decision Consequences**: Immediate feedback on choices
- **Multi-stakeholder Perspective**: Understanding competing interests
- **Climate Change Awareness**: Demonstrates long-term environmental impacts

## Project Structure Analysis

### Core Components (Essential)
```
src/
├── components/                    # Reusable UI components
│   ├── hooks/                     # Custom React hooks for game logic
│   └── ui/                        # Basic UI elements (buttons, cards, etc.)
├── games/pub-coastal-game-spline/ # Main game application
│   ├── components/                # Game-specific components
│   ├── App.tsx                    # Main game wrapper
│   ├── GlobalGameContext.tsx      # Game state management
│   └── SplineCanvasWithAction.tsx # 3D visualization handler
├── lib/                          # Core game logic and configuration
│   ├── constants.ts               # Game configuration and scenarios
│   ├── enums.ts                   # Type definitions for game elements
│   ├── types.ts                   # TypeScript interfaces
│   ├── firebase.ts                # Database configuration
│   ├── gameRoom.ts                # Multiplayer room management
│   └── utils.ts                   # Utility functions
└── pages/                        # Next.js page routing
    ├── control/                   # Player control interfaces
    └── index.tsx                  # Main game viewer
```

### Game Assets (Essential)
```
public/games/pub-coastal-spline/
├── flash-reports/                # Educational video scenarios
│   ├── videos/                   # 18 scenario videos (.webm)
│   └── *.png                     # Scenario overlay images
├── fonts/                        # Custom typography
└── images/                       # Game UI assets
```

### Legacy/Template Code (Potentially Redundant)
```
src/App.tsx                      # Original template demo - NOT USED
src/PhaserGame.tsx               # Phaser bridge template - NOT USED
src/game/                        # Template game scenes - NOT USED
│   ├── scenes/
│   │   ├── Boot.ts
│   │   ├── FlappyBirdScene.ts   # Demo Flappy Bird game
│   │   ├── Game.ts
│   │   ├── GameOver.ts
│   │   ├── MainMenu.ts
│   │   └── Preloader.ts
│   ├── EventBus.ts
│   └── main.ts
public/assets/                   # Template game assets - NOT USED
├── bird.svg
├── pipe.svg
├── background.svg
├── ground.svg
├── star.png
└── logo.png
```

### Unused Games (Can Be Removed)
```
public/games/
├── coastal-pub/                  # Separate coastal game - NOT INTEGRATED
└── flappy-bird/                  # Demo game - NOT USED
```

## Configuration Files

### Game Scenarios
- **`Project_ Pub Coastal Project Plan, Tasks, Timeline - Round 1_Scenario.csv`**: Comprehensive scenario data mapping decisions to outcomes
- **`src/lib/constants.ts`**: 960+ lines of game configuration including all scenarios, scoring, and cutscene mappings

### Build Configuration
- **`next.config.mjs`**: Next.js configuration
- **`tsconfig.json`**: TypeScript strict mode settings
- **`package.json`**: Dependencies and build scripts

## Development Commands

```bash
# Development
npm run dev          # Start development server (port 8080)
npm run dev-nolog    # Dev server without analytics

# Production
npm run build        # Build for production
npm run build-nolog  # Build without analytics

# Note: No explicit test/lint scripts configured
```

## Key Game Mechanics

### Scoring System
- **Starting Budget**: 10,000 points (represented as 20 coins)
- **Cost Structure**: Each measure consumes coins (1-5 coins per action)
- **Penalties**: -20 to -60 points for inadequate protection
- **Bonuses**: Point preservation for effective measures

### Round Progression
- **Round 1**: 0.3m sea level rise, basic measures available
- **Round 2**: 0.7m sea level rise, measure upgrades possible  
- **Round 3**: 1.0m sea level rise, advanced strategies required

### Random Events
- **Effect Multipliers**: 0.5x, 1x, or 2x effectiveness randomization
- **Storm Surges**: Additional +0.5m water level challenges
- **Scenario Variations**: Multiple outcomes per decision type

## Educational Value

This game serves as an educational tool by:
1. **Demonstrating Climate Change Impact**: Visual representation of sea level rise
2. **Teaching Resource Management**: Budget constraints and cost-benefit analysis
3. **Showing Environmental Trade-offs**: Each decision has multiple consequences
4. **Promoting Strategic Thinking**: Long-term planning vs immediate needs
5. **Encouraging Collaboration**: Multiplayer format shows interconnected decisions

## Deployment Notes

- **Production Build**: Outputs to `dist/` folder
- **Static Assets**: All game assets copied automatically during build
- **Firebase Integration**: Real-time database requires proper configuration
- **Spline 3D**: External 3D assets loaded from Spline CDN

## Future Enhancements

The current implementation includes foundations for:
- **Additional Rounds**: Framework supports up to 3 rounds
- **Measure Upgrades**: Path for upgrading existing protections
- **Extended Scenarios**: 18 cutscenes with room for expansion
- **Multi-language Support**: Font assets prepared for internationalization

---

## Developer Guide

### How to Read the Code

- The main game logic is in `src/games/pub-coastal-game-spline/` and `src/components/coastal-protection/`.
- The Spline scene is only for visualization; all logic and user interaction is handled in React.
- Suggested order for reading the code:
  1. `App.tsx` (main game shell)
  2. `GlobalGameContext.tsx` (state management and multiplayer sync)
  3. `SplineCanvasWithAction.tsx` (3D visualization and virtual controls)
  4. `coastal-protection` components (player actions UI)
  5. `lib/constants.ts` (scenario logic and configuration)

---

**Summary**: This is a sophisticated educational simulation that combines modern web technologies with engaging gameplay to teach coastal protection concepts. While it contains some legacy template code that could be cleaned up, the core game represents a well-architected multiplayer educational experience with real-world relevance.
