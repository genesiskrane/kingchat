<template>
  <div id="dice-merge" class="h-full">
    <div id="background" class="grid h-full content-around">
      <div
        class="mx-auto w-full p-4"
        style="max-width: 500px"
        ref="board"
        @dragover="dragover"
        @drop="drop"
      >
        <div class="grid grid-cols-5 gap-1 h-full p-1 rounded-sm" style="background: #175800">
          <div
            v-for="i in 25"
            :key="i"
            ref="slots"
            class="grid items-center text-center"
            style="
              border-radius: 3px;
              background: #256e02;
              box-shadow: inset #ffffff40 0px 1px 1px 1px;
            "
          >
            {{ i }}
          </div>
        </div>
      </div>
      <div class="text-center my-10">Dice</div>
      <div class="flex flex-row flex-wrap gap-3 justify-center">
        <div
          v-for="i in nosOfDice"
          :key="i"
          draggable="true"
          ref="dieRefs"
          class="grid items-center"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { init } from './'

const board = ref(null)
const slots = ref(null)
const dieRefs = ref(null)
const nosOfDice = 6

onMounted(() => {
  let width = slots.value[0].offsetWidth

  console.log(dieRefs.value)
  init(dieRefs.value, width)

  const boardWidth = board.value.offsetWidth
  board.value.style.height = boardWidth + 'px'

  // const dice = dieRefs.value
  // const dieWidth = slots.value[0].offsetWidth
})

for (let i = 0; i < nosOfDice; i++) {
  console.log(i)
}
</script>

<style scoped>
#background {
  background: #256e02;
}
</style>
