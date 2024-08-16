<template>
  <div id="sidebar" class="flex flex-col justify-between h-screen">
    <div>
      <header class="flex px-4 py-8 gap-4">
        <logo></logo>
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
import Logo from './Logo.vue'
import Navigation from './Navigation.vue'
import AppFooter from './Footer.vue'
</script>
