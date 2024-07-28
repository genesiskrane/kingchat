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
      <v-container class="ma-0 pa-0 mx-auto flex flex-col justify-between h-full">
        <chat :chat="active"></chat>

        <messenger :to="to"></messenger>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../stores/app'

import Chat from '../components/Chat.vue'
import SideBar from '../components/SideBar.vue'
import Messenger from '../components/ui/Messenger.vue'

const store = useAppStore()
const route = useRoute()

let drawer = ref(false)

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

</script>
