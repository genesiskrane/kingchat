<template>
  <div class="py-4">
    <div class="grid grid-cols-3 gap-y-6">
      <div v-for="(genre, i) in store.bookStore.genres" :key="i" class="text-center px-4">
        <router-link :to="`/books/${genre.id}`">
          <div>
            <div>
              <img
                class="rounded-sm mx-auto w-full"
                :src="genre.photoURL"
                :alt="genre.name + '\'s image'"
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
import { useAppStore } from '../../stores';

const store = useAppStore();
</script>
