import "./MeetupEventItem.css";

import dayjs from "dayjs";
import clsx from "clsx";
import { type MeetupEvent } from "../../utils/events";
import { humanTime, isUpcoming } from "../../utils/time";

export type MeetupEventItemProps = {
  event: Pick<MeetupEvent, "title" | "time" | "id" | "group" | "isCancelled">;
};
export const MeetupEventItem = ({ event }: MeetupEventItemProps) => {
  const title = event.title;
  const date = dayjs(event.time);
  const url = `/events/${event.id}`;
  const group = event.group.type;
  const then = dayjs(date);
  const upcoming = isUpcoming(event);
  return (
    <div
      className={clsx({
        "meetup-event-item-container": true,
        "container-upcoming": upcoming,
        "container-owddm": group == "owddm" ? true : false,
        "container-kwddm": group == "kwddm" ? true : false,
      })}>
      <div
        className={clsx({
          title: true,
          "title-cancelled": !!event.isCancelled,
        })}>
        <a href={url}>{title}</a>
      </div>
      {upcoming && (
        <div>
          <span className="date-timer">{humanTime(then)}</span>
        </div>
      )}
      <span className="date">{dayjs(date).format("ddd. MMMM D YYYY [at] H:mm")}</span>
    </div>
  );
};
