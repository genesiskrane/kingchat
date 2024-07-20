<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ room.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto flex flex-col justify-between h-full">
        <div class="bg-green-100">
          <div v-for="message in room.messages" :key="message" class="mx-2 my-4">{{ message }}</div>
        </div>

        <messenger></messenger>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import SideBar from '../components/SideBar.vue'
import Messenger from '../components/ui/Messenger.vue'

const store = useAppStore()
let drawer = ref(false)

const room = computed(() => store.app.rooms.active)
</script>
