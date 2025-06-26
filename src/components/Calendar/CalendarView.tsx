import { useCalendarStore } from '../../store/calendar';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import EventModal from '../Event/EventModal';

const CalendarView = () => {
  const { view } = useCalendarStore();

  return (
    <>
      {view === 'month' && <MonthView />}
      {view === 'week' && <WeekView />}
      {view === 'day' && <DayView />}
      <EventModal />
    </>
  );
};

export default CalendarView;