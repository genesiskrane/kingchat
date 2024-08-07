<template>
  <div class="flex flex-col h-full" ref="page">
    <bubbles :chat="active" class="w-full text-sm" ref="chat"></bubbles>

    <messenger class="messenger w-full" :to="to" ref="widget"></messenger>
  </div>
</template>

<script setup>
import { ref,  onMounted, onUnmounted } from 'vue'
import Bubbles from './Bubbles.vue'
import Messenger from '../ui/Messenger.vue'

const page = ref(null)

const chat = ref(null)
const widget = ref(null)

const { active, to } = defineProps(['active', 'to'])

function setupMessenger() {
  const messengerHeight = widget.value.widgetDiv.offsetHeight
  const width = page.value.offsetWidth

  chat.value.bubbleDiv.style.width = width + 'px'
  chat.value.bubbleDiv.style.marginBottom = messengerHeight + 'px'
  widget.value.widgetDiv.style.margin = 'auto'
  widget.value.widgetDiv.style.width = width + 'px'
}

onMounted(() => {
  setupMessenger()
  window.addEventListener('resize', setupMessenger)
})

onUnmounted(() => window.removeEventListener('resize', setupMessenger))
</script>

<style scoped>
.messenger {
  position: fixed;
  bottom: 0;
}
</style>
