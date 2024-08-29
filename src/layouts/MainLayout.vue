<template>
  <v-app class="min-h-screen">
    <keep-alive>
      <v-navigation-drawer v-model="drawer">
        <side-bar></side-bar>
      </v-navigation-drawer>
    </keep-alive>

    <v-app-bar :elevation="2" color="red-darken-1" :style="{ top: appBarTop + 'px' }">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <div class="flex flex-row justify-between px-2">
          <div class="grid items-center">
            <span class="capitalize">{{ pageName || route.name }}</span>
          </div>
          <div v-if="!store.app.isLoggedIn">
            <v-btn id="login" @click="router.push('/auth/login')">
              <span class="">Login</span>
            </v-btn>
          </div>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="container h-full ma-0 pa-0 mx-auto relative">
        <router-view v-slot="{ Component }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </transition>
        </router-view>

        <!-- <bottom-navigation></bottom-navigation> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '../stores';
import SideBar from '../components/ui/SideBar.vue';

import { useEventBus } from '@vueuse/core';

const bus = useEventBus('pageTitle');

// import BottomNavigation from '../components/BottomNavigation.vue'

const store = useAppStore();
const route = useRoute();
const router = useRouter();

const pageName = ref(null);
let drawer = ref(false);

let lastScrollY = ref(0);
let appBarTop = ref(0);

function updatePageTitle(name) {
  pageName.value = name;
}

bus.on(updatePageTitle);

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

function handleScroll() {
  const currentScrollY = window.scrollY;
  const appBarHeight = 64;

  if (currentScrollY > lastScrollY.value && currentScrollY > 10) appBarTop.value = -appBarHeight;
  else if (currentScrollY < lastScrollY.value || currentScrollY <= 10) appBarTop.value = 0;

  lastScrollY.value = currentScrollY;
}
</script>

<style scoped>
.v-app-bar {
  transition: top 0.3s ease-in-out;
}
.container > div {
  height: 100%;
}
</style>
