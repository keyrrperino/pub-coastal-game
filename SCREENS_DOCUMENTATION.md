# Screens created in this branch (feat/ui-screens)

Only the new screens and overlays added in this branch are listed below, with links and minimal integration snippets.

## Team name input (ending flow)
- Page: `/team-name-input-demo`
- Component: `src/components/TeamNameInputScreen.tsx`
- Purpose: Reusable 3-letter team name input with scenario theming (success/moderate/failure)

Usage:
```tsx
import TeamNameInputScreen, { EndingScenario } from '@/components/TeamNameInputScreen';

<TeamNameInputScreen
  endingScenario={"success" as EndingScenario}
  finalScore={9500}
  onSubmit={(teamName) => {
    // Persist or broadcast the team name, then proceed
  }}
/>
```

## Player input screens (in-game)
- Player 1 (with input): `/input-screens/player-1`
- Player 2+ (informational): `/input-screens/player-2`
- Demo selector: `/player-screens-demo`
- Component: `src/components/PlayerTeamNameScreen.tsx`

Usage (component):
```tsx
import PlayerTeamNameScreen from '@/components/PlayerTeamNameScreen';

// Player 1 (can type and save)
<PlayerTeamNameScreen
  playerNumber={1}
  onSubmit={(teamName) => {
    // Save teamName and advance flow
  }}
/>

// Player 2+ (informational only)
<PlayerTeamNameScreen playerNumber={2} />
```

Router usage (pages already provided):
```ts
router.push('/input-screens/player-1');
router.push('/input-screens/player-2');
```

## Ending leaderboard overlay (with bottom yellow bar)
- Page: `/ending-leaderboard-demo`
- Component: `src/components/EndingLeaderboardOverlay.tsx`
- Purpose: Leaderboard overlay only (no background), with yellow highlight row at the bottom

Usage:
```tsx
import EndingLeaderboardOverlay from '@/components/EndingLeaderboardOverlay';

const [open, setOpen] = useState(true);

<EndingLeaderboardOverlay
  isOpen={open}
  onClose={() => setOpen(false)}
  // Optional overrides (defaults match Figma):
  // leaderboardData={[{ name: 'KEN', points: 2400 }, ...]}
  // topWinner={{ name: 'PUB', points: 2500 }}
  // bottomHighlight={{ name: 'RfF', points: 500 }}
/>
```

## Player ending screens (text-only variants)
- Page: `/player-ending-screens-demo`
- Components: `src/components/EndingScreen1.tsx`, `EndingScreen2.tsx`, `EndingScreen3.tsx`

Usage:
```tsx
import EndingScreen1 from '@/components/EndingScreen1';
import EndingScreen2 from '@/components/EndingScreen2';
import EndingScreen3 from '@/components/EndingScreen3';

// Choose one by scenario
<EndingScreen1 finalScore={9500} />
<EndingScreen2 finalScore={7500} />
<EndingScreen3 finalScore={3500} />
```

## Tutorial screens
- Pages: `/tutorial/1`, `/tutorial/2`, `/tutorial/3`
- Components: `src/components/TutorialScreen1.tsx`, `TutorialScreen2.tsx`, `TutorialScreen3.tsx`

Usage (callbacks wired by host flow):
```tsx
import TutorialScreen1 from '@/components/TutorialScreen1';
import TutorialScreen2 from '@/components/TutorialScreen2';
import TutorialScreen3 from '@/components/TutorialScreen3';

<TutorialScreen1 onContinue={() => router.push('/tutorial/2')} />
<TutorialScreen2 onContinue={() => router.push('/tutorial/3')} />
<TutorialScreen3 onContinue={() => router.push('/round1')} />
```

## Modals (demo)
- Page: `/modal-demo`
- Component entry: `src/components/CoastalGameModal.tsx`

Usage:
```tsx
import CoastalGameModal from '@/components/CoastalGameModal';

<CoastalGameModal
  isOpen
  onClose={() => setOpen(false)}
  onContinue={() => {/* advance */}}
  // pass optional sector data, budget, etc.
/>
```

Notes:
- All routes above are available in this branch; integrate by either navigating to the page routes or embedding the components directly into your flow.
- Fonts: novecento-sans-narrow (700 weight) is loaded from Typekit CSS in `src/pages/_document.tsx` and applied globally in `src/styles/globals.css`.
- Text shadows follow the ending screens; use Tailwind `drop-shadow-[...]` classes as shown in components. 