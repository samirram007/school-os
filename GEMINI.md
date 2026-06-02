# Frontend Development Instructions (Vite SPA)

This directory contains the SchoolOS frontend application built as a React Single Page Application (SPA).

## Tech Stack

- **Framework:** React 19
- **Routing:** TanStack Router (File-based routing in `src/routes/`)
- **Data Fetching:** TanStack Query
- **Styling:** Tailwind CSS 4, Shadcn UI
- **Form Management:** TanStack Form or React Hook Form (both present in package.json)
- **i18n:** Paraglide JS

## Coding Standards

- Use TypeScript for all files.
- Prefer functional components and hooks.
- Follow Shadcn UI patterns for component development.
- Use `npm run lint` and `npm run format` for code consistency.

## Routing

- Routes are file-based and located in `src/routes/`.
- Use `createFileRoute` for defining routes.
- Use TanStack Router's `Link` component for navigation.
- Layouts are handled via `__root.tsx` or layout groups.

## Data Fetching & State

- Use TanStack Query for server state management.
- All external data fetching is performed via the Axios client in `src/utils/axios-client.ts`.
- Define loaders in route files for pre-fetching data when appropriate.

## Styling & UI

- Tailwind CSS 4 is the primary styling tool.
- Use Shadcn UI components. Add new ones with `pnpm dlx shadcn@latest add <component>`.
- Icons are primarily from `lucide-react` or `@tabler/icons-react`.

## Testing

- We use Vitest for testing.
- Run tests with `npm run test`.

## Internationalization (i18n)

- Messages are in `messages/` (managed by Inlang).
- Localized routing is handled by Paraglide.
