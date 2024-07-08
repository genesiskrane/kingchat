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

    <div id="footer" class="flex p-4 gap-4 mt-12">
      <div>
        <v-img
          src="../assets/img/avatar.png"
          aspect-ratio="1"
          class="w-12 h-12 rounded-full"
        ></v-img>
      </div>
      <div class="flex flex-col">
        <div>Lord God</div>
        <div>@_augment</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from './Navigation.vue'
</script>
