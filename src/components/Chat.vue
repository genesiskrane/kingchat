<template>
  <div class="flex flex-col">
    <bubbles :chat="active" class="text-sm" ref="chat"></bubbles>

    <messenger class="messenger" :to="to" ref="widget"></messenger>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import Bubbles from '../components/Bubbles.vue'
import Messenger from '../components/ui/Messenger.vue'

const chat = ref(null)
const widget = ref(null)

const { active, to } = defineProps(['active', 'to'])

onMounted(() => {
  let height = widget.value.widgetDiv.offsetHeight
  chat.value.bubbleDiv.style.marginBottom = height + 'px'
})
</script>

<style scoped>
.messenger {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
