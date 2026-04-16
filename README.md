# Space Image Explorer

A production-quality single-page application built with React + TypeScript that integrates with NASA's Astronomy Picture of the Day (APOD) API. Browse stunning space imagery, read scientific descriptions, navigate through the archive by date, and save your favorites.

---

## Features

- **Daily APOD**: Automatically loads today's Astronomy Picture of the Day on first visit
- **Date Navigation**: Step through the archive day-by-day with previous/next buttons, or jump directly to any date from June 16, 1995 onward
- **Image & Video Support**: Full-resolution images with HD links, plus embedded YouTube/video players for video entries
- **Expandable Descriptions**: Concise card view with a "Read more" toggle for longer explanations
- **Favorites**: Save any APOD entry to a local favorites collection; persisted across browser sessions
- **Persistent Last Date**: Returns to the last viewed date on revisit
- **Loading Skeletons**: Smooth pulsing placeholder layout while data loads
- **Error States**: Clear error messages with one-click retry
- **Responsive Design**: Mobile-first layout that adapts from small phones to wide desktops

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (functional components + hooks) |
| Language | TypeScript (strict mode) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP | Axios |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ApodDescription.tsx   # Expandable description text
│   ├── DateSelector.tsx      # Date navigation control
│   ├── ErrorMessage.tsx      # Error state with retry
│   ├── FavoriteButton.tsx    # Heart toggle button
│   ├── LoadingSkeleton.tsx   # Pulsing placeholder
│   ├── MediaDisplay.tsx      # Image / iframe renderer
│   └── Navbar.tsx            # Fixed navigation bar
├── hooks/               # Custom hooks and context
│   ├── useApod.ts            # APOD fetching + date state
│   └── useFavorites.ts       # Favorites context + hook
├── pages/               # Route-level components
│   ├── FavoritesPage.tsx     # Saved favorites grid
│   └── HomePage.tsx          # Main APOD viewer
├── services/            # API layer
│   └── apodService.ts        # NASA APOD API calls
├── types/               # TypeScript interfaces
│   └── apod.ts               # ApodEntry interface
└── utils/               # Pure utility functions
    ├── dateUtils.ts          # Date formatting + validation
    └── storageUtils.ts       # Type-safe localStorage helpers
```

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Get a NASA API key

The app works out of the box using the `DEMO_KEY` (30 requests/hour, 50/day per IP).
For higher rate limits, register for a free key at **https://api.nasa.gov/** and create a `.env` file:

```env
VITE_NASA_API_KEY=your_api_key_here
```

### 3. Start the development server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## API Details

**Endpoint:** `GET https://api.nasa.gov/planetary/apod`

| Parameter | Type | Description |
|-----------|------|-------------|
| `api_key` | string | Your NASA API key (`DEMO_KEY` for testing) |
| `date` | string | `YYYY-MM-DD` format; defaults to today |
| `thumbs` | boolean | When `true`, returns `thumbnail_url` for video entries |

**Response fields used:**

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Title of the entry |
| `date` | string | Entry date (`YYYY-MM-DD`) |
| `explanation` | string | Scientific description |
| `media_type` | `"image"` \| `"video"` | Determines how content is rendered |
| `url` | string | Standard image URL or YouTube embed URL |
| `hdurl` | string? | High-res image URL (images only) |
| `copyright` | string? | Attribution if not public domain |
| `thumbnail_url` | string? | Video thumbnail (requires `thumbs=true`) |

---

## Local Storage Keys

| Key | Purpose |
|-----|---------|
| `apod:last_date` | Last date the user viewed, restored on revisit |
| `apod:favorites` | JSON array of saved `ApodEntry` objects |
