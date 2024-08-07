import { io } from 'socket.io-client'
import { useAppStore } from '../../'
import initAppSocket from './app'
import initRoomsSocket from './room'

const ioURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one'
    : 'http://localhost:3000'

export function useSockets() {
  const store = useAppStore()

  async function initSockets(uid) {
    console.log('Reinitializing Sockets')

    store.sockets.app = io(ioURL, {
      auth: { uid }
    })

    store.sockets.room = io(`${ioURL}/rooms`, {
      auth: { uid }
    })

    console.log(store.sockets)
    initAppSocket(store.sockets.app)
    initRoomsSocket(store.sockets.room)
  }

  return {
    initSockets
  }
}
