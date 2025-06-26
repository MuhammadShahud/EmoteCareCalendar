import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const today = new Date();

const colorPalette = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getRandomColor(): string {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

function daysFromToday(n: number): Date {
  const date = new Date(today);
  date.setDate(today.getDate() + n);
  return date;
}

function setTime(date: Date, hours: number, minutes: number): Date {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

const mockEvents: CalendarEvent[] = [
  {
    id: uuidv4(),
    title: "Team Sync",
    start: setTime(today, 10, 0),
    end: setTime(today, 11, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Doctor Appointment",
    start: setTime(today, 14, 30),
    end: setTime(today, 15, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Project Planning",
    start: setTime(today, 16, 0),
    end: setTime(today, 17, 30),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Call with Client",
    start: setTime(daysFromToday(-2), 12, 0),
    end: setTime(daysFromToday(-2), 13, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Gym",
    start: setTime(daysFromToday(1), 18, 0),
    end: setTime(daysFromToday(1), 19, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Weekly Review",
    start: setTime(daysFromToday(2), 9, 0),
    end: setTime(daysFromToday(2), 10, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Study React",
    start: setTime(daysFromToday(3), 20, 0),
    end: setTime(daysFromToday(3), 21, 30),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Write Blog",
    start: setTime(daysFromToday(-4), 15, 0),
    end: setTime(daysFromToday(-4), 16, 30),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Design Review",
    start: setTime(daysFromToday(5), 11, 0),
    end: setTime(daysFromToday(5), 12, 30),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "1-on-1 Meeting",
    start: setTime(daysFromToday(7), 13, 0),
    end: setTime(daysFromToday(7), 13, 30),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Interview Prep",
    start: setTime(daysFromToday(-1), 17, 0),
    end: setTime(daysFromToday(-1), 18, 0),
    color: getRandomColor(),
  },
  {
    id: uuidv4(),
    title: "Coffee with Sarah",
    start: setTime(daysFromToday(4), 10, 0),
    end: setTime(daysFromToday(4), 11, 0),
    color: getRandomColor(),
  },
];
export type CalendarView = "month" | "week" | "day";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
};

interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  setView: (view: CalendarView) => void;
  navigate: (direction: "prev" | "next" | "today") => void;
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  modalOpen: boolean;
  modalEvent?: Partial<CalendarEvent>;
  openModal: (event?: Partial<CalendarEvent>) => void;
  closeModal: () => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  view: "month",
  events: mockEvents,
  setView: (view) => set({ view }),
  navigate: (direction) => {
    const { currentDate, view } = get();
    const nextDate = new Date(currentDate);
    if (direction === "today") {
      set({ currentDate: new Date() });
      return;
    }
    switch (view) {
      case "month":
        nextDate.setMonth(
          currentDate.getMonth() + (direction === "next" ? 1 : -1)
        );
        break;
      case "week":
        nextDate.setDate(
          currentDate.getDate() + (direction === "next" ? 7 : -7)
        );
        break;
      case "day":
        nextDate.setDate(
          currentDate.getDate() + (direction === "next" ? 1 : -1)
        );
        break;
    }
    set({ currentDate: nextDate });
  },
  addEvent: (event) => {
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: uuidv4(),
        },
      ],
    }));
  },
  modalOpen: false,
  modalEvent: undefined,
  openModal: (event) => {
    console.log("event", event);

    set({ modalOpen: true, modalEvent: event });
  },
  closeModal: () => set({ modalOpen: false, modalEvent: undefined }),
  updateEvent: (updated: CalendarEvent) =>
    set((state) => ({
      events: state.events.map((ev) => (ev.id === updated.id ? updated : ev)),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((ev) => ev.id !== id),
    })),
}));
