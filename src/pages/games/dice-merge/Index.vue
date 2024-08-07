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
      <div class="flex flex-row gap-4">
        <div class="text-center my-10">Dice</div>
        <div v-for="(die, i) in diceTypes" :key="i" draggable="true" ref="dieRefs">
          <canvas style="width: 30px; height: 30px; background: pink"></canvas> {{ i + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Box from './core.js'

const board = ref(null)
const dieRefs = ref(null)

onMounted(() => {
  const width = board.value.offsetWidth
  board.value.style.height = width + 'px'

  const dice = dieRefs.value

  dice.forEach((die) => {
    let img = new Image()
    img.src = '../assets/img/games/ludo/drag-icon.jpg'

    die.addEventListener('dragstart', (e) => {
      // e.dataTransfer.dropEffect = 'copy'
      console.log(e)
    })

    die.addEventListener('touchstart', (e) => {
      console.log('Touch Started', e)
    })
  })
})
const nosOfDice = 6
const diceTypes = []

for (let i = 0; i < nosOfDice; i++) {
  console.log(i)
  diceTypes[i] = new Box()
}

const dragover = (ev) => ev.preventDefault()

function drop(ev) {
  ev.preventDefault()
  console.log('DROPPED')
}
</script>

<style scoped>
#background {
  background: #256e02;
}
</style>
