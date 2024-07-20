<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ route.query.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto">
        <router-view></router-view>

        <bottom-navigation></bottom-navigation>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '../components/SideBar.vue'
import BottomNavigation from '../components/BottomNavigation.vue'

const route = useRoute()

let drawer = ref(false)
</script>
