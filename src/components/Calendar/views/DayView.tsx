import { useCalendarStore } from "../../../store/calendar";
import { startOfDay, endOfDay, eachHourOfInterval, format } from "date-fns";

const DayView = () => {
  const { currentDate, events, openModal } = useCalendarStore();
  const hours = eachHourOfInterval({
    start: startOfDay(currentDate),
    end: endOfDay(currentDate),
  });

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-2 sm:px-4">
      <div className="text-xl font-semibold mb-4 text-center">
        {format(currentDate, "EEEE, MMMM dd")}
      </div>
      <div className="divide-y border border-gray-300 dark:border-gray-600 rounded-md overflow-y-auto max-h-[80vh]">
        {" "}
        {hours.map((hour) => (
          <div
            key={hour.toISOString()}
            className="h-20 relative px-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() =>
              openModal({
                start: new Date(hour.getHours()),
                end: new Date(hour.getHours() + 1),
              })
            }
          >
            <div className="text-xs text-gray-500 absolute left-2 top-1">
              {format(hour, "h a")}
            </div>
            {events.map((event) => {
              const evStart = new Date(event.start);
              if (format(evStart, "HH") === format(hour, "HH")) {
                return (
                  <div
                    onClick={() => openModal(event)}
                    className="absolute left-20 sm:left-24 top-2 right-2 bg-blue-600 text-white text-[10px] sm:text-xs rounded-md px-2 py-1 shadow-md"
                  >
                    {" "}
                    {event.title}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;
