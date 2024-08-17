<template>
  <div class="h-full w-full absolute" ref="container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createArena } from '.'

const container = ref(null)

onMounted(() => {
  createArena(container)
})
</script>
