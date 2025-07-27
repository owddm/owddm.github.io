import type { APIRoute } from "astro";
import { fetchEvents, transform } from "../utils/events";
import { createICSFromEvents } from "../utils/ics";

export const GET: APIRoute = async () => {
  const events = transform(await fetchEvents());
  return new Response(await createICSFromEvents(events.events), {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
};
