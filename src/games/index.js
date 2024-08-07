import { reactive } from 'vue'

const games = reactive([
  { id: 'ludo', name: 'Ludo', imgURL: './assets/img/games/ludo.jpg' },
  { id: 'dice-merge', name: 'Dice Merge', imgURL: './assets/img/games/dice-merge.jpg' },
  { id: 'chess', name: 'Chess', imgURL: './assets/img/games/chess.jpg' }
])

export default games
