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

    store.bookStore.books.push(...data);
  }

  async function getBook(id) {
    const book = store.bookStore.books.find((book) => book._id == id);
    if (!book) {
      try {
        const { data } = await axios.get('/books/get-book?bookID=' + id);
        store.bookStore.books.push(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return {
    getGenre,
    getBook
  };
}

export { useBook };
