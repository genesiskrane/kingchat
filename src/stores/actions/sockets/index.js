import { io } from 'socket.io-client';
import { useAppStore } from '../..';
import initAppSocket from './app';
import initRoomsSocket from './room';

const ioURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://kingchat.one'
    : 'http://localhost:3000';

export function useSockets() {
  const store = useAppStore();

  async function initSockets(uid) {
    store.sockets.app = io(ioURL, {
      auth: { uid }
    });

    store.sockets.room = io(`${ioURL}/rooms`, {
      auth: { uid }
    });

    initAppSocket(store.sockets.app);
    initRoomsSocket(store.sockets.room);
  }

  return {
    initSockets
  };
}
