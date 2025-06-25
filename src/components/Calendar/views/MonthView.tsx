import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import { useCalendarStore } from "../../../store/calendar";

const MonthView = () => {
  const { currentDate, events, openModal } = useCalendarStore();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-300 dark:bg-gray-700 text-[11px] sm:text-sm overflow-x-auto">
      {days.map((day) => {
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.start), day)
        );
        return (
          <div
            key={day.toISOString()}
            className={`min-h-[100px] sm:h-32 p-1 sm:p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 relative group cursor-pointer
            ${isToday(day) ? "ring-2 ring-blue-500 z-10" : ""}
            ${
              !isSameMonth(day, currentDate)
                ? "text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800"
                : ""
            }`}
            onClick={() => openModal({ start: day, end: day })}

          >
            <div className="text-[11px] font-medium mb-1">
              {format(day, "d")}
            </div>
            {dayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => openModal(event)}
                className="text-xs truncate px-1 py-0.5 rounded bg-blue-500 text-white group-hover:bg-blue-600"
              >
                {event.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
