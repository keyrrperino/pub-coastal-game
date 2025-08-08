# Round Screens Implementation

This document describes the round screens that have been added to the Coastal Protectors game based on the Figma designs.

## Components Created

### 1. RoundScreen (Base Component)
- **File**: `src/components/RoundScreen.tsx`
- **Purpose**: Reusable base component for all round screens
- **Props**:
  - `roundNumber`: The round number (1, 2, or 3)
  - `yearRange`: The year range for the round (e.g., "2025-2050")
  - `description`: The round description text
  - `onContinue`: Callback function when the "3, 2, 1, go!" button is clicked

### 2. Round-Specific Components
- **Round1Screen**: `src/components/Round1Screen.tsx`
- **Round2Screen**: `src/components/Round2Screen.tsx`
- **Round3Screen**: `src/components/Round3Screen.tsx`

Each component uses the base `RoundScreen` component with specific content from the Figma designs.

## Pages Created

### Round Pages
- **Round 1**: `/round1` - Year 2025-2050
- **Round 2**: `/round2` - Year 2050-2075  
- **Round 3**: `/round3` - Year 2075-2100

## Design Features

### Visual Design
- **Background**: Uses the same background image as the start screen with dark overlay
- **Typography**: Large, bold text with purple drop shadows matching the Figma design
- **Card Design**: Semi-transparent card with gradient border and backdrop blur
- **Button**: Blue "3, 2, 1, go!" button with hover effects

### Content Structure
Each round follows the same structure:
1. **Round Title**: "Round X" in large text
2. **Year Range**: "Year YYYY-YYYY" in medium text
3. **Description Card**: Detailed round description with specific instructions
4. **Continue Button**: "3, 2, 1, go!" button to proceed

## Usage

### Basic Usage
```tsx
import Round1Screen from '@/components/Round1Screen';

function MyComponent() {
  const handleContinue = () => {
    // Navigate to game or next round
    router.push('/game');
  };

  return <Round1Screen onContinue={handleContinue} />;
}
```

### Navigation Flow
1. Start Screen (`/start`) → Round 1 (`/round1`)
2. Round 1 → Round 2 (`/round2`)
3. Round 2 → Round 3 (`/round3`)
4. Round 3 → Game (or results)

### Custom Round Screen
```tsx
import RoundScreen from '@/components/RoundScreen';

function CustomRoundScreen() {
  return (
    <RoundScreen
      roundNumber={1}
      yearRange="2025-2050"
      description="Your custom description here..."
      onContinue={() => console.log('Round started')}
    />
  );
}
```

## Styling

The components use Tailwind CSS classes that match the Figma design:
- **Text shadows**: Purple drop shadows using `drop-shadow-[0_4px_4px_rgba(148,107,199,1)]`
- **Card background**: Semi-transparent cyan with `bg-[rgba(175,240,255,0.3)]`
- **Backdrop blur**: `backdrop-blur-[22px]`
- **Gradient border**: Custom gradient from cyan to white
- **Responsive design**: Works on different screen sizes

## Next Steps

The round screens are currently UI-only. To integrate with the game:

1. **Connect to Game Logic**: Update the `onContinue` handlers to start the actual game rounds
2. **Add Game State**: Track which round the player is on
3. **Add Progress Tracking**: Show round completion status
4. **Add Animations**: Consider adding transitions between rounds
5. **Add Sound Effects**: Audio feedback for button clicks and round transitions

## Files Created/Modified

### New Files
- `src/components/RoundScreen.tsx`
- `src/components/Round1Screen.tsx`
- `src/components/Round2Screen.tsx`
- `src/components/Round3Screen.tsx`
- `src/components/rounds/index.ts`
- `src/pages/round1.tsx`
- `src/pages/round2.tsx`
- `src/pages/round3.tsx`
- `ROUND_SCREENS_README.md`

### Modified Files
- `src/pages/start.tsx` - Updated to navigate to Round 1 