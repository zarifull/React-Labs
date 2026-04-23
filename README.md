# React Labs

A multi-page React learning project built with Vite.  
This repository contains several mini applications (labs) to practice routing, API integration, state management, persistence, testing, and responsive UI.

## Features

- **Home Dashboard** with navigation to all labs
- **Team Dashboard** with fetch, search, sort, memoized filtering, and localStorage
- **Task Manager** with CRUD-like task flows, filters, search, and persistence
- **Weather App** using OpenWeather API
- **Currency Converter** using live exchange-rate API
- **Movie Search (Cinema Lab)** using OMDb API + debounced search + Zustand favorites persistence
- **E-Commerce Lab** (TypeScript + Zustand) with cart state and CSS modules
- **Responsive Layer** via `src/responsive.css` (added as non-destructive style overrides)

## Tech Stack

- React 19
- React Router DOM 7
- Zustand 5
- Vite 7
- TypeScript (mixed JS/TS setup)
- Vitest + Testing Library
- ESLint 9

## Project Structure

```text
src/
  ecomerce/            # E-Commerce components + CSS modules
  hooks/               # Custom hooks
  pages/               # Route pages (labs)
  store/               # Zustand stores
  types/               # TypeScript interfaces/types
  App.jsx              # Route definitions
  main.jsx             # App bootstrap
  styles.css           # Base global styles
  responsive.css       # Responsive override styles
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create environment variables

Create a `.env` file in the project root:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
VITE_MOVIES_API_KEY=your_omdb_api_key
```

### 3) Run development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Testing

The project includes component tests with Vitest + React Testing Library.

To run tests (if a script is added in `package.json`):

```bash
npx vitest
```

## Notes

- This is a learning-focused project, so the codebase intentionally mixes JavaScript and TypeScript labs.
- API-powered pages require valid keys in `.env`.
- Existing lint issues may appear in some files unrelated to UI behavior.


# React Labs 🚀
- Live Demo: [https://react-labs-five.vercel.app/](https://react-labs-five.vercel.app/)
