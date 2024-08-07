<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="back()">
        <v-icon icon="mdi-keyboard-backspace"></v-icon>
      </v-app-bar-nav-icon>

      <v-avatar>
        <v-img :alt="game.name" :src="getImgURL(game.imgURL)"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <div>
          <p>
            <span> {{ game.name }}</span>
            <br />
            <span class="text-xs" v-if="store.user.displayName">
              @{{ store.user.displayName }}
            </span>
          </p>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto h-full">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { inject } from 'vue'
import { useAppStore } from '@/stores'
import { useRoute } from 'vue-router'

const { back } = inject('app')

const route = useRoute()
const store = useAppStore()

let paths = route.path.split('/')
let gameID = paths[paths.length - 1]

const game = store.games.find((game) => game.id == gameID)

const getImgURL = (imgURL) => `../${imgURL}`
</script>
