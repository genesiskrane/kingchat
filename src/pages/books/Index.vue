<template>
  <div class="py-4">
    <div class="grid grid-cols-3 gap-y-6">
      <div v-for="(genre, i) in store.bookStore.genres" :key="i" class="text-center px-4">
        <router-link :to="`/books/${genre.id}`">
          <div>
            <div class="bg-[#56b0f24f] w-full aspect-square">
              <img
                class="rounded-sm mx-auto object-cover"
                :class="{ loaded: loadedImages[i] }"
                :src="genre.photoURL"
                :alt="genre.name + '\'s image'"
                @load="handleImageLoad(i)"
                @error="handleImageError(i)"
              />
            </div>
            <span class="name text-sm font-semibold"> {{ genre.name }} ({{ genre.count }})</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAppStore } from '../../stores';

const store = useAppStore();

const loadedImages = reactive([]);
const handleImageLoad = (i) => (loadedImages[i] = true);
const handleImageError = (i) => (loadedImages[i] = false);
</script>

<style scoped>
img {
  display: none;
}

img.loaded {
  display: block;
}
</style>
