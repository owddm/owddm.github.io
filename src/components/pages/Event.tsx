import "./Event.css";
import { EventMap } from "../EventMap.tsx";
import { EventDateDisplay } from "../events/EventDateDisplay.tsx";
import { EventGroupHeader } from "../events/EventGroupHeader";
import { IcsEventButton } from "../events/IcsEventButton";
import { Marked } from "../Marked";
import { AstroLink, AstroLinkURL } from "../AstroLink.tsx";
import { formatDate, isUpcoming } from "../../utils/time.ts";
import { type MapMarker } from "../../utils/map";
import { transform, type EventData } from "../../utils/events";
import clsx from "clsx";
import { useMemo } from "react";

export type EventPageProps = {
  url: URL;
  eventId: string;
  events: EventData;
};
export const EventPage = ({ url, events, eventId }: EventPageProps) => {
  const event = transform(events).events.find((event) => event.id === eventId)!;
  const image = event.image?.transforms?.m?.webp;
  // "Lists" created by newlines + dashes in the Meetup editor don't get rendered as
  // HTML lists without a bit of pre-processing.
  const description = event!.description.replaceAll("\n\\- ", "\n- ");
  const markers = useMemo(() => {
    if (!event && Array(event).length != 1) return [];
    return Array(event).map((event): MapMarker => {
      return {
        lat: event!.venue!.lat,
        lng: event!.venue!.lng,
        title: event!.title,
        subtitle: formatDate(event!.time),
        type: event!.group.type,
      };
    });
  }, [event]);
  return (
    <AstroLinkURL url={url}>
      <div className="event-container">
        <AstroLink href="/events" className="event-group-banner-container">
          <EventGroupHeader type={event.group.type} />
        </AstroLink>
        <div className="event-image-map-container">
          {image && <img className="event-image-detail" src={image.file} alt="" />}
          <div className="event-map-detail">
            <div className="event-map">
              <EventMap className="main-map" markers={markers} />
            </div>
            <div className="event-location-details-container">
              <div className="event-location-details">
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${event.venue?.lat}%2C${event.venue?.lng}`}>
                  {event.venue?.name}
                </a>
                <br />
                <span>{event.venue?.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="event-image-date-container-mobile">
          {image && <img className="event-image-detail" src={image.file} alt="" />}
          <div className="event-date-container-mobile">{event && <EventDateDisplay event={event} />}</div>
          <h1
            className={clsx({
              "event-title-mobile": true,
              "event-title-cancelled": !!event.isCancelled,
            })}>
            {event.title}¥
          </h1>
          {event.isCancelled && <sub>(Cancelled)</sub>}
          <div className="event-description-container">
            <Marked text={description} />
          </div>
          <div className="event-rsvp-discord-mobile">
            <div>
              {event.group ? (
                <a target="_blank" rel="noopener noreferrer" href={`https://www.meetup.com/en-US/${event.group.urlname}/events/${event.id}`}>
                  <button className="rsvp">→ RSVP</button>
                </a>
              ) : null}
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/k8xj8d75f6">
                <button className="join-discord">→ Join Discord</button>
              </a>
            </div>
          </div>
          <div className="event-map-detail">
            <div className="event-map">
              <EventMap className="main-map" markers={markers} />
            </div>
            <div className="event-location-details-container">
              <div className="event-location-details">
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${event.venue?.lat}%2C${event.venue?.lng}`}>
                  {event.venue?.name}
                </a>
                <br />
                <span>{event.venue?.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="event-details-container">
          <div className="event-details-description">
            <h1
              className={clsx({
                "event-title": true,
                "event-title-cancelled": !!event.isCancelled,
              })}>
              {event.title}
            </h1>
            {event.isCancelled && <sub className="event-cancelled">(Cancelled)</sub>}
            <div className="event-description-container">
              <Marked text={description} />
            </div>
          </div>
          <div className="event-details-date-rsvp-discord">
            <div>{event && <EventDateDisplay event={event} />}</div>
            <div>
              {event.group && isUpcoming(event) && (
                <>
                    <a className="button rsvp" target="_blank" rel="noopener noreferrer" href={`https://www.meetup.com/en-US/${event.group.urlname}/events/${event.id}`}>
                    {" "}
                    → RSVP{" "}
                    </a>
                    <IcsEventButton event={event} />
                </>
              )}
            </div>
            <div>
            </div>
            <div>
              <a className="button join-discord" target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/k8xj8d75f6">
                {" "}
                → Join Discord{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </AstroLinkURL>
  );
};
