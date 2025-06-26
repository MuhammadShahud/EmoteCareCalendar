import React from "react";
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
import { useDrop } from "react-dnd";
import DraggableEvent from "../../Event/DraggableEvent";

const MonthView = () => {
  const { currentDate, events, updateEvent, openModal } = useCalendarStore();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = React.useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-300 dark:bg-gray-700 text-[11px] sm:text-sm overflow-x-auto">
      {days.map((day) => {
        const [{ isOver }, drop] = useDrop(() => ({
          accept: "EVENT",
          drop: (item: { id: string }) => {
            const event = events.find((e) => e.id === item.id);
            if (event) {
              const newStart = new Date(day);
              newStart.setHours(
                new Date(event.start).getHours(),
                new Date(event.start).getMinutes()
              );
              const duration =
                new Date(event.end).getTime() - new Date(event.start).getTime();
              const newEnd = new Date(newStart.getTime() + duration);
              updateEvent({ ...event, start: newStart, end: newEnd });
            }
          },
          collect: (monitor) => ({
            isOver: monitor.isOver(),
          }),
        }));

        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.start), day)
        );

        return (
          <div
            key={day.toISOString()}
            ref={drop as unknown as React.Ref<HTMLDivElement>}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
            className={`h-32 p-2 relative rounded-sm transition-all border ${
              isToday(day)
                ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            } ${
              !isSameMonth(day, currentDate) ? "text-gray-400" : ""
            } hover:bg-blue-50 dark:hover:bg-gray-800`}
          >
            <div className="text-xs font-semibold mb-1">{format(day, "d")}</div>
            {dayEvents.map((event) => (
              <div key={event.id}>
                <DraggableEvent month={true} event={event} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
