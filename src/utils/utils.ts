import dayjs from "dayjs";
import { type MeetupEvent } from "./events";

const base = "https://owddm.com/public";

export function getSitePath(path: string): string {
  return `${base}${path}`;
}

/**
 * Formats a timestamp into a valid Date string
 *
 * @param timestamp
 * @returns Date string
 */
export function formatDate(timestamp: Date | number) {
  let date = new Date(timestamp);
  return date.toDateString();
}

/**
 * Returns an array of unique items from an array of items
 *
 * @param items
 * @returns array of unique items
 */
export const getUniqueItems = <T>(items: T[]) => {
  let unique = items.reduce<T[]>((acc, currentValue) => (acc.includes(currentValue) ? acc : [...acc, currentValue]), []);
  return unique;
};

/**
 * Return the year from the dates in an array of Meetup events.
 *
 * @param MeetupEvent
 * @returns array of years
 */
export const getYearFromMeetupEvents = (meetupEvent: MeetupEvent[] | undefined) => {
  let years: number[] = [];
  meetupEvent?.map((event) => {
    years = [...years, new Date(event.time).getFullYear()];
  });
  return years;
};

export interface EventGroup {
  name?: string;
  events: MeetupEvent[];
}

function groupForEvent(event: MeetupEvent): string {
  if (Date.now() < event.time && !event.isCancelled) {
    return "Upcoming";
  }
  return new Date(event.time).getFullYear().toString();
}

export type EventGroups = EventGroup[];

/**
 * Groups all events to Upcoming or Year
 */
export function groupEvents(events?: MeetupEvent[]): EventGroups | undefined {
  if (!events) return;
  events = events.sort((eventA, eventB) => eventB.time - eventA.time);
  const groups: EventGroups = [];
  let previousGroup: EventGroup | undefined;
  for (const event of events) {
    const name = groupForEvent(event);
    if (!previousGroup || previousGroup.name !== name) {
      previousGroup = {
        name,
        events: [event],
      };
      groups.push(previousGroup);
    } else {
      previousGroup.events.push(event);
    }
  }
  return groups;
}

/**
 * Returns the time difference between two dates in days.
 *
 * @param olderDate
 * @param newerDate
 * @returns time difference in days
 */
export const getTimeDiffInDays = (olderDate: any, newerDate: any = dayjs()): number => {
  let timeDiff = olderDate.diff(newerDate, "days");
  return timeDiff;
};

/**
 * Does a diff on the passed date and the current date.
 * If the difference is greater than 1 day, it returns true.
 *
 * @param date
 * @returns true if the date is a date in the future.
 */
export const isUpcoming = (event: Pick<MeetupEvent, "isCancelled" | "time">): boolean => {
  if (event.isCancelled) {
    return false;
  }
  let timeDifferenceInDays = getTimeDiffInDays(dayjs(event.time), dayjs());
  return timeDifferenceInDays > 0;
};
