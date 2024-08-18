<template>
  <div id="app">
    <v-app>
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
              <span class="text-xs" v-if="store.user.username"> @{{ store.user.username }} </span>
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
    <div>
      <div class="card flex justify-center">
        <Button label="Check" icon="pi pi-check" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useAppStore } from '../../stores';
import { useRoute } from 'vue-router';

const { back } = inject('app');

const route = useRoute();
const store = useAppStore();

let paths = route.path.split('/');
let gameID = paths[paths.length - 1];

const game = store.games.find((game) => game.id == gameID);

const getImgURL = (imgURL) => `../${imgURL}`;
</script>
