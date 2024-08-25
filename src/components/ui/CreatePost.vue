<template>
  <div class="absolute top-0 h-screen bg-[#ffffff70] w-full">
    <v-container class="bg-white flex flex-col gap-4 h-full">
      <div class="flex flex-row justify-between w-full">
        <v-icon @click="emit('toggle-modal', !showModal)">mdi-close</v-icon>
        <v-btn density="compact" rounded flat color="green" @click="post">Post</v-btn>
      </div>
      <div class="flex items-center justify-start gap-2">
        <img :src="user.profile.photoURL" class="w-8 h-8 rounded-full" />
        <v-btn class="border border-blue" flat density="compact">Everyone</v-btn>
      </div>
      <div id="text-box" class="h-[50%]" contenteditable="true" ref="whatsHappening">
        What's happening?
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../../stores';

const emit = defineEmits(['toggle-modal', 'notify']);
const store = useAppStore();

const showModal = defineProps(['show-modal']);
const user = store.user;

const whatsHappening = ref(null);

async function post() {
  const text = whatsHappening.value.innerText.trim();

  const post = { text, time: Date.now(), author: user.uid };
  const isPosted = await store.createPost(post);
  if (isPosted) {
    emit('toggle-modal', !showModal);
    emit('notify', 'New Post Shared', 300);
  }
}
</script>
