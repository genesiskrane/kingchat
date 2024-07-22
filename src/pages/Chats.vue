<template>
  <div class="flex flex-col w-full">
    <div v-for="(chat, key) in chats" :key="key">
      <router-link :to="getLink(chat.username)">
        <div class="flex flex-row px-2 py-2 gap-2">
          <div>
            <v-img :src="chat.avatar" class="w-12 h-12 rounded-full" aspect-ratio="1"></v-img>
          </div>
          <div class="grid items-center">
            <div>
              <span class="text-base">{{ chat.username }}</span>
            </div>
            <div>
              <span class="text-sm">{{ chat.message }}</span>
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
const chats = computed(() => store.app.chats)
function getLink(username) {
  return {
    path: '/chat',
    query: {
      username
    }
  }
}
</script>
