# Coastal Protectors - Screens Documentation

This document provides a comprehensive overview of all screens in the Coastal Protectors game, their purposes, and how to access them.

## Table of Contents
- [Screen Categories](#screen-categories)
- [Main Game Screens](#main-game-screens)
- [Tutorial Screens](#tutorial-screens)
- [Player Screens](#player-screens)
- [Control Screens](#control-screens)
- [Navigation Flow](#navigation-flow)
- [File Structure](#file-structure)
- [Styling Guidelines](#styling-guidelines)

## Screen Categories

The game consists of four main categories of screens:

1. **Main Game Screens** - Core gameplay screens (start, rounds)
2. **Tutorial Screens** - Introduction and learning screens
3. **Player Screens** - Player-specific round screens
4. **Control Screens** - Administrative and control interfaces

## Main Game Screens

### Start Screen
- **URL**: `/start` or `/` (homepage)
- **Component**: `src/components/StartScreen.tsx`
- **Page**: `src/pages/start.tsx`
- **Purpose**: Main entry point with game title, player indicator, and action buttons
- **Features**:
  - Coastal background image
  - "START GAME" button (navigates to Round 1)
  - "SHOW LEADERBOARD" button
  - Player indicator showing "PLAYER 1"

### Round Screens

#### Round 1 Screen
- **URL**: `/round1`
- **Component**: `src/components/Round1Screen.tsx`
- **Page**: `src/pages/round1.tsx`
- **Year Range**: 2025-2050
- **Purpose**: First round introduction with specific instructions
- **Features**:
  - Round title and year range
  - Detailed mission description
  - "3, 2, 1, GO!" button
  - Breakdown overlay

#### Round 2 Screen
- **URL**: `/round2`
- **Component**: `src/components/Round2Screen.tsx`
- **Page**: `src/pages/round2.tsx`
- **Year Range**: 2050-2075
- **Purpose**: Second round introduction
- **Features**: Same structure as Round 1 with different content

#### Round 3 Screen
- **URL**: `/round3`
- **Component**: `src/components/Round3Screen.tsx`
- **Page**: `src/pages/round3.tsx`
- **Year Range**: 2075-2100
- **Purpose**: Final round introduction
- **Features**: Same structure as Round 1 with different content

### Base Round Component
- **Component**: `src/components/RoundScreen.tsx`
- **Purpose**: Reusable base component for all round screens
- **Props**:
  - `roundNumber`: The round number (1, 2, or 3)
  - `yearRange`: The year range for the round
  - `description`: The round description text
  - `onContinue`: Callback function when the button is clicked

## Tutorial Screens

### Tutorial 1 - Welcome Screen
- **URL**: `/tutorial/1`
- **Component**: `src/components/TutorialScreen1.tsx`
- **Page**: `src/pages/tutorial/1.tsx`
- **Purpose**: Welcome message and mission overview
- **Features**:
  - Welcome to Coastal Protection Taskforce
  - Mission description about sea level rise
  - Disclaimer about simulation
  - "CONTINUE" button

### Tutorial 2 - Sectors Overview
- **URL**: `/tutorial/2`
- **Component**: `src/components/TutorialScreen2.tsx`
- **Page**: `src/pages/tutorial/2.tsx`
- **Purpose**: Singapore sectors and player assignments
- **Features**:
  - Three colored sectors (Green, Red, Yellow)
  - Player assignments for each sector
  - Subsector examples (Industrial, Commercial, Residential)
  - "CONTINUE" button

### Tutorial 3 - Protection Measures
- **URL**: `/tutorial/3`
- **Component**: `src/components/TutorialScreen3.tsx`
- **Page**: `src/pages/tutorial/3.tsx`
- **Purpose**: Coastal protection measures overview
- **Features**:
  - Three protection measures: Land Reclamation, Seawall, Mangroves
  - Cost indicators (gold coins)
  - Sea level protection levels (2m, 1.15m, 0.5m)
  - "3... 2... 1... go!" countdown
  - "START GAME" button

## Player Screens

### Player Round Screens
These screens are specifically designed for player view with simplified information.

#### Player Round 1
- **URL**: `/player/round1`
- **Component**: `src/components/player-screens/PlayerRound1Screen.tsx`
- **Page**: `src/pages/player/round1.tsx`
- **Purpose**: Player-specific Round 1 screen
- **Features**:
  - Simplified round information
  - Game info card with time and coins
  - "3, 2, 1, GO!" countdown

#### Player Round 2
- **URL**: `/player/round2`
- **Component**: `src/components/player-screens/PlayerRound2Screen.tsx`
- **Page**: `src/pages/player/round2.tsx`
- **Purpose**: Player-specific Round 2 screen

#### Player Round 3
- **URL**: `/player/round3`
- **Component**: `src/components/player-screens/PlayerRound3Screen.tsx`
- **Page**: `src/pages/player/round3.tsx`
- **Purpose**: Player-specific Round 3 screen

## Control Screens

### Control Index
- **URL**: `/control`
- **Component**: `src/pages/control/index.tsx`
- **Purpose**: Main control interface for managing the game
- **Features**:
  - Game management controls
  - Sector overview
  - Player management

### Sector Control
- **URL**: `/control/[sector]` (dynamic route)
- **Component**: `src/pages/control/[sector].tsx`
- **Purpose**: Control interface for specific sectors
- **Features**:
  - Sector-specific controls
  - Player assignment management
  - Game state monitoring

### Old Control Screens
- **URLs**: `/old-control`, `/old-control/[sector]`
- **Components**: `src/pages/old-control/index.tsx`, `src/pages/old-control/[sector].tsx`
- **Purpose**: Legacy control interfaces (kept for reference)

## Navigation Flow

### Main Game Flow
```
Start Screen (/start)
    ↓
Round 1 (/round1)
    ↓
Round 2 (/round2)
    ↓
Round 3 (/round3)
    ↓
Game End
```

### Tutorial Flow
```
Tutorial 1 (/tutorial/1)
    ↓
Tutorial 2 (/tutorial/2)
    ↓
Tutorial 3 (/tutorial/3)
    ↓
Round 1 (/round1)
```

### Player Flow
```
Player Round 1 (/player/round1)
    ↓
Player Round 2 (/player/round2)
    ↓
Player Round 3 (/player/round3)
```

### Control Flow
```
Control Index (/control)
    ↓
Sector Control (/control/[sector])
```

## File Structure

```
src/
├── components/
│   ├── StartScreen.tsx
│   ├── RoundScreen.tsx
│   ├── Round1Screen.tsx
│   ├── Round2Screen.tsx
│   ├── Round3Screen.tsx
│   ├── TutorialScreen1.tsx
│   ├── TutorialScreen2.tsx
│   ├── TutorialScreen3.tsx
│   ├── player-screens/
│   │   ├── index.ts
│   │   ├── PlayerRound1Screen.tsx
│   │   ├── PlayerRound2Screen.tsx
│   │   └── PlayerRound3Screen.tsx
│   └── tutorial-screens/
│       └── index.ts
├── pages/
│   ├── start.tsx
│   ├── round1.tsx
│   ├── round2.tsx
│   ├── round3.tsx
│   ├── tutorial/
│   │   ├── 1.tsx
│   │   ├── 2.tsx
│   │   └── 3.tsx
│   ├── player/
│   │   ├── round1.tsx
│   │   ├── round2.tsx
│   │   └── round3.tsx
│   └── control/
│       ├── index.tsx
│       └── [sector].tsx
└── public/
    └── assets/
        ├── tutorial-bg.png
        ├── land-reclamation-icon-6b707d.png
        ├── seawall-icon-41fadd.png
        └── mangroves-icon-3a15a8.png
```

## Styling Guidelines

### Color Scheme
- **Primary Blue**: `#005DFF`
- **Cyan Accent**: `#91E2FF`
- **Purple Shadow**: `rgba(148,107,199,1)`
- **Background Overlay**: `rgba(0,0,0,0.5)`
- **Card Background**: `rgba(175,240,255,0.3)`

### Typography
- **Font Family**: Novecento Bold
- **Large Titles**: 7xl-9xl
- **Medium Text**: 3xl-4xl
- **Small Text**: text-sm-xs

### Effects
- **Drop Shadows**: `drop-shadow-[0_4px_4px_rgba(148,107,199,1)]`
- **Backdrop Blur**: `backdrop-blur-[64px]`
- **Gradient Borders**: `border-gradient-to-br from-[#91E2FF] to-white`

### Responsive Design
- All screens are responsive and work on different screen sizes
- Mobile-first approach with proper scaling
- Touch-friendly button sizes

## Quick Access Reference

### Main URLs
- **Start**: `/start`
- **Tutorial 1**: `/tutorial/1`
- **Tutorial 2**: `/tutorial/2`
- **Tutorial 3**: `/tutorial/3`
- **Round 1**: `/round1`
- **Round 2**: `/round2`
- **Round 3**: `/round3`

### Player URLs
- **Player Round 1**: `/player/round1`
- **Player Round 2**: `/player/round2`
- **Player Round 3**: `/player/round3`

### Control URLs
- **Control Index**: `/control`
- **Sector Control**: `/control/[sector]` (replace [sector] with actual sector)

## Development Notes

- All screens use Next.js Image component for optimized loading
- Components are TypeScript-based with proper interfaces
- Navigation uses Next.js router for client-side routing
- All assets are stored in `/public/assets/` directory
- Styling uses Tailwind CSS with custom color values
- Components follow a consistent structure and naming convention

## Future Enhancements

- Add loading states for better UX
- Implement animations between screen transitions
- Add sound effects for button interactions
- Create mobile-specific layouts
- Add accessibility features (ARIA labels, keyboard navigation) 