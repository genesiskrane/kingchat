import { ref, reactive } from 'vue'

export function useState() {
  const app = reactive({
    name: 'King Chat',
    isInitialized: false
  })
  const user = reactive({})
  const chats = ref([])
  const rooms = reactive({})
  const recent = ref([])

  return {
    app,
    user,
    chats,
    rooms,
    recent
  }
}
