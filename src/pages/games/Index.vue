<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-2 gap-4 py-2 px-2">
      <div v-for="(game, key) in games" :key="key" class="grid text-center">
        <router-link :to="getURL(game.id)">
          <v-img :src="game.imgURL" class="w-20 h-20 m-auto"></v-img>
          <span>
            {{ game.name }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores'
import games from '@/games'

const store = useAppStore()

function getURL(id) {
  const gameURL = '/games/' + id
  return gameURL
}
</script>
