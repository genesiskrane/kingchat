<template>
  <div class="p-2 bg-blue-500" :style="{ background: themeColors.darken3 }">
    <img src="../../assets/img/icon-white.svg" class="w-20 h-20 mx-auto rounded-2x" />
  </div>
</template>

<script setup>
import { inject } from 'vue';

const themeColors = inject('theme');
</script>
