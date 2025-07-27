import type { APIRoute } from "astro";
import { fetchEvents, transform } from "../../utils/events";
import { createICSFromEvents } from "../../utils/ics";

interface Param {
  event_id: string;
}

export const GET: APIRoute<Param> = async ({ params }) => {
  const events = transform(await fetchEvents());
  if (!params.event_id) {
    return new Response("Event_id is unexpectedly missing", {
      status: 404,
    });
  }
  const event = events.events.find((event) => event.id === params.event_id);
  if (!event) {
    return new Response(`event_id=${params.event_id} not found`, {
      status: 404,
    });
  }
  return new Response(await createICSFromEvents([event]), {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
};

export async function getStaticPaths(): Promise<{ params: Param }[]> {
  const events = transform(await fetchEvents());
  return events.events.map((event) => ({ params: { event_id: event.id } }));
}
