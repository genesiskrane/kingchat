<template>
  <router-view></router-view>
</template>

<script setup>
import { useAppStore } from './stores/app'

const store = useAppStore()

store.init()
</script>
