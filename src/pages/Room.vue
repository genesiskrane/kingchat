<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="back()">
        <v-icon icon="mdi-keyboard-backspace"></v-icon>
      </v-app-bar-nav-icon>

      <v-avatar>
        <v-img :alt="room.name" :src="room.imgURL"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <div>
          <p>
            <span> {{ room.name }} {{ room.number }}</span>
          </p>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto flex flex-col justify-between h-full">
        <bubbles :chat="room"></bubbles>

        <messenger :to="room"></messenger>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useAppStore } from '../stores'

const { back } = inject('app')

// Components
import SideBar from '../components/app/SideBar.vue'
import Messenger from '../components/ui/Messenger.vue'
import Bubbles from '@/components/room/Bubbles.vue'

const store = useAppStore()
const drawer = ref(false)

const room = computed(() => {
  let room = store.rooms.active
  room.type = 'Room'
  return room
})
</script>
