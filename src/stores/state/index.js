import { ref, reactive } from 'vue';
import games from '../../pages/games';

export function useState() {
  const app = reactive({
    name: 'King Chat',
    isInitialized: false,
    isLoggedIn: false,
    services: []
  });
  const user = reactive({});
  const chats = ref([]);
  const rooms = reactive({});
  const online = ref([]);
  const recent = ref([]);
  const bookStore = ref({});
  const sockets = reactive({ app: null, room: null });

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
  };
}
