import ShortUniqueId from 'short-unique-id';
import { useFavicon } from '@vueuse/core';
import axios from 'axios';
import { useAppStore } from '..';

import colors from 'vuetify/util/colors';

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api';

const uid = new ShortUniqueId({ length: 5 });

function useApp() {
  const store = useAppStore();

  async function init() {
    console.log('App Initializing');

    console.log(colors);

    // Set Theme Color
    store.app.themeColor = 'red';

    // Set App Favicon
    const icon = useFavicon();
    icon.value = `../../assets/${store.app.themeColor}`;

    // Initialize Chat Reciepts
    const chatReciepts = sessionStorage.getItem('reciepts');
    if (!chatReciepts) sessionStorage.setItem('reciepts', JSON.stringify([]));

    // Get User Data
    store.$patch({ user: { uid: JSON.parse(sessionStorage.getItem('uid')) } });
    if (store.user.uid) store.app.isLoggedIn = true;

    if (!store.app.isInitialized) {
      store.chats = [];
      store.user.uid = store.user.uid ? store.user.uid : 'anonymous-' + uid.rnd();
      console.log('Now getting App');
      await store.getApp(store.user.uid);
      console.log(store.chats);
      await store.getUser(store.user.uid);
    }

    console.log('App Initialized');
    return;
  }

  async function getApp() {
    console.log('getting App');
    try {
      //   Get Recent Users, Rooms & Services
      let { data } = await axios.get('/app', { params: { id: store.user.uid } });
      console.log(data);
      data.services.forEach((service) => store.app.services.push(service.profile));
      store.chats.push(...setUpServices(data.services));
      console.log(store.chats);
      store.$patch({ recent: data.recent });
      store.$patch({ rooms: data.rooms });
      store.bookStore.genres.push(...data.bookStore.genres);

      function setUpServices(services) {
        let chats = [];
        services.forEach((service) => {
          service.messages = [{ text: service.profile.description, time: Date.now() }];
          service._id = [store.user.uid, service.profile._id].sort().join('');
          service.meta = {};
          service.meta[service.profile._id] = {};
          service.meta[store.user.uid] = {};

          chats.push(service);
        });
        return chats;
      }
    } catch (error) {
      console.log(error);
    }
    store.$patch({ app: { isInitialized: true } });
  }

  async function getProfile(uid) {
    console.log(uid);
    try {
      let { data } = await axios.get(`/app/getProfile?uid=${uid}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function send(payload, message) {
    const chatid = payload.chatid;
    const uid = store.user.uid;
    const type = payload.type;

    switch (type) {
      case 'Chat':
        store.sendToPrivateChat(chatid, message, uid);
        break;
      case 'Room':
        store.sendToRoomChat(chatid, message, uid);
        break;
      default:
        console.error('Message Type Unknown');
    }
  }

  return {
    init,
    getApp,
    getProfile,
    send
  };
}

export { useApp };
