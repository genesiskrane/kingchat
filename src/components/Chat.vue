<template>
  <div class="h-full">
    <div v-for="message in chat.messages" :key="message" class="grid mx-2 my-4">
      <div
        class="bubble shadow-sm"
        :class="{
          left: getSide(message.sender) == 'left',
          right: getSide(message.sender) == 'right'
        }"
      >
        <div>
          <div>
            {{ message.text }}
          </div>
          <div id="time" class="text-xs float-right">
            {{ store.formatTimeDisplay(message.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { defineProps } from 'vue'

const store = useAppStore()
const { chat } = defineProps(['chat'])

function getSide(sender) {
  return store.user.uid == sender ? 'left' : 'right'
}
</script>

<style scoped>
.bubble {
  --r: 1em; /*radius*/
  --t: 1.5em; /*tail*/

  padding: 1em;
  max-width: 70%;
  border-inline: var(--t) solid transparent;
  border-radius: calc(var(--r) + var(--t)) / var(--r);
  background-clip: border-box;
  mask:
    radial-gradient(100% 100% at var(--p) 0px, #15194f00 99%, #0b0 102%) var(--p) 100% / var(--t)
      var(--t) no-repeat,
    linear-gradient(#000 0 0) padding-box;
}

.left {
  --p: 0%;
  background: #e1f5fe;
  border-bottom-left-radius: 0 0;
  place-self: start;
}

.right {
  --p: 100%;
  background: #039be5;
  border-bottom-right-radius: 0 0;
  place-self: end;
}

#time {
}

.left #time {
}

.right #time {
}
</style>
