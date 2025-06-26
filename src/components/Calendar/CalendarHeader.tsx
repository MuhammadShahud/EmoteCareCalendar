import { useCalendarStore } from "../../store/calendar";
import { format } from "date-fns";
import ThemeToggle from "../UI/ThemeToggle";
import logo from "../../assets/logo.svg";

const CalendarHeader = () => {
  const { currentDate, view, setView, navigate } = useCalendarStore();

  return (
    <header className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 text-sm sm:text-base">
      {/* Left section */}
      <div className="flex items-center gap-2 flex-wrap">
        <img src={logo} alt="Logo" className="mr-1" />

        <button
          className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          onClick={() => navigate("prev")}
        >
          ◀
        </button>
        <button
          className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          onClick={() => navigate("next")}
        >
          ▶
        </button>

        {/* Hide month heading on mobile */}
        <h2 className="ml-2 font-bold text-base sm:text-xl hidden sm:block">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <select
          value={view}
          onChange={(e) => setView(e.target.value as any)}
          className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24 sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>

        {/* Toggle with full text on desktop, emoji only on mobile */}
        <div className="sm:hidden">
          <button
            onClick={() =>
              document.documentElement.classList.toggle("dark")
            }
            className="text-xl px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            🌙
          </button>
        </div>
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;