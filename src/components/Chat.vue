<template>
  <div class="h-full">
    <div v-for="(message, index) in chat.messages" :key="message" class="grid mx-2 my-4">
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
          <div id="time" class="flex flex-row gap-1 float-right text-xs">
            <div style="width: fit-content">
              {{ store.formatTimeDisplay(message.time) }}
            </div>

            <div class="grid items-center">
              <svg
                v-if="status.lastRead > message.time"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 1.5em; height: 1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  stroke="#43A047"
                  d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"
                />
              </svg>

              <svg
                v-else-if="status.lastDelivered > message.time"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 1.5em; height: 1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  stroke="#ECEFF1"
                  d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"
                />
              </svg>

              <svg
                v-else-if="status.lastSent > message.time"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 1.5em; height: 1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  stroke="#ECEFF1"
                  d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"
                />
              </svg>

              <svg
                v-else-if="status.lastSent < message.time"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 1.5em; height: 1.5em"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0">
                  <animateTransform
                    attributeName="transform"
                    calcMode="discrete"
                    dur="2.4s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;90 12 12;180 12 12;270 12 12"
                  />
                  <animate
                    attributeName="opacity"
                    dur="0.6s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;1;0"
                  />
                </circle>
                <circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0">
                  <animateTransform
                    attributeName="transform"
                    begin="0.2s"
                    calcMode="discrete"
                    dur="2.4s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="30 12 12;120 12 12;210 12 12;300 12 12"
                  />
                  <animate
                    attributeName="opacity"
                    begin="0.2s"
                    dur="0.6s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;1;0"
                  />
                </circle>
                <circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0">
                  <animateTransform
                    attributeName="transform"
                    begin="0.4s"
                    calcMode="discrete"
                    dur="2.4s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="60 12 12;150 12 12;240 12 12;330 12 12"
                  />
                  <animate
                    attributeName="opacity"
                    begin="0.4s"
                    dur="0.6s"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;1;0"
                  />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { defineProps, computed } from 'vue'

const store = useAppStore()
const { chat } = defineProps(['chat'])

function getSide(sender) {
  return store.user.uid == sender ? 'left' : 'right'
}

const status = computed(() => store.user.chats.find((chatInfo) => chat._id == chatInfo._id))
</script>

<style scoped>
.bubble {
  --r: 1em; /*radius*/
  --t: 1.5em; /*tail*/

  padding: 1em;
  max-width: 70%;
  border-radius: calc(var(--r) + var(--t)) / var(--r);
  background-clip: border-box;
  mask:
    radial-gradient(100% 100% at var(--p) 0px, #15194f00 99%, #0b0 102%) var(--p) 100% / var(--t)
      var(--t) no-repeat,
    linear-gradient(#000 0 0) padding-box;
  border-inline: var(--t) solid transparent;
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
</style>
