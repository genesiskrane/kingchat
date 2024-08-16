<template>
  <div class="h-full" ref="container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createArena } from '.'

const container = ref(null)

onMounted(() => {
  createArena(container)
})
</script>
