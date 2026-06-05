# TaskFlow

**TaskFlow** is a full-stack educational SPA (Single Page Application) for task management and productivity. Built with vanilla JavaScript, it serves as a practical foundation for learning modern frontend architecture — client-side routing, authentication, role-based authorization, and CRUD operations — without relying on frameworks like React, Vue, or Angular.

The frontend uses the History API for SPA navigation, and a fake REST API built with `json-server` handles data persistence.

## Project Structure

```
TaskFlow/
├── TaskFlowapi/        # Fake REST API (json-server)
│   ├── database.json   # Seed data: users & tasks
│   └── package.json
├── TaskFlowSPA/        # Frontend SPA (Vite + Vanilla JS + Tailwind CSS)
│   ├── src/
│   │   ├── main.js         # Entry point
│   │   ├── router/         # SPA routing + guards
│   │   ├── views/          # Screen views (auth, tasks, users)
│   │   ├── services/       # API communication layer
│   │   ├── components/     # Reusable components
│   │   ├── utils/          # Helper utilities
│   │   └── styles/         # Global styles
│   ├── index.html
│   └── package.json
└── README.md
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | JavaScript (ES Modules), HTML5, CSS3 |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite v8 |
| Backend | json-server (REST API mock) |
| Routing | History API (client-side SPA) |
| Session | localStorage |

## Features

- User login/logout with session persistence via localStorage
- Public and private (auth-guarded) routes
- Role-based access control (`ADMIN` / `USER`)
- SPA navigation with History API (no full page reloads)
- Dynamic view rendering
- Full CRUD for tasks
- Profile editing and account deletion
- Dashboard with basic productivity stats
- Admin panel for user and task management (ADMIN role only)
- 404 fallback page

## Roles

### `ADMIN`
- Full system access
- Manage users (view, edit roles)
- View all tasks in the system

### `USER`
- Create, edit, and delete their own tasks
- View and edit their own profile
- Delete their own account

## Routes

| Path | View | Access |
|---|---|---|
| `/` | Home (landing) | Public |
| `/login` | Login | Public (redirects to dashboard if authenticated) |
| `/register` | Register | Public |
| `/dashboard` | User dashboard | Authenticated |
| `/tasks` | Task list | Authenticated |
| `/task-form` | Create/edit task | Authenticated |
| `/profile` | User profile | Authenticated |
| `/admin` | Admin panel | ADMIN only |
| `/not-found` | 404 | Public |

## Quick Start

### 1. Start the fake API

```bash
cd TaskFlowapi
npm install
npx json-server --watch database.json --port 3000
```

### 2. Start the frontend

```bash
cd TaskFlowSPA
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and connects to the API at `http://localhost:3000`.

### Seed Users

| Email | Password | Role |
|---|---|---|
| `daniellastre02@gmail.com` | `ggggggg` | ADMIN |
| `admin@company.com` | `admin123` | USER |

## Available Scripts (Frontend)

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Architecture

The frontend follows a simple **layered architecture**:

- **`router/`** — SPA routing via History API, route guards (auth + role)
- **`views/`** — Screen templates and their event handlers
- **`services/`** — HTTP calls to the json-server API
- **`components/`** — Reusable UI pieces
- **`utils/`** — Small helper functions
- **`styles/`** — Global CSS (Tailwind entry point)

Each view exports `render()` (returns HTML) and `setup(navigate)` (binds event listeners). The router intercepts anchor clicks, matches routes, checks guards, and dynamically swaps content in the `#app` container.

## License

MIT License — see [LICENSE](./TaskFlowSPA/LICENSE).
