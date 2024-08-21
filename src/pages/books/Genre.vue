<template>
  <v-app>
    <v-app-bar :elevation="2" color="red-darken-1">
      <v-app-bar-nav-icon @click="back()">
        <v-icon icon="mdi-keyboard-backspace"></v-icon>
      </v-app-bar-nav-icon>

      <v-avatar>
        <v-img :alt="genre.name" :src="genre.photoURL"></v-img>
      </v-avatar>

      <v-app-bar-title>
        <div>
          <p>
            <span> {{ genre.name }} </span>
          </p>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0 pa-0 mx-auto flex flex-col justify-between h-full">
        <div class="py-4">
          <div class="grid grid-cols-3 gap-y-6">
            <div v-for="(book, i) in books" :key="i" class="text-center px-4">
              <router-link :to="`../book/` + book._id">
                <div>
                  <div>
                    <img
                      class="rounded-sm mx-auto w-full"
                      :src="book.coverURL"
                      :alt="`${book.title}'s Image`"
                    />
                  </div>
                  <span class="name text-sm font-semibold"> {{ book.title }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../../stores';

const { back } = inject('app');

const store = useAppStore();
const route = useRoute();

const genreID = route.params.genre;

const genre = store.bookStore.genres.find((genre) => genre.id == genreID);
const books = store.bookStore.books.filter((book) => book.genres.includes(genre.name));
</script>
