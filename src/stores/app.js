import { defineStore } from 'pinia'

import { useState } from './state'
import { useActions } from './actions'
import { useSockets } from './socket'

const useAppStore = defineStore('app', () => {
  const state = useState()
  const actions = useActions()

  // Sockets
  const sockets = useSockets()

  return {
    ...state,
    ...actions,

    // Sockets
    ...sockets
  }
})

export { useAppStore }
