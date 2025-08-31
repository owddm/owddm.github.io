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

export type PhotoSize = "l" | "m" | "s";
export type PhotoFormat = "jpg" | "webp";

export interface Transform {
  key: PhotoSize;
  formats: PhotoFormat[];
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
  caption?: string;
  file: string;
  size: {
    width: number;
    height: number;
  };
}

export type FormatSet = {
  [format in PhotoFormat]: PhotoTransform;
};

export type TransformSet = {
  [size in PhotoSize]: FormatSet;
};

export interface Photo {
  caption?: string;
  instructional?: boolean;
  original: string;
  corners: Corners;
  transforms: TransformSet;
}

export function preparePhoto(photoRaw: PhotoRaw, transforms: Transform[]): Photo {
  const file = photoRaw.file.replace(/\..*$/, "");
  return {
    instructional: photoRaw.instructional ?? false,
    caption: photoRaw.caption ?? "",
    original: photoRaw.file,
    corners: photoRaw.corners,
    transforms: transforms.reduce((sizes, transform, index) => {
      const sizeRaw = photoRaw.res[index];
      const size = {
        width: sizeRaw?.[0] ?? 0,
        height: sizeRaw?.[1] ?? 0,
      };
      sizes[transform.key] = transform.formats.reduce((formats, format) => {
        formats[format] = {
          file: `https://public.oktech.jp/${file}@${transform.key}.${format}`,
          size,
        };
        return formats;
      }, {} as FormatSet);
      return sizes;
    }, {} as TransformSet),
  };
}

export function transform(raw: any): PhotoGroup[] {
  const data = raw as PhotosRaw;
  return data.groups.map((group): PhotoGroup => {
    return {
      event: group.event,
      timestamp: new Date(group.timestamp),
      content: group.content ?? "",
      photos: group.photos.map((photoRaw) => preparePhoto(photoRaw, data.transforms)),
    };
  });
}

export const fetchPhotos = async () => await (await fetch("https://public.oktech.jp/photos.json")).json();
