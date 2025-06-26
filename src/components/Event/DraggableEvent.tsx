import { useDrag } from "react-dnd";
import { useCalendarStore, type CalendarEvent } from "../../store/calendar";

const DraggableEvent = ({
  event,
  month = false,
}: {
  event: CalendarEvent;
  month?: boolean;
}) => {
  const { openModal } = useCalendarStore();
  console.log("~data", month, event);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "EVENT",
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={
        month
          ? `${event.color} mb-1 hover:brightness-110 dark:mix-blend-screen text-white text-xs rounded px-1 py-0.5 truncate cursor-pointer`
          : `absolute inset-1 ${event.color} text-white text-xs rounded-md p-1 shadow cursor-move transition`
      }
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={(e) => {
        e.stopPropagation();
        openModal(event);
      }}
    >
      {event.title}
    </div>
  );
};

export default DraggableEvent;
