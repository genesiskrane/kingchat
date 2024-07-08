<template>
  <v-responsive class="border rounded" max-height="300">
    <v-app>
      <v-navigation-drawer>
        <side-bar></side-bar>
      </v-navigation-drawer>

      <v-app-bar title="King Chat"></v-app-bar>

      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
</script>

<style></style>
