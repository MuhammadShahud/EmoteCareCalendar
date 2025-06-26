import { useCalendarStore } from '../store/calendar';
import { act } from 'react'; // ✅

describe('useCalendarStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCalendarStore.setState(useCalendarStore.getInitialState());
  });

  it('initializes with default view and events', () => {
    const { view, events, currentDate } = useCalendarStore.getState();
    expect(view).toBe('month');
    expect(events.length).toBeGreaterThan(0);
    expect(currentDate instanceof Date).toBe(true);
  });

  it('sets calendar view correctly', () => {
    act(() => {
      useCalendarStore.getState().setView('week');
    });
    expect(useCalendarStore.getState().view).toBe('week');
  });

  it('navigates to next/prev month correctly', () => {
    const initial = useCalendarStore.getState().currentDate;
    act(() => {
      useCalendarStore.getState().navigate('next');
    });
    const next = useCalendarStore.getState().currentDate;
    expect(next.getMonth()).toBe((initial.getMonth() + 1) % 12);

    act(() => {
      useCalendarStore.getState().navigate('prev');
    });
    const backToInitial = useCalendarStore.getState().currentDate;
    expect(backToInitial.getMonth()).toBe(initial.getMonth());
  });

  it('navigates to today', () => {
    act(() => {
      useCalendarStore.getState().navigate('next');
    });
    act(() => {
      useCalendarStore.getState().navigate('today');
    });
    const today = new Date();
    const stateDate = useCalendarStore.getState().currentDate;
    expect(stateDate.toDateString()).toBe(today.toDateString());
  });

  it('opens and closes modal correctly', () => {
    act(() => {
      useCalendarStore.getState().openModal({ title: 'Test Event' });
    });
    const { modalOpen, modalEvent } = useCalendarStore.getState();
    expect(modalOpen).toBe(true);
    expect(modalEvent?.title).toBe('Test Event');

    act(() => {
      useCalendarStore.getState().closeModal();
    });
    expect(useCalendarStore.getState().modalOpen).toBe(false);
    expect(useCalendarStore.getState().modalEvent).toBeUndefined();
  });

  it('adds a new event', () => {
    const before = useCalendarStore.getState().events.length;
    act(() => {
      useCalendarStore.getState().addEvent({
        title: 'New Test Event',
        start: new Date(),
        end: new Date(),
        color: 'bg-blue-500',
      });
    });
    const after = useCalendarStore.getState().events.length;
    expect(after).toBe(before + 1);
    expect(
      useCalendarStore.getState().events.some((e) => e.title === 'New Test Event')
    ).toBe(true);
  });

  it('updates an event', () => {
    const event = useCalendarStore.getState().events[0];
    const updatedEvent = { ...event, title: 'Updated Title' };

    act(() => {
      useCalendarStore.getState().updateEvent(updatedEvent);
    });

    const updated = useCalendarStore
      .getState()
      .events.find((e) => e.id === event.id);

    expect(updated?.title).toBe('Updated Title');
  });

  it('deletes an event', () => {
    const event = useCalendarStore.getState().events[0];

    act(() => {
      useCalendarStore.getState().deleteEvent(event.id);
    });

    const deleted = useCalendarStore
      .getState()
      .events.find((e) => e.id === event.id);

    expect(deleted).toBeUndefined();
  });
});