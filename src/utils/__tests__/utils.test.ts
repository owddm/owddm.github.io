import { test, expect } from "vitest";
import dayjs from "dayjs";

import { formatDate, getUniqueItems, getTimeDiffInDays, isUpcoming } from "../utils";

test("formatDate(): Formats a timestamp into a valid Date string", () => {
  expect(formatDate(1664002800000)).toEqual("Sat Sep 24 2022");
});

test("getUniqueItems(): Returns an array of unique items from an array of items", () => {
  expect(getUniqueItems([1, 2, 3, 4, 4, 5, 6, 7, 7, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test("getUniqueItems(): Returns an array of unique items from an array of items", () => {
  expect(getUniqueItems(["A", "B", "C", "C", "D", "E"])).toEqual(["A", "B", "C", "D", "E"]);
});

test("isUpcoming(): Does a diff on the passed date and the current date.", () => {
  expect(isUpcoming({ time: dayjs(new Date()).add(2, "day").valueOf(), isCancelled: false })).toEqual(true);
});

test("isUpcoming(): Cancelled events arnt upcoming", () => {
  expect(isUpcoming({ time: dayjs(new Date()).add(2, "day").valueOf(), isCancelled: true })).toEqual(false);
});

test("isUpcoming(): Does a diff on the passed date and the current date.", () => {
  expect(isUpcoming({ time: dayjs(new Date()).valueOf(), isCancelled: false })).toEqual(false);
});

test("getTimeDiffInDays(): Returns the time difference between two dates in days.", () => {
  expect(getTimeDiffInDays(dayjs(1680483472000), dayjs(1684490400000))).toEqual(-46);
});
