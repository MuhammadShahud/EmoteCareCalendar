import CalendarHeader from "./components/Calendar/CalendarHeader";
import CalendarView from "./components/Calendar/CalendarView";
import EventModal from "./components/Event/EventModal";
import { useCalendarStore } from "./store/calendar";
import 'react-datepicker/dist/react-datepicker.css';


const App = () => {
  return (

    <div className="min-h-screen bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-white font-sans">
      <CalendarHeader />
      <main className="p-4">
        {/* Floating + Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => useCalendarStore.getState().openModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-full shadow-lg text-sm sm:text-base transition-all duration-200"
          >
            <span className="text-lg font-bold leading-none">+</span>
            <span className="hidden sm:inline">Create</span>
          </button>
        </div>

        <CalendarView />
      </main>
      <EventModal
      />
    </div>
  );
};

export default App;
