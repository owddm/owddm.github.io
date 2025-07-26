import "./IcsEventButton.css";
import { type MeetupEvent } from "../../utils/events";

export type IcsEventButtonProps = {
  event: MeetupEvent;
};
export const IcsEventButton = ({ event }: IcsEventButtonProps) => {
  return (
    <div>
      <a href={`./ok-tech-event-${event.id}.ics`} className="button ics-event-button" download>
        → ICalendar
      </a>
    </div>
  );
};
