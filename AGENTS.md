# AGENTS.md

## Build & Run Commands
- `npm run dev` — Start development server (port 8080)
- `npm run build` — Build for production
- `npm run dev-nolog` — Dev server without logging
- `npm run build-nolog` — Build without logging
- **No explicit test or lint scripts.** Use Next.js built-in testing if needed (see Next.js docs).

## Code Style Guidelines
- **Language:** TypeScript, strict mode enabled
- **Imports:** React imports first, then third-party, then local; use `@/*` for `src/*` path aliases
- **Components:** PascalCase for components, camelCase for functions/variables
- **Styling:** Tailwind CSS with `cn()` utility for class merging
- **Formatting:** Follow Prettier/Next.js defaults; keep code clean and consistent
- **Types:** Use explicit types and interfaces; avoid `any`
- **Error Handling:** Use try-catch for async, always type errors
- **ESLint:** Uses Next.js core-web-vitals config
- **Other:** No Cursor or Copilot rules present

Keep this file up to date if project conventions change.

Important: 
- Do not run the server. The user will run it separately manually. Do not build the app unless the user asks you to.
- Do not create tests for React components or anything React. Our Jest tests only tests for utils and helper functions.
- Let's not preserve legacy code.
- Do not create custom test scripts when you want to test something. You can use Jest for it.