import "./Events.css";
import { transform, GroupIDFromGroupType, groupEvents } from "../../utils/events";
import { MeetupEventList } from "../events/MeetupEventList.tsx";
import { AstroLinkURL } from "../AstroLink";

export type EventsPageProps = {
  data: any;
  url: URL;
};
export const EventsPage = ({ data, url }: EventsPageProps) => {
  const { events } = transform(data);
  const filtered = {
    mixed: groupEvents(events),
    owddm: groupEvents(globalThis.document ? events.filter((event) => event.group.id == GroupIDFromGroupType.owddm) : []),
    kwddm: groupEvents(globalThis.document ? events.filter((event) => event.group.id == GroupIDFromGroupType.kwddm) : []),
  };
  return (
    <AstroLinkURL url={url}>
      <div className="events-container">
        <MeetupEventList eventGroups={filtered.owddm} type="owddm" />
        <MeetupEventList eventGroups={filtered.kwddm} type="kwddm" />
      </div>
      <div className="events-mobile-container">
        <MeetupEventList eventGroups={filtered.mixed} type="mixed" />
      </div>
    </AstroLinkURL>
  );
};
