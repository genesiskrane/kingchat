import { io } from 'socket.io-client'
import { initSocket } from './socket'
import { initRoomSocket } from './roomSocket'
import { reactive } from 'vue'

const ioURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/'
    : 'http://localhost:3000/'

export function useSockets() {
  const socket = reactive(initSocket(io(ioURL)))
  socket.room = reactive(initRoomSocket(io(`${ioURL}rooms`)))

  console.log(socket)
  return {
    socket
  }
}
