import Modal from "react-modal";
import { useEffect, useState, forwardRef } from "react";
import { useCalendarStore } from "../../store/calendar";
import type { CalendarEvent } from "../../store/calendar";
import DatePicker from "react-datepicker";

const StyledInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm ${className}`}
    />
  )
);
StyledInput.displayName = "StyledInput";

const EventModal = () => {
  const {
    modalOpen,
    modalEvent,
    closeModal,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarStore();

  console.log("Modal Event:", modalEvent);
  

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (modalOpen) {
      setTitle(modalEvent?.title || "");
      setStartDate(modalEvent?.start ? new Date(modalEvent.start) : null);
      setEndDate(modalEvent?.end ? new Date(modalEvent.end) : null);
    }
  }, [modalOpen, modalEvent]);

  const colorPalette = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  
  function getRandomColor(): string {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  }

const handleSubmit = () => {
  if (!title || !startDate || !endDate) return;

  const newEvent: CalendarEvent = {
    id: modalEvent?.id || crypto.randomUUID(),
    title,
    start: startDate,
    end: endDate,
    color: modalEvent?.color || getRandomColor(), // 💥 assign a color here
  };

  if (modalEvent?.id) {
    updateEvent(newEvent);
  } else {
    addEvent(newEvent);
  }

  closeModal();
};

  const handleDelete = () => {
    if (modalEvent?.id) {
      deleteEvent(modalEvent.id);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl mx-auto mt-20 relative z-50"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center px-4"
    >
      <h2 className="text-xl font-semibold mb-6 text-center dark:text-white">
        {modalEvent?.id ? "Edit Event" : "Create Event"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium dark:text-white">Title</label>
          <input
            type="text"
            placeholder="Event Title"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium dark:text-white">Start</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start time"
            customInput={<StyledInput />}
            wrapperClassName="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium dark:text-white">End</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select end time"
            customInput={<StyledInput />}
            wrapperClassName="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          {modalEvent?.id && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;