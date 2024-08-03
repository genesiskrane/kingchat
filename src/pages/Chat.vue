<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-avatar>
        <v-img alt="John" :src="active.profile.photoURL"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <span>
          {{ active.profile.displayName }}
        </span>
        <span class="text-xs"> @{{ active.profile.username }} </span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto h-full">
        <chat :active="active" :to="to"></chat>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'

import SideBar from '../components/SideBar.vue'
import Chat from '../components/Chat.vue'

const drawer = ref(false)

import { useRoute } from 'vue-router'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const route = useRoute()

const origin = route.query.origin
let array

switch (origin) {
  case '/home':
    array = 'recent'
    break
  case '/chats':
    array = 'chats'
    break
}

let active = reactive(store[array].find((user) => user.profile.username == route.params.username))
const to = reactive({
  type: 'Chat',
  chatid: active._id || active.chatid
})
console.log(active)
</script>
