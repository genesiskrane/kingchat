<template>
  <div>
    <div class="flex flex-col">
      <div v-for="(post, i) in posts" :key="i">
        {{ post.author.displayName }} <br />
        {{ post.text }}

        <hr />
      </div>
    </div>

    <speed-dial></speed-dial>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '../stores';
import SpeedDial from '../components/ui/SpeedDial.vue';

const store = useAppStore();
const posts = computed(() => store.posts);
</script>
