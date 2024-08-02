import { defineStore } from 'pinia'

import { useState } from './state'
import { useActions } from './actions'

const useAppStore = defineStore('app', () => {
  const state = useState()
  const actions = useActions()

  return {
    ...state,
    ...actions
  }
})

export { useAppStore }
