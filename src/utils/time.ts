import dayjs, { type Dayjs } from "dayjs";
import type { MeetupEvent } from "./events";

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

export function humanTime(then: Dayjs) {
  const now = dayjs();
  const diffInDays = getTimeDiffInDays(then, now);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 28);
  return diffInMonths > 1 ? `In ${diffInMonths} months!` : diffInMonths === 1 ? `In one month!` : diffInWeeks > 1 ? `In ${diffInWeeks} weeks!` : diffInWeeks === 1 ? `In one week!` : diffInDays > 2 ? `In ${diffInDays} days!` : diffInDays > 1.5 ? `Tomorrow!` : `Soon!`;
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
