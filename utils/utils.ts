import dayjs, { Dayjs } from "dayjs/esm";
import { Event } from "./events";

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
export const getYearFromMeetupEvents = (MeetupEvent: Event[] | undefined) => {
  let years: number[] = [];
  MeetupEvent?.map((event) => {
    years = [...years, new Date(event.time).getFullYear()];
  });
  return years;
};

export interface EventGroup {
  name?: string;
  events: Event[];
}

function groupForEvent(event: Event): string {
  if (Date.now() < event.time) {
    return "Upcoming";
  }
  return new Date(event.time).getFullYear().toString();
}

/**
 * Groups all events to Upcoming or Year
 */
export function groupEvents(events?: Event[]): EventGroup[] | undefined {
  if (!events) return;
  events = events.sort((eventA, eventB) => eventB.time - eventA.time);
  const groups: EventGroup[] = [];
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
export const getTimeDiffInDays = (olderDate: Dayjs, newerDate: Dayjs = dayjs()): number => {
  let timeDiff = dayjs(olderDate).diff(newerDate, "days");
  return timeDiff;
};

/**
 * Does a diff on the passed date and the current date.
 * If the difference is greater than 1 day, it returns true.
 *
 * @param date
 * @returns true if the date is a date in the future.
 */
export const isUpcoming = (date: Dayjs): boolean => {
  let timeDifferenceInDays = getTimeDiffInDays(date, dayjs());
  return timeDifferenceInDays > 0;
};
