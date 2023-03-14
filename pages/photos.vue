<template>
  <div v-for="(_item, index) in photoPayload">
    <ImageGallery galleryID="item" :imagesData="photoPayload[index].images" :title="formatDate(groups[index].timestamp)" />
  </div>
</template>

<script setup lang="ts">
import { formatDate, convertPhotoToSmall } from "../utils/utils";

interface Photo {
  file: string;
  res: number[][];
  corners?: string[];
}

interface Event {
  event: string;
  photos: Photo[];
  timestamp: Date;
}

const { data: photoData } = await useFetch("https://owddm.github.io/public/photos.json");

const baseURL = "https://owddm.github.io/public/";

let groups: Event[] = (photoData as any).value.groups;

// Create Deep Copy
let photoPayload = Object.assign(groups);

let photoImageData = groups;
photoImageData = groups.sort((a: Event, b: Event) => +b.timestamp - +a.timestamp);

// Add an `images` array property to each item in the original array.
photoPayload.forEach((_element: HTMLElement, index: number) => {
  photoPayload[index].images = [];
});

// Create new nested array to contain an array of Photos in the form [{Photo}]
photoImageData.map((event: Event, index: number) => {
  event.photos.forEach((photo: Photo) => {
    let image = {
      url: `${baseURL}${photo.file}`,
      thumbnailURL: `${baseURL}${convertPhotoToSmall(photo.file)}`,
      width: photo.res[0][0],
      height: photo.res[0][1],
      thumbnailWidth: photo.res[2][0],
      thumbnailHeight: photo.res[2][1],
    };
    photoPayload[index].images.push(image);
  });
});
</script>

<script lang="ts">
import ImageGallery from "../components/Image/ImageContainer";

export default {
  name: "Photos",
  components: {
    ImageGallery,
  },
};
</script>
