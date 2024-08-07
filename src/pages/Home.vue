<template>
  <div>
    <h2 class="px-2">Active Users</h2>
    <div class="flex flex-col">
      <template v-for="(category, categoryKey) in [onlineUsers, recentUsers]" :key="categoryKey">
        <div v-for="(user, key) in category" :key="key">
          <router-link :to="getLink(user.profile.username)">
            <div class="flex flex-row px-2 py-2 gap-2">
              <div>
                <v-img
                  :src="user.profile.photoURL"
                  class="w-12 h-12 rounded-full"
                  aspect-ratio="1"
                ></v-img>
              </div>
              <div class="grid items-center w-full">
                <div class="flex flex-row justify-between">
                  <div class="profile">
                    <div>
                      <span class="text-base">{{ user.profile.displayName }}</span>
                    </div>
                    <div>
                      <span class="text-xs">@{{ user.profile.username }}</span>
                    </div>
                  </div>

                  <div v-if="categoryKey == 0" class="presence grid relative px-4 items-center">
                    <div class="circle"></div>
                    <div class="ringring"></div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>

          <hr />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores'

const store = useAppStore()
const onlineUsers = computed(() => store.online)
const recentUsers = computed(() => store.recent)

function getLink(username) {
  return {
    path: `/chat/${username}`
  }
}
</script>

<style scoped>
.circle {
  position: relative;
  width: 7.5px;
  height: 7.5px;
  background-color: #62bd19;
  border-radius: 50%;
}

.ringring {
  position: absolute;
  border: 3px solid #62bd19;
  border-radius: 30px;
  height: 15px;
  width: 15px;
  animation: pulsate 2.5s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
  inset: 0;
  margin: auto;
}

@keyframes pulsate {
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
}
</style>
