import axios from 'axios';
import { useAppStore } from '..';
import { Chat } from '../../classes';

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://kingchat.one/api'
    : 'http://localhost:3000/api';

export function useChat() {
  const store = useAppStore();

  function sortChats() {
    const chats = store.chats;

    // Sort Main Chats
    for (let [index, chat] of chats.entries()) {
      chat.messages.sort((a, b) => a.time - b.time);
      chat.lastMessage = {
        message: chat.messages[chat.messages.length - 1].text,
        time: chat.messages[chat.messages.length - 1].time,
        displayTime: store.formatTimeDisplay(chat.messages[0].time)
      };

      chat.unread = 4;

      chats[index] = chat;
    }
    chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time);

    store.$patch({ chats });
  }

  async function message(chatid, message) {
    let uid = store.user.uid;
    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid);

    if (chatIndex < 0) {
      let chat = new Chat(
        chatid,
        message,
        await store.getProfile(chatid.split(uid).find((id) => id.length > 0)),
        uid
      );
      store.chats.push(chat);
    } else {
      store.chats[chatIndex].messages.push(message);
      store.chats[chatIndex].lastMessage = {
        time: message.time,
        message: message.text,
        displayTime: store.formatTimeDisplay(message.time)
      };
    }

    store.sortChats();

    console.log(store.chats[chatIndex]);

    store.sockets.app.emit(
      'reciept',
      { uid, chatid, reciept: { lastDelivered: Date.now() } },
      ({ chatid, reciept }) => updateReciept(chatid, reciept)
    );
  }

  function formatTimeDisplay(timestamp) {
    let displayTime;
    let datetime = new Date(timestamp);
    let hours = datetime.getHours();
    let minutes = datetime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    switch (true) {
      // 24 Hours
      case timestamp + 86400000 > Date.now():
        displayTime = `${hours}:${minutes} ${ampm}`;
        break;
      // Yesterday
      case timestamp + 86400000 * 2 > Date.now():
        displayTime = `Yesterday`;
        break;
      // Day
      case timestamp + 86400000 * 3 > Date.now():
        displayTime = days[datetime.getDay()];
        break;
      // Date
      default:
        datetime = new Date(timestamp);
        displayTime = `${datetime.getMonth()}/${datetime.getDate()}/${datetime
          .getFullYear()
          .toString()
          .substr(-2)}`;
        break;
    }

    return displayTime;
  }

  function createNewChat(chatid, profile) {
    const uid = store.user.uid;
    let chat = new Chat(chatid, null, profile, uid);
    store.chats.push(chat);
    return store.chats.find((chat) => chat._id == chatid);
  }

  function sendToPrivateChat(chatid, message, uid) {
    const recieverID = chatid.split(uid).find((id) => id.length > 0);
    let recieverIsService = store.app.services.some((service) => service._id === recieverID);

    if (!recieverIsService)
      store.sockets.app.emit('send', { chatid, message, uid }, (chatid, { message, reciept }) => {
        logMessage(chatid, message);
        updateReciept(chatid, reciept);
      });

    if (recieverIsService)
      store.sockets.app.emit(
        'sendToService',
        { chatid, message, uid },
        (chatid, { message, reciept }) => {
          logMessage(chatid, message);
          updateReciept(chatid, reciept);
        }
      );

    // Update Message Length
    updateChatLength(chatid);
  }

  function logMessage(chatid, message) {
    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid);

    store.chats[chatIndex].messages.push(message);
    store.chats[chatIndex].lastMessage = {
      time: message.time,
      message: message.text,
      displayTime: store.formatTimeDisplay(message.time)
    };

    store.chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time);
  }

  function updateChatLength(chatid) {
    // This is to track new messages delivered by their length
    let reciepts = JSON.parse(sessionStorage.getItem('reciepts'));
    let recieptIndex = reciepts.findIndex((reciept) => reciept.id == chatid);

    if (recieptIndex >= 0) reciepts[recieptIndex].length++;
    else reciepts.push({ id: chatid, length: 1 });

    sessionStorage.setItem('reciepts', JSON.stringify(reciepts));
  }

  const updateReciept = (chatid, reciept) =>
    Object.assign(
      store.chats[store.chats.findIndex((chat) => chat._id == chatid)].meta[store.user.uid],
      reciept
    );

  function sendReciept(chatid, reciept) {
    const uid = store.user.uid;

    store.sockets.app.emit('reciept', { uid, chatid, reciept }, ({ chatid, reciept }) => {
      let chatIndex = store.chats.findIndex((chat) => chat._id == chatid);

      if (chatIndex) {
        if (reciept.lastRead) {
          store.chats[chatIndex].meta[store.user.uid].lastRead = reciept.lastRead;
        }
      }
    });
  }

  function sendChatDeliveryReciepts() {
    const chats = store.chats;
    const lastDelivered = Date.now();

    let reciepts = JSON.parse(sessionStorage.getItem('reciepts')) || [];
    chats.forEach(({ _id, messages }) => {
      const services = store.app.services.map((service) => service._id);
      const reciever = _id.split(store.user.uid).find((string) => string.length > 0);

      if (!reciever) return;
      const isService = services.includes(reciever);
      if (isService && messages.length <= 1) return;

      let chatInfoIndex = reciepts.findIndex((reciept) => reciept.id == _id);

      if (chatInfoIndex < 0) {
        reciepts.push({
          id: _id,
          length: messages.length
        });

        sendReciept(_id, { lastDelivered });
      }

      if (chatInfoIndex >= 0) {
        if (messages.length > reciepts[chatInfoIndex].length) sendReciept(_id, { lastDelivered });

        reciepts[chatInfoIndex] = {
          id: _id,
          length: messages.length
        };
      }

      sessionStorage.setItem('reciepts', JSON.stringify(reciepts));
    });
  }

  return {
    sendToPrivateChat,
    sortChats,
    formatTimeDisplay,
    sendReciept,
    sendChatDeliveryReciepts,
    message,
    createNewChat
  };
}
