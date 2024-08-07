<template>
  <div class="mx-10">
    <div id="dice-merge">Dice Merge Game</div>
    <p>game board</p>
    <div
      class="bg-blue-500 mx-auto grid grid-cols-5 gap-1"
      ref="board"
      @dragover="dragover"
      @drop="drop"
    >
      <div
        v-for="i in 25"
        :key="i"
        class="text-center"
        style="border: 1px solid red; border-radius: 3px"
      >
        x
      </div>
    </div>
    <div class="text-center my-10">Dice</div>
    <div class="flex flex-row gap-4">
      <div v-for="(die, i) in diceTypes" :key="i" draggable="true" ref="dieRefs">
        <canvas style="width: 30px; height: 30px; background: green"></canvas> {{ i + 1 }}
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
  console.log(dice)
  dice.forEach((die) => {
    let img = new Image()
    img.src = '../assets/img/games/ludo/drag-icon.jpg'
    die.addEventListener('dragstart', (e) => {
      e.dataTransfer.dropEffect = 'copy'
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
