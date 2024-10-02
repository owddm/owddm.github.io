import "./ImageContainer.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import type { PhotoGroup, PhotoTransform } from "../utils/photos";
import type { SlideData } from "photoswipe";
import { useEffect, useRef } from "react";

interface GroupItem {
  type: "group";
  group: PhotoGroup;
}

interface PhotoItem {
  type: "photo";
  original: string;
  large: PhotoTransform;
  small: PhotoTransform;
}

type Item = GroupItem | PhotoItem;

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export type ImageContainerProps = {
  galleryID: string;
  groups: PhotoGroup[];
};
export const ImageContainer = ({ galleryID, groups }: ImageContainerProps) => {
  const imageContainer = useRef<HTMLDivElement>(null);

  const items: Item[] = [];
  const indexByUrl: { [file: string]: number } = {};
  const dataSource: SlideData[] = [];
  for (const group of groups) {
    items.push({ type: "group", group });
    for (const photo of group.photos) {
      if (photo.instructional) {
        continue;
      }
      indexByUrl[photo.original] = items.length;
      dataSource.push({
        alt: photo.caption,
        w: photo.transforms.l!.webp.size.width,
        h: photo.transforms.l!.webp.size.height,
        src: photo.transforms.l!.webp.file,
        msrc: photo.transforms.s!.webp.file,
        original: photo.original,
      });
      items.push({
        type: "photo",
        original: photo.original,
        large: photo.transforms.l.webp,
        small: photo.transforms.s.webp,
      });
    }
  }
  useEffect(() => {
    if (!imageContainer.current) return;
    const lightBox = new PhotoSwipeLightbox({
      gallery: `#${galleryID}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
      dataSource,
    });
    let hash = document.location.hash;
    const clearHash = () => {
      document.location.hash = hash = "#";
    };
    lightBox.on("close", () => clearHash());
    lightBox.on("change", () => {
      const data = lightBox.pswp?.currSlide?.data;
      if (!data) {
        lightBox.pswp?.close();
        clearHash();
        return;
      }
      // One is on click the other comes from loadAndOpen
      const current = data.original || data.element?.dataset["original"];
      document.location.hash = hash = `#${current}`;
    });
    lightBox.init();
    const openUrl = (hash: string) => {
      if (hash.startsWith("#")) {
        hash = hash.substring(1);
      }
      const index = indexByUrl[hash];
      if (index !== undefined) {
        lightBox.loadAndOpen(index, dataSource);
        // lightBox.loadAndOpen(index, null as any, null)
      }
    };
    openUrl(hash);
    const i = setInterval(() => {
      if (document.location.hash !== hash) {
        hash = document.location.hash;
        openUrl(hash);
      }
    }, 100);
    return () => {
      lightBox.destroy();
      clearInterval(i);
    };
  }, [galleryID]);
  return (
    <div className="gallery-container" id={galleryID} ref={imageContainer}>
      {items.map((item, key) => (
        <div key={key}>
          {item.type === "group" ? (
            <h2>
              <span className="date">{formatDate(item.group.timestamp)}</span>
              {item.group.content && <span className="content">{item.group.content}</span>}
            </h2>
          ) : item.type === "photo" ? (
            <a
              href={item.large.file}
              /** @ts-ignore */
              data-pswp-width={item.large.size.width}
              /** @ts-ignore */
              data-pswp-height={item.large.size.height}
              /** @ts-ignore */
              data-original={item.original}
              target="_blank"
              rel="noreferrer"
              className="img-container-margin">
              <img className="img-container" src={item.small.file} alt="" width={item.small.size.width} height={item.small.size.height} />
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
};
