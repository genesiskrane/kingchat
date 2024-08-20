import axios from 'axios';
import { storage, ref, uploadBytes } from '../../func/firebase';
import { useAppStore } from '..';

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api';

function useBook() {
  const store = useAppStore();

  async function getGenre(id) {
    const { name } = store.bookStore.genres.find((genre) => genre.id == id);
    const { data } = await axios.get('/books/get-genre?genre=' + name);

    store.bookStore[id] = data;
  }

  return {
    getGenre
  };
}

export { useBook };
