# CalorieLens — Frontend (Vite + React)

This is the **frontend** for CalorieLens built with **Vite + React + TypeScript**.

The app expects a backend that exposes an HTTP API (default: `http://127.0.0.1:8000`) with an endpoint `POST /api/recognize` that accepts a multipart image file (field name: `file`) and an optional `title` string, and returns a JSON payload with detected ingredients and totals. You can override the base URL with an environment variable (see below).

---

## Prerequisites
- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9 (or **pnpm**/**yarn** if you prefer)

> Check versions:
> ```bash
> node -v
> npm -v
> ```

---

## Setup

1) Install dependencies
```bash
npm install
# or: pnpm install
# or: yarn install
```

2) Configure environment
Create a `.env` file at the project root (same folder as `package.json`) and set the backend API base URL. If you skip this, it defaults to `http://127.0.0.1:8000`.

```env
# .env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

> The frontend uses this value in `src/api/client.ts`:
> ```ts
> const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
> ```

---

## Run (development)

```bash
npm run dev
```
Vite will print a local dev URL, typically `http://127.0.0.1:5173` or `http://localhost:5173`.

Make sure your backend is running and reachable at the `VITE_API_BASE_URL` you configured.

---

## Build (production)

```bash
npm run build
```

The production assets will be emitted into `dist/`.

---

## Preview a production build locally

```bash
npm run preview
```

---

## Common issues

- **CORS errors** when calling the API:
  Ensure your backend includes CORS settings to allow requests from the Vite dev origin (e.g., `http://localhost:5173`).

- **Cannot reach backend**:
  Verify the backend is running on the correct host/port, and that `VITE_API_BASE_URL` matches it exactly (including protocol and port).

- **Image upload fails**:
  The `POST /api/recognize` endpoint must accept `multipart/form-data` with field `file` and optional `title`. Ensure the backend matches that contract.
