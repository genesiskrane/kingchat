<template>
  <div>
    <p class="mb-8">Genres</p>
    <ul>
      <li v-for="(genre, i) in store.bookStore.genres" :key="i">{{ i + 1 }}) {{ genre.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useAppStore } from '../../stores'

const store = useAppStore()
</script>
