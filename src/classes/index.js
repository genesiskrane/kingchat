class Chat {
  constructor(chatid, message, profile, uid) {
    let user1, user2

    let splitChatID = chatid.split(uid)

    user1 = uid
    user2 = splitChatID.find((id) => id.length > 0)

    this._id = chatid
    this.lastMessage = {
      time: message ? message.time : 0,
      message: message ? message.message : 0,
      displayTime: null
    }
    this.messages = message ? [message] : []
    this.profile = profile
    this.meta = {
      [user1]: { lastRead: 0, lastSent: 0, lastDelivered: 0 },
      [user2]: { lastRead: 0, lastSent: 0, lastDelivered: 0 }
    }
  }
}

class Room {
  constructor(data) {
    Object.assign(this, data)
  }
}

export { Chat, Room }
