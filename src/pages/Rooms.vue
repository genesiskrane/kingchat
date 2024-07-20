<template>
  <div id="rooms" class="flex flex-col px-2">
    <div class="mb-2">
      <span class="text-xl">Select a room to join:</span>
    </div>
    <div v-for="room in rooms.all" :key="room" class="w-full">
      <router-link :to="getLink(room)">
        <div class="flex flex-row px-2 py-2 gap-2">
          <div class="grid items-center">
            <v-img :src="room.imgURL" class="w-12 h-12" aspect-ratio="1"></v-img>
          </div>
          <div class="grid items-center">
            <div>
              <span class="text-base font-semibold">{{ room.name }}</span>
            </div>
            <div>
              <span class="text-sm">{{ room.desc }}</span>
            </div>
          </div>
        </div>
      </router-link>

      <hr />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const rooms = computed(() => store.app.rooms)

function getLink(room) {
  return `/rooms/${room.id}?name=${room.name}&id=${room.id}`
}
</script>
