import { ref, reactive, watch } from 'vue'

export function useState() {
  const app = reactive({
    name: 'King Chat',
    isInitialized: false
  })
  const user = reactive({})
  const chats = ref([])
  const rooms = reactive({})
  const recent = ref([])

  watch(rooms, (news, old) => {
    console.info('Rooms Changed', old, news)
  })

  watch(recent, (news, old) => {
    console.info('Recent Users Changed', old, news)
  })

  return {
    app,
    user,
    chats,
    rooms,
    recent
  }
}
