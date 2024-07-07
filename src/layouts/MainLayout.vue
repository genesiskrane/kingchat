<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> King Chat </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="flex flex-col justify-between fit">
        <div>
          <div class="flex q-px-md q-py-lg bg-red-5">
            <div>
              <q-img
                src="../assets/img/logo.png"
                class="w-20 h-20 rounded-full"
              />
            </div>
            <div class="items-center q-mx-md grid">
              <span class="">King Chat</span>
            </div>
          </div>

          <navigation class="py-4"></navigation>
        </div>
        <div id="footer" class="flex p-4 gap-4">
          <div>
            <q-avatar>
              <img src="../assets/img/avatar.png" />
            </q-avatar>
          </div>
          <div class="flex flex-col">
            <div>Lord God</div>
            <div>@_augment</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<script setup>
import Navigation from "../components/Navigation.vue";
</script>
