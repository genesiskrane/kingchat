import { reactive } from 'vue'

const games = reactive([
  { id: 'ludo', name: 'Ludo', imgURL: 'assets/img/games/ludo/logo.jpg' },
  { id: 'dice-merge', name: 'Dice Merge', imgURL: 'assets/img/games/dice-merge/logo.jpg' },
  { id: 'chess', name: 'Chess', imgURL: 'assets/img/games/chess/logo.jpg' }
])

export default games
