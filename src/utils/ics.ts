import * as ics from "ics";
import type { MeetupEvent } from "./events";

export function msToDuration(durationInMs: number): ics.DurationObject {
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

export function createEventsICS(icsEventAttribs: ics.EventAttributes[]): Promise<string> {
  return new Promise<string>((resolve, reject) => ics.createEvents(icsEventAttribs, (error, value) => (error ? reject(error) : resolve(value))));
}

export async function createICSFromEvents(events: MeetupEvent[]): Promise<string> {
  return await createEventsICS(
    events.map((event) => {
      const venue = event.venue;
      return {
        start: event.time,
        classification: "PUBLIC",
        duration: msToDuration(event.duration),
        uid: event.id,
        title: event.title,
        categories: event.topics,
        ...(venue
          ? {
              location: venue.address,
              geo: { lat: venue.lat, lon: venue.lng },
            }
          : {}),
      };
    }),
  );
}
