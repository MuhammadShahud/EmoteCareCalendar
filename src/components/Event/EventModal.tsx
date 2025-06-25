import Modal from "react-modal";
import { useEffect, useState } from "react";
// At top
import { useCalendarStore } from '../../store/calendar'
import type { CalendarEvent } from '../../store/calendar'

// Extend props
interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  initialEvent?: Partial<CalendarEvent> // For edit or prefill
}

const EventModal = ({ isOpen, onClose, initialEvent }: EventModalProps) => {
  const { addEvent, updateEvent } = useCalendarStore()
  const [title, setTitle] = useState(initialEvent?.title || '')
  const [start, setStart] = useState(initialEvent?.start?.toISOString().slice(0, 16) || '')
  const [end, setEnd] = useState(initialEvent?.end?.toISOString().slice(0, 16) || '')

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '')
      setStart(initialEvent.start?.toISOString().slice(0, 16) || '')
      setEnd(initialEvent.end?.toISOString().slice(0, 16) || '')
    }
  }, [initialEvent])

  const handleSubmit = () => {
    if (!title || !start || !end) return
  console.log("working1");
  
    const parsedStart = new Date(start)
    const parsedEnd = new Date(end)
  
    if (initialEvent?.id) {
      console.log("working2");

      updateEvent({
        id: initialEvent.id,
        title,
        start: parsedStart,
        end: parsedEnd,
        description: initialEvent.description || '',
      })
      console.log("working3");

    } else {
      console.log("working4");

      addEvent({
        title,
        start: parsedStart,
        end: parsedEnd,
      })
      console.log("working5");

    }
  
    onClose()
    console.log("working6");

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[90%] max-w-md bg-white dark:bg-gray-800 p-4 sm:p-6 rounded shadow-xl mx-auto mt-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start sm:items-center justify-center overflow-y-auto"
    >
      <h2 className="text-lg font-semibold mb-4">{initialEvent?.id ? 'Edit' : 'Create'} Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        className="w-full mb-2 px-2 py-1 border rounded text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        className="w-full mb-2 px-2 py-1 border rounded text-sm"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        className="w-full mb-2 px-2 py-1 border rounded text-sm"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} className="btn">Cancel</button>
        <button onClick={handleSubmit} className="btn bg-blue-600 text-white">
          Save
        </button>
      </div>
    </Modal>
  )
}

export default EventModal
