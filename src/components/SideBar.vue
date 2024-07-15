<template>
  <div id="sidebar" class="flex flex-col justify-between h-screen">
    <div>
      <header class="flex px-4 py-8 gap-4">
        <div>
          <v-img
            src="../assets/img/logo.png"
            aspect-ratio="1"
            class="w-20 h-20 rounded-full"
          ></v-img>
        </div>
        <div class="grid items-center">
          <span class="">King Chat</span>
        </div>
      </header>
      <navigation></navigation>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script setup>
import Navigation from './Navigation.vue'
import AppFooter from './Footer.vue'
</script>
