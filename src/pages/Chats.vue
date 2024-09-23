<template>
  <div class="flex flex-col w-full">
    <div v-for="(chat, key) in chats" :key="key" v-ripple>
      <div class="flex flex-row px-2 py-2 gap-2">
        <div>
          <router-link :to="getProfileLink(chat.profile.username)">
            <v-img
              :src="chat.profile.photoURL"
              class="w-12 h-12 rounded-full"
              aspect-ratio="1"
            ></v-img>
          </router-link>
        </div>
        <div class="grid items-center w-full">
          <router-link :to="getChatLink(chat.profile.username)">
            <div class="flex flex-row justify-between">
              <div id="preview">
                <div>
                  <span class="text-base">{{ chat.profile.displayName }}</span>
                </div>
                <div>
                  <span class="text-sm">{{ chat.lastMessage.message }}</span>
                </div>
              </div>
              <div class="grid items-center">
                <div>
                  <span class="text-xs">{{ chat.lastMessage.displayTime }}</span>
                </div>
                <div class="text-center">
                  <span class="text-xs">
                    <v-badge color="black" :content="chat.unread" inline></v-badge>
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <hr />
    </div>
    <speed-dial v-if="store.app.isLoggedIn"></speed-dial>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useAppStore } from '../stores';
import SpeedDial from '../components/ui/SpeedDial.vue';


const store = useAppStore();

const chats = computed(() => store.chats);

function getChatLink(username) {
  return {
    path: `/chat/${username}`
  };
}

function getProfileLink(username) {
  return {
    path: `/${username}`
  };
}
</script>
