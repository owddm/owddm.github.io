const base = "https://owddm.github.io/public";

export function getSitePath(path: string): string {
  return `${base}${path}`;
}

// * Format Date

export function formatDate(timestamp: Date) {
  let date = new Date(timestamp);
  return date.toDateString();
}

// * Events

// const eventsCache = new WeakMap<MeetupEventDataRaw, Group[]>();

interface MeetupEventDataRaw {
  groups: { [groupName: string]: MeetupGroup };
  transforms: Transform[];
  venues: Venue[];
}

interface Venue {
  address?: string;
  city?: string;
  country?: string;
  crossStreet?: boolean | null;
  id: string;
  lat: number;
  lng: number;
  name?: string;
  postalCode?: string;
  state?: string;
}

interface MeetupGroup {
  city?: string;
  country?: string;
  description?: string;
  events?: MeetupEvent[];
  foundedAt?: number;
  latitude?: number;
  longitude?: number;
  name: string;
  organizer?: string;
  state?: string;
  timezone?: string;
  urlname?: string;
  welcomeBlurb?: string;
  zip?: string;
}

interface MeetupEventImage {
  date: Date;
  file: string;
  original?: string;
  res: number[][];
  transforms: {
    [key: string]: {
      [format: string]: PhotoTransform;
    };
  };
}

export interface MeetupEventRaw {
  description: string;
  duration?: number;
  howToFindUs?: string | null;
  id: string;
  image: MeetupEventImage;
  time: Date;
  title: string;
  topics: string[];
  venue: string;
}

export interface MeetupEvent {
  description: string;
  duration?: number;
  howToFindUs?: string | null;
  id: string;
  image: MeetupEventImage;
  time: Date;
  title: string;
  topics: string[];
  venue?: string;
}

export async function useEvents(groupID: string) {
  const res = await useFetch<MeetupEventDataRaw>(`${base}/events.json`);
  const [data, error] = [res.data.value, res.error.value];
  if (!data) {
    throw error!;
  }

  let meetupEvents = data?.groups?.[groupID].events?.map((event) => {
    const file = event.image.file.replace(/\..*$/, "");
    return <MeetupEvent>{
      description: event.description,
      id: event.id,
      time: event.time,
      title: event.title,
      topics: event.topics,
      venue: data.venues.find((venue) => venue.id === event.venue),
      image: {
        date: event.image.date,
        original: event.image.file,
        transforms: data.transforms.reduce((sizes, transform, index) => {
          const sizeRaw = event.image.res[index];
          const size = {
            width: sizeRaw[0],
            height: sizeRaw[1],
          };
          sizes[data.transforms[index].key] = data.transforms[index].formats.reduce((formats, format) => {
            formats[format] = {
              file: `${base}/${file}@${transform.key}.${format}`,
              size,
            };
            return formats;
          }, {} as { [format: string]: PhotoTransform });
          return sizes;
        }, {} as { [key: string]: { [format: string]: PhotoTransform } }),
      },
    };
  });
  return meetupEvents;
}

// * Utility functions

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
export const getYearFromMeetupEvents = (MeetupEvent: MeetupEvent[] | undefined) => {
  let years: number[] = [];
  MeetupEvent?.map((event) => {
    years = [...years, new Date(event.time).getFullYear()];
  });
  return years;
};

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
