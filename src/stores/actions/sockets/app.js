import { useAppStore } from '../..';

const initAppSocket = (socket) => {
  socket.on('connect', () => socket.emit('init'));

  socket.on('init', (data) => {
    console.log('Live Data:', data);
  });

  socket.on('online', ({ online }) => {
    const store = useAppStore();

    // Populate Online Users
    store.online = online = online
      .filter(
        (profile, index, onlineArray) =>
          onlineArray.map((account) => account._id).indexOf(profile._id) == index
      )
      .filter((profile) => profile._id !== store.user.uid)
      .map((profile) => ({
        chatid: [store.user.uid, profile._id].sort().join(''),
        profile
      }));
  });

  socket.on('message', ({ chatid, message }) => {
    const store = useAppStore();
    store.message(chatid, message);
  });

  socket.on('reciept', ({ chatid, reciept }) => {
    const store = useAppStore();
    const uid = store.user.uid;
    const splitChatID = chatid.split(uid);
    let receiverID = splitChatID.find((id) => id.length > 0);

    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid);

    if (reciept.lastDelivered)
      store.chats[chatIndex].meta[receiverID].lastDelivered = reciept.lastDelivered;
    if (reciept.lastRead) store.chats[chatIndex].meta[receiverID].lastRead = reciept.lastRead;
  });
};

export default initAppSocket;
