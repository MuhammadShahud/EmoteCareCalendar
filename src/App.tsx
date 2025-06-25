import CalendarHeader from './components/Calendar/CalendarHeader'
import CalendarView from './components/Calendar/CalendarView'
import EventModal from './components/Event/EventModal'
import { useCalendarStore } from './store/calendar'

const App = () => {
  const { modalOpen, modalEvent, closeModal } = useCalendarStore()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <CalendarHeader />
      <main className="p-4">
        <CalendarView />
      </main>
      <EventModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialEvent={modalEvent}
      />
      {/* Floating + Button */}
      <button
        onClick={() => useCalendarStore.getState().openModal()}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 text-2xl"
      >
        +
      </button>
    </div>
  )
}

export default App