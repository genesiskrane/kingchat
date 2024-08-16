<template>
  <router-view></router-view>

</template>

<script setup>
import { provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  if (window.history.length > 1) router.back()
  else router.push({ path: '/home' })
}

provide('app', {
  back
})
</script>


