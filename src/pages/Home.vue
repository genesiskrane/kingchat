<template>
  <div>
    <h2 class="px-2">Active Users</h2>
    <div class="flex flex-col">
      <div v-for="(user, key) in activeUsers" :key="key">
        <router-link :to="getLink(user.profile.username)">
          <div class="flex flex-row px-2 py-2 gap-2">
            <div>
              <v-img
                :src="user.profile.photoURL"
                class="w-12 h-12 rounded-full"
                aspect-ratio="1"
              ></v-img>
            </div>
            <div class="grid items-center">
              <div>
                <span class="text-base underline">{{ user.profile.displayName }}</span>
              </div>
              <div>
                <span class="text-base">@{{ user.profile.username }}</span>
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
const activeUsers = computed(() => store.recent)

function getLink(username) {
  return {
    path: `/chat/${username}`
  }
}
</script>
