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
  const posts = ref([]);
  const bookStore = ref({ books: [], genres: [] });
  const sockets = reactive({ app: null, room: null });

  return {
    sockets,

    app,
    user,
    chats,
    rooms,
    online,
    posts,
    games,
    bookStore
  };
}
