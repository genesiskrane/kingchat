<template>
  <div id="messenger" class="flex flex-row bg-black p-1 gap-1">
    <div id="message" class="w-full h-full bg-white grid items-center p-0">
      <div class="bg-yellow-100 h-full grid items-center">
        <p
          id="text"
          contenteditable="true"
          class="p-1.5 max-h-60 break-all overflow-auto z-10"
          @keyup="analyseText($event)"
          @keydown="analyseText($event)"
          ref="text"
        ></p>
        <div ref="placeholder" :class="{ hidden: active }" class="p-1.5 absolute z-0">
          {{ label }}
        </div>
      </div>
    </div>

    <div id="sender" class="grid items-end">
      <v-btn
        class="flex flex-row min-h-min px-1.5 gap-1.5"
        color="red-darken-1"
        rounded="0"
        @click="send()"
      >
        <img src="../../assets/icons/send.svg" class="h-10 w-10" alt="Send" />
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useAppStore } from '../../stores/app'

const props = defineProps(['to'])
const store = useAppStore()

const placeholder = ref()
const text = ref()
const active = ref(false)
const label = ref('Type a message')

let keydown = {}

function analyseText(e) {
  let textLength = text.value.innerText.length
  if (textLength !== 0) active.value = true

  if (e.type == 'keyup') delete keydown[e.keyCode]

  if (e.type == 'keydown') {
    keydown[e.keyCode] = true

    if (e.keyCode == 13 && Object.keys(keydown).length == 1) {
      e.preventDefault()
      send()
    }
  }
}

function send() {
  const message = text.value.innerText.trim()

  text.value.innerText = ''
  active.value = false

  let chatid = props.to.chatid
  let type = props.to.type

  store.send({ chatid, type }, message)
}
</script>
