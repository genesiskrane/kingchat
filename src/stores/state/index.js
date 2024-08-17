import { ref, reactive } from 'vue'
import games from '../../pages/games'

export function useState() {
  const app = reactive({
    name: 'King Chat',
    isInitialized: false,
    isLoggedIn: false
  })
  const user = reactive({})
  const chats = ref([
    {
      profile: {
        _id: 'xxxxxx',
        username: 'CAC_APP_ROBOT',
        displayName: 'CAC APP',
        photoURL:
          'https://storage.googleapis.com/kingchatone.appspot.com/users/avatars/9rNXsPIZWWYOCI5jbEyMU20Lwcz2.jpg',
        lastSeen: '1722756268877'
      },
      messages: [
        {
          text: 'Welcome to The CAC App',
          time: Date.now()
        }
      ],
      lastMessage: {}
    }
  ])
  const rooms = reactive({})
  const online = ref([])
  const recent = ref([])
  const bookStore = ref({})
  const sockets = reactive({ app: null, room: null })

  return {
    sockets,

    app,
    user,
    chats,
    rooms,
    online,
    recent,
    games,
    bookStore
  }
}
