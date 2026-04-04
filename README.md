# StudyKit

A student productivity web application built with React, Vite, and Tailwind CSS. Designed after the visual language of apple.com — clean typography, generous whitespace, and a monochrome colour palette.

## Features

**Task Tracker**
Manage study tasks with subject, deadline, and priority (High / Medium / Low). Tasks persist across sessions via localStorage. Completed tasks are visually distinguished and sorted to the bottom of the list.

**Pomodoro Timer**
A countdown timer with three configurable modes: Focus, Short Break, and Long Break. Durations are freely adjustable per mode (1–180 minutes) and are saved to localStorage. The timer uses `Date.now()`-based elapsed calculation to prevent drift. On session completion, a browser notification and an `AudioContext` tone are triggered. Both are initialised lazily after user interaction to comply with browser autoplay policies.

**Daily Statistics**
Tracks three metrics for the current day: completed tasks, finished Pomodoro sessions, and total focus minutes. All counters reset automatically at midnight via an ISO date comparison on mount.

**Inspiration Card**
Rotates silently between motivational quotes and wellness reminders every ten minutes using a CSS opacity transition. No sound, no badge, no interruption.

**Toast Notifications**
Contextual feedback messages appear at the bottom of the viewport. Up to three toasts are displayed simultaneously; each dismisses automatically after three seconds.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| State | React Context + `useState` |
| Persistence | `localStorage` (vanilla) |
| Audio | Web Audio API (`AudioContext`) |
| Notifications | Web Notifications API |
| Routing | None — hash-based anchor navigation |
| Dependencies | No runtime libraries beyond React |

## Project Structure

```
src/
  components/
    layout/       Navbar, MobileMenu
    tasks/        TaskTracker, TaskCard, TaskModal, PriorityBadge
    timer/        PomodoroTimer, TimerDisplay, ModeSelector,
                  TaskSelector, CustomDurationEditor, InspirationCard
    stats/        Statistics
    ui/           Card, Button, Input, Toast (+ ToastContainer)
  context/        AppContext, TaskContext, TimerContext,
                  StatsContext, ToastContext
  hooks/          useLocalStorage, usePomodoroTimer, useNotification,
                  useAudioBeep, useDailyReset
  utils/          constants, dateUtils, storageKeys
```

## Getting Started

**Install dependencies**

```bash
npm install
```

**Start development server**

```bash
npm run dev
```

The application is available at `http://localhost:5173` by default.

**Production build**

```bash
npm run build
```

Output is written to `dist/`.

## Deployment

The repository includes a `netlify.toml` configured for Netlify. Connect the repository in the Netlify dashboard; Netlify will run `npm run build` and serve the `dist/` directory automatically. The redirect rule in `netlify.toml` ensures all paths resolve to `index.html`.

## Browser Support

Requires a modern evergreen browser. The Web Notifications API is not available on iOS Safari; the application falls back to the toast system silently in that case. The `backdrop-filter` property used by the navigation bar requires both the standard and `-webkit-` prefixed declarations, which are included.

## localStorage Keys

| Key | Contents |
|---|---|
| `studykit_tasks` | Task list (array of task objects) |
| `studykit_stats` | Daily statistics and current date |
| `studykit_custom_durations` | User-defined timer durations per mode |
