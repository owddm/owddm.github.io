import "leaflet/dist/leaflet.css";
import { type MapMarker, loadMapLibreLayer } from "../../utils/map.ts";
import { transform, getLatestEvents, type MeetupEvent } from "../../utils/events.ts";
import { formatDate, isUpcoming } from "../../utils/time.ts";
import { useEffect, useMemo, useRef } from "react";
import { AstroLinkURL } from "../AstroLink.tsx";

export type IndexPageProps = {
  data: any;
  url: URL;
};

function toMarker(event: MeetupEvent): MapMarker {
  return {
    lat: event!.venue!.lat,
    lng: event!.venue!.lng,
    title: event.title,
    subtitle: formatDate(event.time),
    type: event.group.type,
    isUpcoming: isUpcoming(event),
  };
}
export const IndexPage = ({ data, url }: IndexPageProps) => {
  const map = useRef<HTMLDivElement>(null);
  const marker = useMemo(
    () =>
      toMarker(
        getLatestEvents(transform(data))
          .filter((event) => event?.venue)
          .reduce((a, b) => {
            if (isUpcoming(a)) {
              if (!isUpcoming(b)) {
                return a;
              }
              return a.time > b.time ? b : a;
            } else if (isUpcoming(b)) {
              return b;
            } else {
              return a.time < b.time ? b : a;
            }
          }),
      ),
    [data],
  );
  const markers = [marker];
  useEffect(() => {
    if (!map.current) return;
    if (!globalThis) return;
    let mounted = true;
    let lMap: any;
    let stop = () => {};
    (async () => {
      const L = await import("leaflet");
      const MaplibreLayer = await loadMapLibreLayer(L);
      const key = "8JZtFquVr4EgrXWK57Kx";
      const mapId = "53ec7d02-deae-4eb4-8294-406ed07b3271";
      if (!mounted) {
        return;
      }
      lMap = L.map(map.current!).setView([34.95937, 136.1], 9.4);
      const gl = new MaplibreLayer({
        attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        style: `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`,
      });
      gl.addTo(lMap);
      stop = (() => {
        const lMarkers = markers.map((marker) => {
          let title = marker.title
            ? `<div class="map-event--label">
              <div class="map-event--title">${marker.title}</div>
              ${marker.subtitle ? `<div class="map-event--info">${marker.subtitlePrefix ? `<strong>${marker.subtitlePrefix}</strong> ` : ""}${marker.subtitle}</div></div>` : ""}`
            : "";
          const html = `<img src="/images/marker/oktech.svg" class="map-event--image " alt="">${title}`;
          return L.marker([marker.lat, marker.lng], {
            icon: L.divIcon({
              iconAnchor: [37, 118],
              iconSize: [74, 120],
              className: `owddm-map-marker`,
              html,
            }),
          }).on("click", () => {
            if (marker.target) {
              document.location.href = marker.target;
            }
          });
        });
        for (const marker of lMarkers) {
          marker.addTo(lMap);
        }
        return () => {
          for (const marker of lMarkers) {
            marker.remove();
          }
        };
      })();
    })().catch((err: Error) => console.warn(err));
    return () => {
      mounted = false;
      stop();
      if (lMap) {
        lMap.off();
        lMap.remove();
      }
    };
  }, [map.current]);
  return (
    <AstroLinkURL url={url}>
      <div className="main-map map--container">
        <div className="map--map" ref={map}>
          <a href="https://www.maptiler.com" style={{ position: "absolute", left: "10px", bottom: "10px", zIndex: 999 }}>
            <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
          </a>
        </div>
      </div>
    </AstroLinkURL>
  );
};
