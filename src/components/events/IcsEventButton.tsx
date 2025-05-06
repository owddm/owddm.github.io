import "./IcsEventButton.css";
import { type MeetupEvent } from "../../utils/events";
import * as ics from "ics";
import dayjs from "dayjs";

export type IcsEventButtonProps = {
  event: MeetupEvent;
};
export const IcsEventButton = ({ event }: IcsEventButtonProps) => {
  // At the moment, event.time is unix timestamp (in miliseconds) for the start time of the event.
  // Only the event.duration is the unix timestamp (in seconds) of only the time in hours and minutes not the actual date itself (e.g. Thu Jan 01 1970 XX XX).
  // TODO: remove complexity around start and end date calculations by also using actual timestamps and both in unix timestamp in seconds. (robertvbraam)
  const getTimeDiffInHours = (startDate: number, endDate: number): number => {
    const startHours = dayjs(startDate).hour();
    const endHours = dayjs(endDate * 1000).hour();
    return endHours - startHours;
  };

  const getTimeDiffInMinutes = (startDate: number, endDate: number): number => {
    const startHours = dayjs(startDate).minute();
    const endHours = dayjs(endDate * 1000).minute();
    return endHours - startHours;
  };

  var venue = event.venue;

  const icsEvent: ics.EventAttributes = {
    start: event.time,
    duration: {
      hours: getTimeDiffInHours(event.time, event.duration),
      minutes: getTimeDiffInMinutes(event.time, event.duration),
    },
    title: event.title,
  };

  if (venue) {
    icsEvent.location = venue.address;
    icsEvent.geo = { lat: venue!.lat, lon: venue!.lng };
  }
  console.log(icsEvent);

  const generateIcsEvent = () => {
    ics.createEvent(icsEvent, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      var uri = encodeURI("data:text/calendar;charset=utf8," + value);

      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = "ok-tech-event.ics";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  return (
    <div>
      <button className="button ics-event-button" onClick={generateIcsEvent}>
        → ICalendar
      </button>
    </div>
  );
};
