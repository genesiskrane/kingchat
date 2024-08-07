<template>
  <div class="grid grid-cols-2 gap-4 w-full">
    <div v-for="(game, key) in games" :key="key" class="grid text-center">
      <v-img :src="game.imgURL"></v-img>
      <span>
        {{ game.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAppStore } from '@/stores'

const store = useAppStore()

const games = reactive([{ name: 'Ludo', imgURL:'./assets/img/' }, { name: 'Dice Merge' }, { name: 'Chess' }])
</script>
