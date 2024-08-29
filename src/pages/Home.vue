<template>
  <div>
    <div class="flex flex-col px-2 py-2">
      <div v-for="(post, i) in posts" :key="i" class="clearfix">
        <div class="py-2">
          <v-img
            :src="post.author.photoURL"
            :alt="post.author.displayName + '\'s DP'"
            class="w-12 h-12 rounded-full float-left m-1"
          ></v-img>
          <div>
            <span class="font-semibold">{{ post.author.displayName }}</span>
            &nbsp;
            <span class="text-xs"
              >@{{ post.author.username }} &#8226; {{ timeAgo(post.createdAt) }}</span
            >
          </div>
          <p>
            {{ post.text }}
          </p>
        </div>
        <hr />
      </div>
    </div>

    <speed-dial></speed-dial>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useAppStore } from '../stores';
import SpeedDial from '../components/ui/SpeedDial.vue';

const { timeAgo } = inject('app');

const store = useAppStore();
const posts = computed(() => store.posts);
</script>
