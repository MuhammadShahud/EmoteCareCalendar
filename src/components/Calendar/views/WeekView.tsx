import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
  eachHourOfInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { useCalendarStore } from "../../../store/calendar";
import { useDrop } from "react-dnd";
import DraggableEvent from "../../Event/DraggableEvent";

const WeekView = () => {
  const { currentDate, events, updateEvent, openModal } = useCalendarStore();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = eachHourOfInterval({
    start: startOfDay(currentDate),
    end: endOfDay(currentDate),
  });

  return (
    <div className="overflow-x-auto border-t border-gray-300 dark:border-gray-600">
      <div className="min-w-[900px] grid grid-cols-8 bg-gray-50 dark:bg-gray-800">
        <div className="col-span-1 text-xs text-center py-2 bg-gray-100 dark:bg-gray-700 font-semibold border-r border-b border-gray-300 dark:border-gray-600">
          Time
        </div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="text-xs text-center py-2 font-medium border-r border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 sticky top-0 z-10"
          >
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>
      {hours.map((hour) => (
        <div
          key={hour.toISOString()}
          className="min-w-[900px] grid grid-cols-8"
        >
          <div className="col-span-1 text-xs text-gray-500 px-2 py-1 border-r border-b border-gray-200 dark:border-gray-700">
            {format(hour, "haaa")}
          </div>
          {days.map((day) => {
            const [{ isOver }, drop] = useDrop(() => ({
              accept: "EVENT",
              drop: (item: { id: string }) => {
                const event = events.find((e) => e.id === item.id);
                if (event) {
                  const newStart = new Date(day);
                  newStart.setHours(hour.getHours(), 0, 0, 0);
                  const duration =
                    new Date(event.end).getTime() -
                    new Date(event.start).getTime();
                  const newEnd = new Date(newStart.getTime() + duration);
                  updateEvent({ ...event, start: newStart, end: newEnd });
                }
              },
              collect: (monitor) => ({
                isOver: monitor.isOver(),
              }),
            }));

            const slotEvents = events.filter((event) => {
              const evStart = new Date(event.start);
              return (
                isSameDay(day, evStart) &&
                format(evStart, "HH") === format(hour, "HH")
              );
            });

            return (
              <div
                key={day.toISOString() + hour.toISOString()}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                ref={drop as unknown as React.Ref<HTMLDivElement>}
                className={`h-20 border relative ${
                  isOver
                    ? "bg-green-100 dark:bg-green-800"
                    : "hover:bg-blue-50 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                {slotEvents.map((event) => (
                  <DraggableEvent key={event.id} event={event} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WeekView;
