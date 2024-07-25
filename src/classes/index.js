class Chat {
  constructor(chatid, message, profile) {
    this._id = chatid
    this.lastMessage = { time: message.time, message: message.message }
    this.messages = [message]
    this.profile = profile
  }
}

class Room {
  constructor(data) {
    Object.assign(this, data)
  }
}

export { Chat, Room }
