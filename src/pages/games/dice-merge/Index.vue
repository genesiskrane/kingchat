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
          v-for="(die, i) in diceTypes"
          :key="i"
          draggable="true"
          ref="dieRefs"
          class="grid items-center"
        >
          <canvas class="canvas w-full h-full bg-pink-400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Box from './core.js'

const board = ref(null)
const slots = ref(null)
const dieRefs = ref(null)

onMounted(() => {
  const boardWidth = board.value.offsetWidth
  board.value.style.height = boardWidth + 'px'

  const dice = dieRefs.value
  const dieWidth = slots.value[0].offsetWidth

  dice.forEach((die, i) => {
    die.style.width = dieWidth - 4 + 'px'
    die.style.height = dieWidth - 4 + 'px'

    let canvas = die.children[0]
    let ctx = canvas.getContext('2d')
    ctx.font = '48px serif'
    ctx.textBaseline = 'hanging'
    ctx.fillText(i + 1, 40, 40)

    // Events
    die.addEventListener('dragstart', start)
    die.addEventListener('touchstart', start)
    die.addEventListener('touchmove', move)
    die.addEventListener('touchend', end)
    die.addEventListener('touchcancel', cancel)
  })
})
const nosOfDice = 6
const diceTypes = []

for (let i = 0; i < nosOfDice; i++) {
  console.log(i)
  diceTypes[i] = new Box()
}

const getDie = (e) => (e.target.classList.contains('canvas') ? e.target.parentElement : e.target)

function start(e) {
  console.log('Start Event Triggere. Type:' + e.type)

  let die = getDie(e)
  let touch = {}

  if (e.type == 'dragstart') {
    touch.clientX = e.clientX
    touch.clientY = e.clientY
  }

  if (e.type == 'touchstart') {
    touch.clientX = e.clientX
    touch.clientY = e.clientY
  }

  die = e.target.classList.contains('canvas') ? e.target.parentElement : e.target

  console.log(touch)
  // Add Start Styles
  die.style.position = 'absolute'
  die.style.left = touch.clientX + 'px'
  die.style.top = touch.clientY + 'px'
}

function move(e) {
  let die = getDie(e)
  const touch = e.touches[0]

  die.style.top = touch.clientY + 'px'
  die.style.left = touch.clientX + 'px'
}

function end(e) {
  console.log('Touch Ended', e)
}

function cancel(e) {
  console.log(e)
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
