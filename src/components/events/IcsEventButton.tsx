import "./IcsEventButton.css";
import { type MeetupEvent } from "../../utils/events";
import * as ics from "ics";
import dayjs from "dayjs";

export type IcsEventButtonProps = {
  event: MeetupEvent;
};
export const IcsEventButton = ({ event }: IcsEventButtonProps) => {
  function msToDuration(durationInMs: number): ics.DurationObject {
    let time = (durationInMs / 1000) | 0;
    const seconds = time % 60;
    time = (time / 60) | 0;
    const minutes = time % 60;
    time = (time / 60) | 0;
    const hours = time % 24;
    time = (time / 24) | 0;
    const days = time % 7;
    time = (time / 7) | 0;
    const weeks = time;
    return {
      weeks,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  var venue = event.venue;

  const icsEvent: ics.EventAttributes = {
    uid: event.id,
    start: event.time,
    duration: msToDuration(event.duration),
    title: event.title,
  };

  if (venue) {
    icsEvent.location = venue.address;
    icsEvent.geo = { lat: venue!.lat, lon: venue!.lng };
  }

  const generateIcsEvent = () => {
    ics.createEvent(icsEvent, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      var uri = encodeURI("data:text/calendar;charset=utf8," + value);

      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      var startDate = dayjs(event.time);
      downloadLink.download = `ok-tech-event-${startDate.year()}-${startDate.month()}-${startDate.day()}.ics`;

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
