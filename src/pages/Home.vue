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

                  <div v-if="categoryKey == 0" class="presence">
                    <div class="ringring"></div>
                    <div class="circle"></div>
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
import { useAppStore } from '../stores/app'

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
  width: 15px;
  height: 15px;
  background-color: #62bd19;
  border-radius: 50%;
  top: 23px;
  left: 23px;
}

.ringring {
  border: 3px solid #62bd19;
  border-radius: 30px;
  height: 25px;
  width: 25px;
  float: left;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
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
