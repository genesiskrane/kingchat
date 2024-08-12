<template>
  <v-app class="h-screen">
    <keep-alive>
      <v-navigation-drawer v-model="drawer">
        <side-bar></side-bar>
      </v-navigation-drawer>
    </keep-alive>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <div class="flex flex-row justify-between px-2">
          <div class="grid items-center">
            <span class="capitalize">{{ route.name }}</span>
          </div>
          <div v-if="!store.app.isLoggedIn">
            <v-btn id="login" @click="router.push('/auth/login')">
              <span class="">Login</span>
            </v-btn>
            <v-btn id="signup" @click="router.push('/auth/signup')"> SignUp </v-btn>
          </div>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="container h-full ma-0 pa-0 mx-auto">
        <router-view></router-view>

        <!-- <bottom-navigation></bottom-navigation> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores'
import SideBar from '../components/app/SideBar.vue'
// import BottomNavigation from '../components/BottomNavigation.vue'

const store = useAppStore()
const route = useRoute()
const router = useRouter()

let drawer = ref(false)
</script>

<style scoped>
.container > div {
  height: 100%;
}
</style>
