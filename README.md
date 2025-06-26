# 📆 Calendar App

A lightweight and responsive calendar application built using **React**, **TypeScript**, **Zustand**, and **Tailwind CSS**. This project allows users to create, update, and drag events within a month-view layout, mimicking core features of modern calendar tools.

---

## 🚀 DEMO LINK 


## 🚀 Setup & Running Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadShahud/EmoteCareCalendar
cd EmoteCareCalendar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will start at: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

---

## 🧠 Architecture & Design Decisions

### 📦 State Management: Zustand

- Zustand is used as the state management tool for its minimal API, simplicity, and ease of use with React hooks.
- Manages shared state like:
  - `modalOpen`: controls the visibility of the event modal.
  - `events`: a list of calendar events.
  - `currentDate`: the selected date displayed on the calendar.

### 🧱 Component Structure

- `components/Calendar/MonthView.tsx`: Displays the main month grid with days and their respective events.
- `components/Event/DraggableEvent.tsx`: Handles rendering and drag interaction for each event.
- `components/Event/EventModal.tsx`: Modal to create or edit an event.
- `store/calendar.ts`: Global calendar store powered by Zustand.
- `App.tsx`: Main entry point that pulls everything together.

---

## ⚠️ Known Issues & Limitations

- Newly added events may sometimes not respond correctly to drag-and-drop until a refresh.
- Event overlap and conflict resolution are not implemented.
- Storybook integration was attempted but removed due to context conflicts with `react-dnd`.

---

## 🎁 Bonus Features

- ✅ Drag-and-drop of events using `react-dnd`.
- ✅ Dark mode support via Tailwind CSS.
- ✅ Mobile responsiveness.
- ❌ Storybook (partially implemented and later removed).

---

## 🛠 Tech Stack

- **React** (w/ TypeScript)
- **Vite** as build tool
- **Zustand** for global state
- **Tailwind CSS** for styling
- **React DnD** for drag-and-drop functionality
- **Date-fns** for date manipulation

---