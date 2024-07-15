<template>
  <div id="footer" class="flex flex-col mt-12">
    <div :class="{ more: isOpen }" class="border-2">
      <div class="">
        <ul>
          <li><span>Add Account</span></li>
          <li><span @click="logout()">Logout</span></li>
        </ul>
      </div>
    </div>
    <div class="flex p-4 justify-between">
      <div class="flex gap-4">
        <v-img
          src="../assets/img/avatar.png"
          aspect-ratio="1"
          class="w-12 h-12 rounded-full"
        ></v-img>
        <div class="flex flex-col">
          <div>Lord God</div>
          <div>@_augment</div>
        </div>
      </div>
      <div class="grid content-center">
        <div>
          <v-img src="../assets/icons/more.svg" class="w-6 h-6" @click="toggleMenu()"></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const isOpen = ref(true)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function logout() {
  store.logout()
}
</script>

<style scoped>
.more {
  display: none;
}
</style>
