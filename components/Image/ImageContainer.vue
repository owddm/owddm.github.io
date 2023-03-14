<script lang="ts" setup>
import { ref, onMounted } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

interface Props {
  galleryID: string;
  imagesData: ImageData[];
  title: string;
}

interface ImageData {
  url: string;
  thumbnailURL: string;
  width?: number;
  height?: number;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

const props = defineProps<Props>();

const imageContainer = ref<HTMLElement>();

let isDown: boolean = false;
let startX: number;
let scrollLeft: number;

const onMouseDown = (event: MouseEvent) => {
  isDown = true;
  const $imageContainer = imageContainer.value!;
  $imageContainer.classList.add("active");
  startX = event.pageX - $imageContainer.offsetLeft;
  scrollLeft = $imageContainer.scrollLeft;
};

const onMouseLeave = () => {
  isDown = false;
  const $imageContainer = imageContainer.value!;
  $imageContainer.classList.remove("active");
};

const onMouseUp = () => {
  isDown = false;
  const $imageContainer = imageContainer.value!;
  $imageContainer.classList.remove("active");
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDown) return;
  event.preventDefault();

  const $imageContainer = imageContainer.value!;

  const x = event.pageX - $imageContainer.offsetLeft;
  const shift = (x - startX) * 2; //* scroll speed

  $imageContainer.scrollLeft = scrollLeft - shift;
};

const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();

  const $imageContainer = imageContainer.value!;

  const { deltaX: x, deltaY: y } = event;
  let magnitude: number;

  //* Still allow touch pad navigation to work.
  if (x === 0) {
    magnitude = y > 0 ? 30 : -30;
  } else {
    magnitude = x;
  }

  $imageContainer.scrollBy({
    left: magnitude,
  });
};

onMounted(() => {
  const lightBox = new PhotoSwipeLightbox({
    gallery: "#" + props.galleryID,
    children: "a",
    pswpModule: () => import("photoswipe"),
  });

  lightBox.init();

  return () => {
    lightBox.destroy();
  };
});
</script>

<template>
  <h3>{{ title }}</h3>
  <div
    class="gallery-container"
    :id="galleryID"
    ref="imageContainer"
    @mousedown="onMouseDown"
    @mouseleave="onMouseLeave"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @wheel="onMouseWheel"
  >
    <a
      v-for="(image, key) in imagesData"
      :key="key"
      :href="image.url"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
      class="img-container-margin"
    >
      <img
        class="img-container"
        :src="image.thumbnailURL"
        alt=""
        :style="{
          width: `${image.thumbnailWidth}px`,
          height: `${image.thumbnailHeight}px`,
        }"
      />
    </a>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
}

.gallery-container {
  cursor: grab;
  overflow: auto;
}

.img-container {
  width: 10rem;
  height: 10rem;
}

.img-container-margin:not(:first-child) {
  margin-left: 2rem;
}

img {
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 5%;
}

img:hover {
  box-shadow: 0 0 150px 5px #aab6bd;
}

div {
  padding: 1rem;
  border-radius: 10px;
}
</style>
