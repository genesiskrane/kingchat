<template>
  <v-responsive class="border rounded" max-height="300">
    <v-app>
      <v-navigation-drawer v-model="drawer">
        <side-bar></side-bar>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" color="red-darken-1">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>Application Bar</v-app-bar-title>
      </v-app-bar>

      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue'

let drawer = ref(false)
</script>
