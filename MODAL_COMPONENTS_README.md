# Coastal Game Modal Components

This document describes the modal components created based on the Figma designs for the PUB Coastal Game. The components provide post-round feedback and game interface functionality.

## Components Overview

### 1. PostRoundModal
A modal component that displays post-round feedback based on player performance.

### 2. CoastalGameModal
A comprehensive game interface modal that includes coastal protection measures, timer, budget, and sector information.

### 3. ModalDemo
A demo component showcasing all modal states and interactions.

### 4. ModalUsageExample
A practical example showing how to integrate the modals into an existing game component.

## Installation and Setup

The components use the following assets that should be available in your `/public/assets/` directory:

- `land-reclamation-icon-6b707d.png`
- `seawall-icon-41fadd.png`
- `mangroves-icon-3a15a8.png`
- `tutorial-bg.png`
- `coin-icon.png`

## Component Details

### PostRoundModal

**Props:**
```typescript
interface PostRoundModalProps {
  isOpen: boolean;
  performance: PostRoundPerformance; // 'good' | 'okay' | 'bad'
  onClose?: () => void;
  onContinue?: () => void;
}
```

**Usage:**
```tsx
import PostRoundModal, { PostRoundPerformance } from './PostRoundModal';

function GameComponent() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [performance, setPerformance] = useState<PostRoundPerformance>('good');

  return (
    <PostRoundModal
      isOpen={showFeedback}
      performance={performance}
      onClose={() => setShowFeedback(false)}
      onContinue={() => {
        setShowFeedback(false);
        // Handle next round logic
      }}
    />
  );
}
```

**Performance States:**
- **Good**: Green theme with positive feedback
- **Okay**: Yellow theme with neutral feedback  
- **Bad**: Red theme with negative feedback

### CoastalGameModal

**Props:**
```typescript
interface CoastalGameModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onContinue?: () => void;
  performance?: PostRoundPerformance;
  showPostRoundFeedback?: boolean;
  timeRemaining?: number;
  budget?: number;
  sector1A?: {
    landReclamation: { height: string; coins: number };
    seawall: { height: string; coins: number };
    mangroves: { planted: boolean; coins: number };
  };
  sector1B?: {
    landReclamation: { height: string; coins: number };
    seawall: { height: string; coins: number };
    mangroves: { planted: boolean; coins: number };
  };
}
```

**Usage:**
```tsx
import CoastalGameModal from './CoastalGameModal';

function GameComponent() {
  const [showGameModal, setShowGameModal] = useState(false);

  return (
    <CoastalGameModal
      isOpen={showGameModal}
      onClose={() => setShowGameModal(false)}
      onContinue={() => setShowGameModal(false)}
      performance="good"
      showPostRoundFeedback={false}
      timeRemaining={30}
      budget={30}
      sector1A={{
        landReclamation: { height: '2m', coins: 3 },
        seawall: { height: '1.15m', coins: 2 },
        mangroves: { planted: false, coins: 1 }
      }}
      sector1B={{
        landReclamation: { height: '0.5m', coins: 1 },
        seawall: { height: '2m', coins: 3 },
        mangroves: { planted: true, coins: 1 }
      }}
    />
  );
}
```

## Features

### Post-Round Feedback
- Three performance states with different visual themes
- Customizable messages and styling
- Backdrop click to close
- Continue button for game flow

### Game Interface
- Full coastal protection game interface
- Timer with visual progress bar
- Budget display
- Two sectors (Industrial and Residential)
- Three protection measures per sector:
  - Land Reclamation (with height options: 0.5m, 1.15m, 2m)
  - Seawall (with height options: 0.5m, 1.15m, 2m)
  - Mangroves (plant option)
- Demolish functionality (disabled state)
- Coin cost indicators
- Selected state highlighting

### Visual Design
- Matches Figma design specifications
- Responsive layout
- Backdrop blur effects
- Gradient borders and backgrounds
- Professional coastal theme

## Integration Examples

### Basic Integration
```tsx
import React, { useState } from 'react';
import PostRoundModal, { PostRoundPerformance } from './PostRoundModal';

function MyGame() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [performance, setPerformance] = useState<PostRoundPerformance>('good');

  const endRound = (roundPerformance: PostRoundPerformance) => {
    setPerformance(roundPerformance);
    setShowFeedback(true);
  };

  return (
    <div>
      <button onClick={() => endRound('good')}>End Round (Good)</button>
      <button onClick={() => endRound('okay')}>End Round (Okay)</button>
      <button onClick={() => endRound('bad')}>End Round (Bad)</button>

      <PostRoundModal
        isOpen={showFeedback}
        performance={performance}
        onClose={() => setShowFeedback(false)}
        onContinue={() => {
          setShowFeedback(false);
          // Start next round
        }}
      />
    </div>
  );
}
```

### Advanced Integration with Game State
```tsx
import React, { useState } from 'react';
import CoastalGameModal from './CoastalGameModal';

function AdvancedGame() {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    timeRemaining: 30,
    budget: 30,
    sector1A: {
      landReclamation: { height: '2m', coins: 3 },
      seawall: { height: '1.15m', coins: 2 },
      mangroves: { planted: false, coins: 1 }
    },
    sector1B: {
      landReclamation: { height: '0.5m', coins: 1 },
      seawall: { height: '2m', coins: 3 },
      mangroves: { planted: true, coins: 1 }
    }
  });

  return (
    <CoastalGameModal
      isOpen={gameState.isPlaying}
      onClose={() => setGameState(prev => ({ ...prev, isPlaying: false }))}
      onContinue={() => {
        setGameState(prev => ({ ...prev, isPlaying: false }));
        // Handle game continuation
      }}
      timeRemaining={gameState.timeRemaining}
      budget={gameState.budget}
      sector1A={gameState.sector1A}
      sector1B={gameState.sector1B}
    />
  );
}
```

## Styling and Customization

The components use Tailwind CSS classes and can be customized by:

1. **Modifying the component styles directly**
2. **Using CSS custom properties for colors**
3. **Extending the component props for additional customization**

### Custom Colors
```tsx
// You can customize colors by modifying the component or using CSS variables
const customColors = {
  good: {
    bgColor: 'rgba(123, 255, 215, 0.5)',
    borderGradient: 'linear-gradient(135deg, #91E2FF 0%, #FFFFFF 100%)'
  },
  // ... other performance states
};
```

## Browser Compatibility

The components are built with:
- React 18+
- TypeScript
- Tailwind CSS
- Next.js Image component

They should work in all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- Backdrop Filter (with fallbacks)

## Performance Considerations

- Images are optimized using Next.js Image component
- Components use React.memo for performance optimization
- Modal state is managed efficiently with useState
- Backdrop blur effects are hardware-accelerated

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure all required assets are in the `/public/assets/` directory
2. **Styling issues**: Check that Tailwind CSS is properly configured
3. **TypeScript errors**: Ensure all required types are imported

### Debug Mode

You can use the `ModalDemo` component to test all modal states and interactions:

```tsx
import ModalDemo from './ModalDemo';

// In your app
<ModalDemo />
```

## Contributing

When modifying these components:

1. Maintain the visual design consistency with Figma
2. Update TypeScript interfaces when adding new props
3. Test all performance states
4. Ensure responsive behavior
5. Update this documentation

## License

These components are part of the PUB Coastal Game project and follow the same licensing terms. 