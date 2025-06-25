import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
  isSameWeek,
  eachHourOfInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { useCalendarStore } from "../../../store/calendar";
import Draggable from "react-draggable";

const WeekView = () => {
  const { currentDate, events, openModal, updateEvent } = useCalendarStore();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = eachHourOfInterval({
    start: startOfDay(currentDate),
    end: endOfDay(currentDate),
  });

  return (
    <div className="overflow-x-auto border-t border-gray-300 dark:border-gray-600">
      <div className="min-w-[900px] grid grid-cols-8 bg-gray-50 dark:bg-gray-800">
        {/* header row */}
        <div className="col-span-1 text-xs text-center py-2 bg-gray-100 dark:bg-gray-700 font-semibold border-r border-b border-gray-300 dark:border-gray-600">
          Time
        </div>
        {days.map((day) => (
          <div className="text-[10px] sm:text-xs text-center py-2 font-semibold border-r border-b border-gray-300 dark:border-gray-600">
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
          {days.map((day) => (
            <div
              key={day.toISOString() + hour.toISOString()}
              className="h-20 border border-gray-200 dark:border-gray-700 relative hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() =>
                openModal({
                  start: new Date(day.setHours(hour.getHours())),
                  end: new Date(day.setHours(hour.getHours() + 1)),
                })
              }
            >
              {events.map((event) => {
                const evStart = new Date(event.start);
                if (
                  isSameDay(day, evStart) &&
                  format(evStart, "HH") === format(hour, "HH")
                ) {
                  return (
                    <Draggable
                      key={event.id}
                      axis="y"
                      bounds="parent"
                      grid={[1, 64]}
                      onStop={(e, data) => {
                        const minutesMoved = (data.y / 64) * 60;
                        const newStart = new Date(event.start);
                        const newEnd = new Date(event.end);
                        newStart.setMinutes(
                          newStart.getMinutes() + minutesMoved
                        );
                        newEnd.setMinutes(newEnd.getMinutes() + minutesMoved);
                        updateEvent({
                          ...event,
                          start: newStart,
                          end: newEnd,
                        });
                      }}
                    >
                      <div
                        className="absolute inset-1 bg-blue-500 text-white text-xs rounded-md p-1 shadow-md cursor-move"
                        onClick={() => openModal(event)}
                      >
                        {event.title}
                      </div>
                    </Draggable>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeekView;
