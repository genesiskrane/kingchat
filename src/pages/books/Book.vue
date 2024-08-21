<template>
  <v-app>
    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="back()">
        <v-icon icon="mdi-keyboard-backspace"></v-icon>
      </v-app-bar-nav-icon>

      <v-avatar>
        <v-img :alt="book.name" :src="book.coverURL"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <div>
          <p>
            <span> {{ book.title }} </span>
          </p>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto flex flex-col justify-between h-full">
        <div class="py-4 px-1">
          <div class="grid grid-cols-2 gap-x-4">
            <div id="cover">
              <img
                class="rounded-sm mx-auto w-full"
                :src="book.coverURL"
                :alt="`${book.title}'s Image`"
              />
            </div>

            <div id="info">
              <h2 class="font-bold text-3xl">{{ book.title }}</h2>
              <h6 v-if="book.subTitle">{{ book.subTitle }}</h6>

              <div id="author">
                <span class="font-bold text-red-400">By {{ book.author }}</span>
              </div>

              <div class="py-6"><v-btn flat color="red">Read</v-btn></div>
            </div>
          </div>
          <div>
            {{ book.excerpt }}
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../stores';

const { back } = inject('app');

const store = useAppStore();
const route = useRoute();

const bookID = route.params.bookID;

const book = store.bookStore.books.find((book) => book._id == bookID);
</script>
