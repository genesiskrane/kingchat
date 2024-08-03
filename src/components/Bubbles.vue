<template>
  <div id="bubbleDiv" ref="bubbleDiv">
    <template v-for="(value, type) in messages" :key="type">
      <div v-if="type == 'unread' && messages.length > 0" id="unread-tag" class="text-center">
        <span class="text-xl underline">Unread Messages</span>
      </div>

      <div
        v-for="(message, index) in messages[type]"
        :key="index"
        :ref="type"
        class="grid mx-2 my-4"
      >
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
            <div class="flex flex-row gap-1 float-right text-xs">
              <div id="time">
                {{ store.formatTimeDisplay(message.time) }}
              </div>

              <div v-if="getSide(message.sender) == 'right'" id="reciept" class="grid items-center">
                <svg
                  v-if="status[reciever].lastRead >= message.time"
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
                  v-else-if="status[reciever].lastDelivered > message.time"
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
                  v-else-if="status[sender].lastSent > message.time"
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
                  v-else-if="status[sender].lastSent < message.time"
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
    </template>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { ref, defineProps, computed, onMounted } from 'vue'

const store = useAppStore()
const { chat } = defineProps(['chat'])

const bubbleDiv = ref(null)
defineExpose({ bubbleDiv })

const sender = store.user.uid
const reciever = chat._id.split(sender).find((id) => id.length > 0)

let observer
const status = computed(() => chat.meta)

let messages = computed(() => {
  let messages = {}
  messages.read = chat.messages.filter((message) => message.time < status.value[sender].lastRead)
  messages.unread = chat.messages.filter((message) => message.time > status.value[sender].lastRead)

  console.log(messages.unread)
  return messages
})

function mountReadTriggers() {
  const marginBottom = bubbleDiv.value.parentElement.children[1].offsetHeight

  let options = {
    root: null,
    rootMargin: `0px 0px -${marginBottom}px 0px`,
    threshold: 0
  }

  observer = new IntersectionObserver(sendReciept, options)

  let bubbles = []
  let bubbleDivChildren = bubbleDiv.value.children

  for (let bubble of bubbleDivChildren) {
    const target = bubble.children[0].children[0].children[1].children[1]
    if (target.getAttribute('time')) bubbles.push(target)
  }

  bubbles.forEach((target) => {
    const time = target.getAttribute('time')
    if (time > status.value[sender].lastRead) {
      console.log(target)
      observer.observe(target)
    }
  })
}

onMounted(() => {
  const observer = new MutationObserver(() => mountReadTriggers())
  observer.observe(bubbleDiv.value, { childList: true })
})

function getSide(sender) {
  return store.user.uid == sender ? 'right' : 'left'
}

function sendReciept(entries) {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      const time = entry.target.getAttribute('time')
      console.log('read')
      if (time > status.value[sender].lastRead) {
        console.log('Sending Read Reciept')
        store.sendReciept(chat._id, { lastRead: time })
        observer.unobserve(entry.target)
      }
    }
  })
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
