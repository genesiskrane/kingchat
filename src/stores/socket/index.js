import initUserSocket from '../actions/sockets/user'
import initRoomSocket from '../actions/sockets/room'

let sockets = {}

function initSockets(uid) {
  initUserSocket(sockets.app)
  initRoomSocket(sockets.room)
  console.log(sockets)
}


export { initSockets,  sockets }
