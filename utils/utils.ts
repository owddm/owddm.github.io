interface PhotoRaw {
  instructional?: boolean;
  caption?: string;
  file: string;
  res: number[][];
  corners: string[];
}

interface GroupRaw {
  content?: string;
  event: string;
  photos: PhotoRaw[];
  timestamp: number;
}

export interface Group {
  content?: string;
  event?: string;
  photos: Photo[];
  timestamp: Date;
}

export interface Transform {
  key: string;
  formats: string[];
  resize?: {
    width?: number;
    height?: number;
    fit?: string;
  };
}
interface PhotosRaw {
  transforms: Transform[];
  groups: GroupRaw[];
}

export interface PhotoTransform {
  file: string;
  size: {
    width: number;
    height: number;
  };
}

export interface Photo {
  caption?: string;
  instructional?: boolean;
  original: string;
  corners: string[];
  transforms: {
    [key: string]: {
      [format: string]: PhotoTransform;
    };
  };
}

const photoCache = new WeakMap<PhotosRaw, Group[]>();
const base = "https://owddm.github.io/public";
export async function usePhotos() {
  const res = await useFetch<PhotosRaw>(`${base}/photos.json`);
  const [data, error] = [res.data.value, res.error.value];
  if (!data) {
    throw error!;
  }
  let cached = photoCache.get(data);
  if (!cached) {
    cached = data.groups.map((group) => {
      return {
        event: group.event,
        timestamp: new Date(group.timestamp),
        content: group.content,
        photos: group.photos.map((photo): Photo => {
          const file = photo.file.replace(/\..*$/, "");
          return {
            instructional: photo.instructional,
            caption: photo.caption,
            original: photo.file,
            corners: photo.corners,
            transforms: data.transforms.reduce((sizes, transform, index) => {
              const sizeRaw = photo.res[index];
              const size = {
                width: sizeRaw[0],
                height: sizeRaw[1],
              };
              sizes[transform.key] = transform.formats.reduce((formats, format) => {
                formats[format] = {
                  file: `${base}/${file}@${transform.key}.${format}`,
                  size,
                };
                return formats;
              }, {} as { [format: string]: PhotoTransform });
              return sizes;
            }, {} as { [key: string]: { [format: string]: PhotoTransform } }),
          };
        }),
      };
    });
    photoCache.set(data, cached);
  }
  return cached;
}

export function formatDate(timestamp: Date) {
  let date = new Date(timestamp);
  return date.toDateString();
}
