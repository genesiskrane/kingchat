<template>
  <div id="footer" class="flex flex-col">
    <template v-if="store.app.isLoggedIn">
      <div :class="{ more: isOpen }" class="border-2">
        <div class="">
          <ul>
            <li><span>Add Account</span></li>
            <li><span @click="logout()">Logout</span></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-row p-4 justify-between w-full max-w-full gap-2">
        <div>
          <router-link
            :to="{
              name: 'page',
              params: {
                username: user.username
              }
            }"
            class="flex flex-row flex-grow-0 overflow-hidden gap-2"
          >
            <div class="grid content-center">
              <v-img :src="user.photoURL" aspect-ratio="1" class="w-12 h-12 rounded-full"></v-img>
            </div>
            <div class="flex flex-col overflow-hidden">
              <div id="display-name" class="truncate">{{ user.displayName }}</div>
              <div id="username" class="truncate">@{{ user.username }}</div>
            </div>
          </router-link>
        </div>
        <div class="grid content-center">
          <v-img src="../assets/icons/more.svg" class="w-6 h-6" @click="toggleMenu()"></v-img>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAppStore } from '../../stores';

const store = useAppStore();
const user = reactive(store.user);
const isOpen = ref(true);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

async function logout() {
  await store.logout();
}
</script>

<style scoped>
.more {
  display: none;
}
</style>
