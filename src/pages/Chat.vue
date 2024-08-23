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
        <v-img :alt="active.profile.displayName" :src="active.profile.photoURL"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <router-link :to="'../' + active.profile.username">
          <div>
            <p>
              <span> {{ active.profile.displayName }}</span>
              <br />
              <span class="text-xs">@{{ active.profile.username }} </span>
            </p>
          </div>
        </router-link>
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
import { ref, reactive, onUnmounted, inject } from 'vue';

import SideBar from '../components/ui/SideBar.vue';
import Chat from '../components/chat/Chat.vue';

const drawer = ref(false);

import { useRoute } from 'vue-router';
import { useAppStore } from '../stores';

const { back } = inject('app');

const store = useAppStore();
const route = useRoute();

const origin = route.query.origin;
let array;

switch (origin) {
  case '/home':
    array = 'recent';
    break;
  case '/chats':
    array = 'chats';
    break;
}

let active = store['chats'].find((user) => user.profile.username == route.params.username);

if (!active) {
  let { _id, profile } = store[array].find(
    (user) => user.profile.username == route.params.username
  );
  console.log(_id, profile);
  active = store.createNewChat(_id, profile);
}

const to = reactive({
  type: 'Chat',
  chatid: active._id
});

onUnmounted(() => {
  store.chats = store.chats.filter((chat) => chat.messages.length > 0);
});
</script>
