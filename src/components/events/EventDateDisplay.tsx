import "./EventDateDisplay.css";
import { type MeetupEvent } from "../../utils/events";
import dayjs from "dayjs";
import { isUpcoming, humanTime } from "../../utils/time";

export type EventDateDisplayProps = {
  event: Pick<MeetupEvent, "title" | "isCancelled" | "time">;
};
export const EventDateDisplay = ({ event }: EventDateDisplayProps) => {
  const upcoming = isUpcoming(event);
  const date = dayjs(event.time);
  const then = dayjs(date);

  return (
    <div className="event-item-container">
      <div>
        <span className="date">&#128337; {then.format("ddd. MMMM D, YYYY")}</span>
        {upcoming && (
          <>
            <br />
            <span className="date">
              &emsp; {then.format("H:mm")} - {then.add(7200000).format("H:mm")}
            </span>{" "}
            <br />
            <span className="date-timer">&emsp; {humanTime(then)}</span>
          </>
        )}
      </div>
    </div>
  );
};
