import { useCalendarStore } from '../../store/calendar'
import MonthView from './views/MonthView'
import WeekView from './views/WeekView'
import DayView from './views/DayView'

const CalendarView = () => {
  const { view } = useCalendarStore()

  switch (view) {
    case 'month':
      return <MonthView />
    case 'week':
      return <WeekView />
    case 'day':
      return <DayView />
    default:
      return null
  }
}

export default CalendarView