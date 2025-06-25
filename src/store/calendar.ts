import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type CalendarView = 'month' | 'week' | 'day'

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
}

interface CalendarState {
  currentDate: Date
  view: CalendarView
  events: CalendarEvent[]
  setView: (view: CalendarView) => void
  navigate: (direction: 'prev' | 'next' | 'today') => void
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  modalOpen: boolean
  modalEvent?: Partial<CalendarEvent>
  openModal: (event?: Partial<CalendarEvent>) => void
  closeModal: () => void
  updateEvent: (event: CalendarEvent) => void
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  view: 'month',
  events: [],
  setView: (view) => set({ view }),
  navigate: (direction) => {
    const { currentDate, view } = get()
    const nextDate = new Date(currentDate)
    if (direction === 'today') {
      set({ currentDate: new Date() })
      return
    }
    switch (view) {
      case 'month':
        nextDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
        break
      case 'week':
        nextDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
        break
      case 'day':
        nextDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
        break
    }
    set({ currentDate: nextDate })
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
    }))
  },
  modalOpen: false,
  modalEvent: undefined,
  openModal: (event) => set({ modalOpen: true, modalEvent: event }),
  closeModal: () => set({ modalOpen: false, modalEvent: undefined }),
  updateEvent: (updated: CalendarEvent) =>
    set((state) => ({
      events: state.events.map((ev) => (ev.id === updated.id ? updated : ev)),
    }))
}))