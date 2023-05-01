import { test, expect } from "vitest";
import dayjs, { Dayjs } from "dayjs/esm";
import { Event } from "../../utils/events";

import {formatDate, getUniqueItems, getYearFromMeetupEvents, getTimeDiffInDays, isUpcoming} from "../../utils/utils";

test("formatDate(): Formats a timestamp into a valid Date string", () => {
  expect(formatDate(1664002800000)).toEqual("Sat Sep 24 2022");
});

test("getUniqueItems(): Returns an array of unique items from an array of items", () => {
  expect(getUniqueItems([1,2,3,4,4,5,6,7,7,8])).toEqual([1,2,3,4,5,6,7,8]);
});

test("getUniqueItems(): Returns an array of unique items from an array of items", () => {
  expect(getUniqueItems(["A", "B", "C", "C", "D", "E"])).toEqual(["A", "B", "C", "D", "E"]);
});

