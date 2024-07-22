<template>
  <div>
    <h2>Active Users</h2>
    <div class="flex flex-col">
      <div v-for="(user, key) in activeUsers" :key="key">
        <router-link :to="getLink(user.username, user.chatid)">
          <div class="flex flex-row px-2 py-2 gap-2">
            <div>
              <v-img :src="user.photoURL" class="w-12 h-12 rounded-full" aspect-ratio="1"></v-img>
            </div>
            <div class="grid items-center">
              <div>
                <pre>{{ user }}</pre>
                <span class="text-base underline">{{ user.displayName }}</span>
              </div>
              <div>
                <span class="text-base">@{{ user.username }}</span>
              </div>
              <div>
                <span class="text-sm">Click To Chat</span>
              </div>
            </div>
          </div>
        </router-link>

        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const activeUsers = computed(() => store.app.online)

function getLink(username) {
  return {
    path: `/chat/${username}`
  }
}
</script>
