import { useCalendarStore } from '../../store/calendar'
import { format } from 'date-fns'
import ThemeToggle from '../UI/ThemeToggle'

const CalendarHeader = () => {
  const { currentDate, view, setView, navigate } = useCalendarStore()

  return (
<header className="flex flex-wrap gap-2 items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 text-sm sm:text-base">    <div className="flex items-center gap-2">
      <h1 className="text-xl font-semibold text-blue-600 mr-6">Emote Calendar</h1>
      <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => navigate('prev')}>◀</button>
      <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={() => navigate('next')}>▶</button>
      <h2 className="ml-4 text-lg font-bold">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
    </div>
    <div className="flex items-center gap-2">
    <select
  value={view}
  onChange={(e) => setView(e.target.value as any)}
  className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 dark:text-white w-28 sm:w-auto"
>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
      <ThemeToggle />
    </div>
  </header>
  )
}

export default CalendarHeader