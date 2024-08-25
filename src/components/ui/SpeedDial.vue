<template>
  <v-snackbar
    v-model="notification"
    top
    :timeout="5000"
    transition="slide-y-reverse-transition"
    class="text-white"
  >
    {{ notificationMessage }}
  </v-snackbar>

  <div id="add-post" class="fixed bottom-0 right-0 mr-6 mb-6">
    <v-btn icon="mdi-plus" color="red" size="default" @click="toggleModal(!showModal)"></v-btn>
  </div>

  <transition name="slide-up">
    <create-post
      v-if="showModal"
      :show-modal="showModal"
      @toggle-modal="toggleModal"
      @notify="notify"
    ></create-post>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';

import CreatePost from './CreatePost.vue';

const bus = useEventBus('pageTitle');
const showModal = ref(false);

const notification = ref(false);
const notificationMessage = ref('');

function toggleModal(isOpen) {
  showModal.value = isOpen;

  if (isOpen) bus.emit('Create New Post');
  else bus.emit(null);
}

function notify(msg, timeout) {
  notificationMessage.value = msg;
  setTimeout(() => (notification.value = true), timeout);
}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
