import { defineStore } from 'pinia'

import { useState } from './state'
import { useActions } from './actions'

const useAppStore = defineStore('kingchat', () => {
  const state = useState()
  const actions = useActions()

  return {
    ...state,
    ...actions
  }
})

export { useAppStore }
