import "leaflet/dist/leaflet.css";
import { type MapMarker, loadMapLibreLayer } from "../utils/map";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export type EventMapProps = {
  className?: string;
  markers: MapMarker[];
};
// const key = "8JZtFquVr4EgrXWK57Kx";
// const mapId = "53ec7d02-deae-4eb4-8294-406ed07b3271";

// export const EventMap = ({ markers, className }: EventMapProps) => {
//   const mapStyle = `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`
//   if (!globalThis.document) return <></>
//   console.log(mapStyle)
//   return <Map
//     initialViewState={{
//       longitude: -122.4,
//       latitude: 37.8,
//       zoom: 14
//     }}
//     style={{width: 600, height: 400}}
//     mapStyle={mapStyle}>
//   </Map>
// }
export const EventMap = ({ markers, className }: EventMapProps) => {
  const map = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mapNode = map.current;
    if (!mapNode) return;
    if (!globalThis.document) return;
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
      const marker = markers[0];
      if (!marker) {
        return;
      }
      console.log({ marker });
      if (marker.type == "owddm") {
        lMap = L.map(mapNode).setView([34.69937, 135.49081], 11);
      } else if (markers![0]!.type == "kwddm") {
        lMap = L.map(mapNode).setView([35.00005, 135.75581], 11);
      }
      const gl = new MaplibreLayer({
        attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        style: `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`,
      });
      gl.addTo(lMap);
      stop = (() => {
        const lMarkers = markers!.map((marker) => {
          let title = marker.title
            ? `<div class="map-single-event--label"><div class="map-single-event--title">${marker.title}</div>${marker.subtitle ? `<div class="map-single-event--info">${marker.subtitlePrefix ? `<strong>${marker.subtitlePrefix}</strong> ` : ""}${marker.subtitle}</div></div>` : ""}`
            : "";
          const html = `<img src="/images/marker/${marker.type}.svg" class="map-event--image" alt="">${title}`;
          return L.marker([marker.lat, marker.lng], {
            icon: L.divIcon({
              iconAnchor: [37, 118],
              iconSize: [74, 120],
              className: "owddm-map-marker",
              html,
            }),
          }).on("click", () => {
            console.log({ click: marker });
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
    <div className={clsx("map--container", className)}>
      <div className="map--map" ref={map}>
        <a href="https://www.maptiler.com" style={{ position: "absolute", left: "10px", bottom: "10px", zIndex: 999 }}>
          <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
        </a>
      </div>
    </div>
  );
};
