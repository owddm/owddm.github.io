<script lang="ts" setup>
import { ref, onMounted } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Group, PhotoTransform } from '~~/utils/photos';
import { SlideData } from 'photoswipe/dist/types/slide/zoom-level';

const props = defineProps<{
  galleryID: string;
  groups: Group[];
}>();

interface GroupItem {
  type: 'group';
  group: Group;
}

interface PhotoItem {
  type: 'photo';
  original: string;
  large: PhotoTransform;
  small: PhotoTransform;
}

type Item = GroupItem | PhotoItem;

const items: Item[] = [];
const indexByUrl: { [file: string]: number } = {}
const dataSource: SlideData[] = []
for (const group of props.groups) {
  items.push({ type: 'group', group });
  for (const photo of group.photos) {
    if (photo.instructional) {
      continue
    }
    indexByUrl[photo.original] = items.length
    dataSource.push({
      alt: photo.caption,
      w: photo.transforms.l.webp.size.width,
      h: photo.transforms.l.webp.size.height,
      src: photo.transforms.l.webp.file,
      msrc: photo.transforms.s.webp.file,
      original: photo.original
    })
    items.push(({
      type: 'photo',
      original: photo.original,
      large: photo.transforms.l.webp,
      small: photo.transforms.s.webp
    }));
  }
}

const imageContainer = ref<HTMLElement>();

function formatDate (date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

onMounted(() => {
  const lightBox = new PhotoSwipeLightbox({
    gallery: `#${props.galleryID}`,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    dataSource
  });
  let hash = document.location.hash
  const clearHash = () => {
    document.location.hash = hash = '#'
  }
  lightBox.on('close', () => clearHash())
  lightBox.on('change', (e) => {
    const data = lightBox.pswp?.currSlide?.data
    if (!data) {
      lightBox.pswp?.close()
      clearHash()
      return
    }
    // One is on click the other comes from loadAndOpen
    const current = data.original || data.element?.dataset['original']
    document.location.hash = hash = `#${current}`
  });
  lightBox.init();
  const openUrl = (hash: string) => {
    if (hash.startsWith("#")) {
      hash = hash.substring(1)
    }
    const index = indexByUrl[hash]
    if (index !== undefined) {
      lightBox.loadAndOpen(index, dataSource)
      // lightBox.loadAndOpen(index, null as any, null)
    }
  }
  openUrl(hash)
  const i = setInterval(() => {
    if (document.location.hash !== hash) {
      hash = document.location.hash;
      openUrl(hash);
    }
  }, 100)
  return () => {
    lightBox.destroy();
    clearInterval(i);
  };
});
</script>

<template>
  <div
    class="gallery-container"
    :id="galleryID"
    ref="imageContainer"
  >
    <div v-for="(item, key) in items" :key="key">
      <h2 v-if="item.type === 'group'">
        <span class="date">{{ formatDate(item.group.timestamp) }}</span>
        <span class="content" v-if="item.group.content">{{ item.group.content }}</span>
      </h2>
      <a
        v-else-if="item.type === 'photo'"
        :href="item.large.file"
        :data-pswp-width="item.large.size.width"
        :data-pswp-height="item.large.size.height"
        :data-original="item.original"
        target="_blank"
        rel="noreferrer"
        class="img-container-margin"
      >
        <img
          class="img-container"
          :src="item.small.file"
          alt=""
          :style="{
            width: `${item.small.size.width}px`,
            height: `${item.small.size.height}px`,
          }"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
}

.gallery-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-small);
  margin: 0 var(--space);
}

.img-container-margin {
  max-width: 100%;
  overflow: auto;
  position: relative;
  border-radius: var(--radius);
}
.img-container {
  width: 10rem;
  height: 10rem;
}
.gallery-container a {
  line-height: 0;
}

img {
  margin-top: auto;
  margin-bottom: auto;
}

img:hover {
  box-shadow: 0 0 150px 5px #aab6bd;
}
.content, .date {
  display: block;
  margin: 1em;
}
.date {
  font-weight: normal;
  color: #acacac;
  margin-bottom: 0;
}
.content {
  margin-top: 0;
}
</style>
