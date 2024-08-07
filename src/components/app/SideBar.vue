<template>
  <div id="sidebar" class="flex flex-col justify-between h-screen">
    <div>
      <header class="flex px-4 py-8 gap-4">
        <div class="p-2 bg-red-500 rounded-2xl">
          <v-img
            class="w-20 h-20 "
            src="../assets/img/icon-black.svg"
            aspect-ratio="1"
          ></v-img>
        </div>
        <div class="grid items-center">
          <span class="">King Chat</span>
        </div>
      </header>
      <hr />
      <navigation></navigation>
    </div>

    <div>
      <hr class="mt-12" />
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script setup>
import Navigation from '../ui/Navigation.vue'
import AppFooter from '../ui/Footer.vue'
</script>
