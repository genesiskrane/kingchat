<template>
  <div id="bubbleDiv" ref="bubbleDiv">
    <!-- <template v-for="(value, type) in messages" :key="type"> -->
    <div v-if="true" id="unread-tag" class="text-center">
      <span class="text-xl underline">Unread Messages</span>
    </div>

    <div v-for="(message, index) in messages" :key="index" class="grid mx-2 my-4">
      <div
        class="bubble shadow-sm"
        :class="{
          left: getSide(message.username) == 'left',
          right: getSide(message.username) == 'right'
        }"
      >
        <div>
          <div>
            <span class="text-xs underline">{{ message.username }}</span>
            <p>
              {{ message.msg.text }}
            </p>
          </div>
          <div class="flex flex-row gap-1 float-right text-xs">
            <div id="time">
              {{ message.time }}
            </div>

            <div v-if="getSide(message.sender) == 'right'" id="reciept" class="grid items-center">
              <svg
                v-if="true"
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
                v-else
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

            <div v-if="getSide(message.sender) == 'left'" :time="message.time"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- </template> -->
  </div>
</template>

<script setup>
import { useAppStore } from '../../stores'
import { ref, computed } from 'vue'

const store = useAppStore()

const bubbleDiv = ref(null)
defineExpose({ bubbleDiv })

const sender = store.user.uid

let messages = computed(() => store.rooms.active.messages)

function getSide(username) {
  return username == store.user.username ? 'right' : 'left'
}
</script>

<style scoped>
.bubble {
  --r: 1em; /*radius*/
  --t: 1.5em; /*tail*/

  padding: 1em;
  max-width: 75%;
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
