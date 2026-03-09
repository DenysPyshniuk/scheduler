# Interview Scheduler

A single-page React app for booking, editing, and cancelling interview appointments. Data is stored in the browser (localStorage), so no backend is required to run it.

**[See it deployed on Netlify →](https://scheduler-project.netlify.app/)**

## Features

- View a week of days and available appointment slots
- Book an appointment (student name + interviewer)
- Edit or delete an existing appointment
- Spots remaining update when you book or cancel

## Screenshots

- **Home page**
  ![Home page](https://github.com/DenysPyshniuk/scheduler/blob/master/public/images/Screenshot-1.png?raw=true)
- **No spots available**
  ![No spots available](https://github.com/DenysPyshniuk/scheduler/blob/master/public/images/Screenshot-2.png?raw=true)
- **Edit interview**
  ![Edit interview](https://github.com/DenysPyshniuk/scheduler/blob/master/public/images/Screenshot-3.png?raw=true)

## Tech stack

- **React 18** (Create React App, Webpack 5)
- **Node.js 22**
- **pnpm** (package manager)
- **Jest** + **React Testing Library** (unit/integration tests)

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** (e.g. `corepack enable` then `corepack prepare pnpm@latest --activate`, or `npm install -g pnpm`)

## Setup

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:3000)
pnpm start
```

## Scripts

| Command | Description |
|--------|-------------|
| `pnpm start` | Start development server |
| `pnpm build` | Production build (output in `build/`) |
| `pnpm test` | Run Jest tests |

## Testing

- Unit and integration tests live under `src/**/__tests__/` and `src/**/*.test.js`.
- Run with `pnpm test` (or `CI=true pnpm test` for a single run in CI).

## Deployment

- The app is built with `pnpm run build` and served as static files.
- **Netlify**: set build command to `pnpm run build`, publish directory to `build/`, and use Node 22 (e.g. via `NODE_VERSION=22` or `.nvmrc`).
- Production branch is typically `master` (configure in Netlify: Site settings → Build & deploy → Production branch).

## Project structure

```
src/
  components/     # React components (Application, Appointment, DayList, etc.)
  hooks/           # useApplicationData (state + localStorage)
  helpers/         # selectors
  lib/             # storage.js (localStorage seed + load/save)
  index.js         # app entry
  index.css        # global and component styles
```

## License

Private / unlicensed.
