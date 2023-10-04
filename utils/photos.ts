export type Resolutions = [width: number, height: number][];
export type Corners = [topLeft: string, topRight: string, bottomLeft: string, bottomRight: string];
export interface PhotoRaw {
  instructional?: boolean;
  caption?: string;
  file: string;
  res: Resolutions;
  corners: Corners;
}

interface GroupRaw {
  content?: string;
  event: string;
  photos: PhotoRaw[];
  timestamp: number;
}

export interface PhotoGroup {
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
  corners: Corners;
  transforms: {
    [key: string]: {
      [format: string]: PhotoTransform;
    };
  };
}

const photoCache = new WeakMap<PhotosRaw, PhotoGroup[]>();

export function preparePhoto(photoRaw: PhotoRaw, transforms: Transform[]): Photo {
  const file = photoRaw.file.replace(/\..*$/, "");
  return {
    instructional: photoRaw.instructional,
    caption: photoRaw.caption,
    original: photoRaw.file,
    corners: photoRaw.corners,
    transforms: transforms.reduce((sizes, transform, index) => {
      const sizeRaw = photoRaw.res[index];
      const size = {
        width: sizeRaw[0],
        height: sizeRaw[1],
      };
      sizes[transform.key] = transform.formats.reduce((formats, format) => {
        formats[format] = {
          file: getSitePath(`/${file}@${transform.key}.${format}`),
          size,
        };
        return formats;
      }, {} as { [format: string]: PhotoTransform });
      return sizes;
    }, {} as { [key: string]: { [format: string]: PhotoTransform } }),
  };
}

function transform(raw: any) {
  const data = raw as PhotosRaw;
  return data.groups.map((group) => {
    return {
      event: group.event,
      timestamp: new Date(group.timestamp),
      content: group.content,
      photos: group.photos.map((photoRaw) => preparePhoto(photoRaw, data.transforms)),
    };
  });
}

export const usePhotos = () => useLazyFetch(getSitePath("/photos.json"), { transform });
