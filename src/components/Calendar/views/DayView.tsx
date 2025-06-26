import { useCalendarStore } from "../../../store/calendar";
import {
  startOfDay,
  endOfDay,
  eachHourOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { useDrop } from "react-dnd";
import DraggableEvent from "../../Event/DraggableEvent";

const DayView = () => {
  const { currentDate, events, openModal, updateEvent } = useCalendarStore();
  const hours = eachHourOfInterval({
    start: startOfDay(currentDate),
    end: endOfDay(currentDate),
  });

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-2 sm:px-4">
      <div className="text-xs text-center py-2 font-medium border-r border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
        {format(currentDate, "EEEE, MMMM dd")}
      </div>
      <div className="divide-y border border-gray-300 dark:border-gray-600 rounded-md overflow-y-auto max-h-[80vh]">
        {hours.map((hour) => {
          const [{ isOver }, drop] = useDrop(() => ({
            accept: "EVENT",
            drop: (item: { id: string }) => {
              const event = events.find((e) => e.id === item.id);
              if (event) {
                const newStart = new Date(currentDate);
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
              isSameDay(evStart, hour) &&
              format(evStart, "HH") === format(hour, "HH")
            );
          });

          return (
            <div
              key={hour.toISOString()}
              ref={drop}
              className={`h-20 relative px-4 border-b transition-colors ${
                isOver
                  ? "bg-green-100 dark:bg-green-800"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="text-xs text-gray-500 absolute left-2 top-1">
                {format(hour, "h a")}
              </div>
              {slotEvents.map((event) => (
                <DraggableEvent key={event.id} event={event} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
