<template>
  <div class="flex flex-col w-full">
    <div v-for="(chat, key) in chats" :key="key">
      <router-link :to="getLink(chat.recipient.username)">
        <div class="flex flex-row px-2 py-2 gap-2">
          <div>
            <v-img
              :src="chat.recipient.photoURL"
              class="w-12 h-12 rounded-full"
              aspect-ratio="1"
            ></v-img>
          </div>
          <div class="grid items-center w-full">
            <div class="flex flex-row justify-between">
              <div id="preview">
                <div>
                  <span class="text-base">{{ chat.recipient.displayName }}</span>
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
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const router = useRouter()

const chats = computed(() => store.app.chats)

watch(store.app.user, (user) => {
  console.log(user)
  // if (user) router.push('/')
})
function getLink(username) {
  return {
    path: `/chat/${username}`
  }
}
</script>
