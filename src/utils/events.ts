import { type Photo, type PhotoRaw, preparePhoto, type Transform } from "./photos";
export type EventID = string;
export type GroupID = string;
export type VenueID = string;

interface FeeSettings {
  accepts: "CASH";
  amount: number;
  currency: string;
  required: boolean;
  refundPolicy: {
    days: number;
    notes: string;
    policies: string[];
  };
}
export interface EventRaw {
  title: string;
  isCancelled?: boolean;
  description: string;
  time: number;
  duration: number;
  image?: PhotoRaw;
  feeSettings: null | FeeSettings;
  id: EventID;
  maxTickets: number;
  numberOfAllowedGuests: number;
  topics: string[];
  venue?: VenueID;
}

interface GroupRaw {
  city: string;
  country: string;
  description: string;
  foundedAt: number;
  latitude: number;
  longitude: number;
  name: string;
  organizer: string;
  state: string;
  timezone: string;
  urlname: string;
  welcomeBlurb: string;
  zip: string;
  events: EventRaw[];
}

interface VenueRaw {
  address: string;
  city: string;
  country: string;
  crossStreet: string | null;
  id: string;
  lat: number;
  lng: number;
  name: string;
  postalCode: string;
  state: string;
}

interface EventsRaw {
  groups: { [id: GroupID]: GroupRaw };
  transforms: Transform[];
  venues: VenueRaw[];
}

export type Group = Omit<GroupRaw, "events"> & {
  id: GroupID;
  type: GroupType;
  events: MeetupEvent[];
};

export type MeetupEvent = Omit<EventRaw, "venue" | "image"> & {
  venue?: Venue;
  group: Group;
  image?: Photo;
};

export type Venue = VenueRaw;

export enum GroupType {
  owddm = "owddm",
  kwddm = "kwddm",
  unknown = "unknown",
}

export enum GroupIDFromGroupType {
  owddm = "15632202",
  kwddm = "36450361",
}

export function isInFuture(event: MeetupEvent, time?: number) {
  return event.time > (time ?? Date.now());
}

export function getMostRelevantEvent(events: MeetupEvent[]): MeetupEvent {
  let mostRelevant: MeetupEvent | undefined;
  const time = Date.now();
  const inFuture = (event: MeetupEvent) => isInFuture(event, time);
  for (const event of events) {
    if (!event.venue) {
      // Skip events without venue
      continue;
    }
    if (!mostRelevant) {
      mostRelevant = event;
      continue;
    }
    if (event.isCancelled) {
      continue;
    }
    if (inFuture(mostRelevant)) {
      if (!inFuture(event)) {
        // Future wins over past
        continue;
      }
      if (mostRelevant.time < event.time) {
        // In future the next coming up wins
        continue;
      }
    } else {
      if (inFuture(event)) {
        // Future wins over past
        mostRelevant = event;
        continue;
      }
      if (mostRelevant.time > event.time) {
        // In the past the latest wins
        continue;
      }
    }
    mostRelevant = event;
  }
  if (!mostRelevant) {
    throw new Error("No event found");
  }
  return mostRelevant;
}

export function getLatestEvents({ groups }: EventData): MeetupEvent[] {
  return groups.map(({ events }) => getMostRelevantEvent(events));
}

export interface EventData {
  groups: Group[];
  events: MeetupEvent[];
  venues: Venue[];
}

const typeById: { [id: string]: GroupType } = {
  "36450361": GroupType.kwddm,
  "15632202": GroupType.owddm,
};

export function transform(raw: any): EventData {
  const input = raw as EventsRaw;
  const venueLookup: { [venueId: VenueID]: Venue } = {};
  for (const venue of input.venues) {
    venueLookup[venue.id] = venue;
  }
  const events = [] as MeetupEvent[];
  return {
    groups: Object.entries(input.groups).map(([id, groupRaw]) => {
      const group: Group = {
        ...groupRaw,
        id,
        type: typeById[id] ?? GroupType.unknown,
        events: [],
      };
      group.events = groupRaw.events
        .filter((eventRaw) => eventRaw.venue)
        .map((eventRaw) => {
          const { venue, image, ...rest } = eventRaw;

          const event: MeetupEvent = {
            ...rest,
            group,
            venue: venueLookup[venue!]!,
            image: preparePhoto(image!, input.transforms),
          };
          events.push(event);
          return event;
        });
      return group;
    }),
    events,
    venues: input.venues,
  };
}

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
export function groupEvents(events: MeetupEvent[]): EventGroups {
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

export const fetchEvents = async () => await (await fetch("https://public.oktech.jp/events.json")).json();
