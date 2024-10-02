import "./MeetupEventList.css";
import { EventGroupHeader } from "./EventGroupHeader";
import { MeetupEventItem } from "./MeetupEventItem";
import { type MeetupEvent } from "../../utils/events";

interface EventGroup {
  name?: string;
  active?: boolean;
  events?: MeetupEvent[];
}

export type MeetupEventListProps = {
  eventGroups: EventGroup[];
  type?: string;
};
export const MeetupEventList = ({ eventGroups, type }: MeetupEventListProps) => (
  <div className="event-list-container">
    <EventGroupHeader type={type} />
    {eventGroups.map(({ name, events }, index) => (
      <div key={index}>
        {name && <h2 className="heading">{name}</h2>}
        {events?.map((event) => <MeetupEventItem key={event.id} event={event} />)}
      </div>
    ))}
  </div>
);
