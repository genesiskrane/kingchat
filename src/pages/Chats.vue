<template>
  <div class="flex flex-col w-full relative">
    <div v-for="(chat, key) in chats" :key="key">
      <router-link :to="getLink(chat.profile.username)">
        <div class="flex flex-row px-2 py-2 gap-2">
          <div>
            <v-img
              :src="chat.profile.photoURL"
              class="w-12 h-12 rounded-full"
              aspect-ratio="1"
            ></v-img>
          </div>
          <div class="grid items-center w-full">
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
                    <v-badge color="primary" :content="chat.unread" inline></v-badge>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <hr />
    </div>
    <div id="add-post" class="fixed bottom-0 right-0 mr-6 mb-6">
      <router-link :to="{ name: 'new', params: { username: user.username } }">
        <v-btn icon="mdi-plus" color="red" size="default"></v-btn>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { useAppStore } from '../stores';

const store = useAppStore();

const chats = computed(() => store.chats);
const user = store.user;
onUnmounted(() => console.log('Chats Just Unmounted'));
function getLink(username) {
  return {
    path: `/chat/${username}`
  };
}
</script>
