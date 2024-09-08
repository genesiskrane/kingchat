import axios from 'axios';
import { storage, ref, uploadBytes } from '../../func/firebase';
import { useAppStore } from '..';

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://kingchat.one/api'
    : 'http://localhost:3000/api';

function useUser() {
  const store = useAppStore();

  async function getUser(uid) {
    store.initSockets(uid);

    try {
      let { data } = await axios.post('/app/get-user', { uid });
      console.log(uid);

      data.user.uid = data.user._id;

      store.$patch({ user: data.user });
      store.posts = data.posts;

      store.chats = findAndReplace(data.chats);
      if (uid.substring(0, 9) !== 'anonymous') store.sendChatDeliveryReciepts();
    } catch (error) {
      console.error(error);
    }

    store.sortChats();
  }

  async function updateUsername(uid, username) {
    try {
      let isUsernameUpdated = await axios.post('/auth/update-username', {
        uid,
        username
      });
      store.getUser(uid);
      return isUsernameUpdated;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function upload(file, imgPath) {
    const imgRef = ref(storage, imgPath);
    const snapshot = await uploadBytes(imgRef, file);

    let bucket = snapshot.metadata.bucket;
    let path = snapshot.metadata.fullPath;
    let imgURL = `https://storage.googleapis.com/${bucket}/${path}`;
    return imgURL;
  }

  async function updateProfilePhotoImage(uid, imgURL) {
    store.$patch({ user: { photoURL: imgURL } });

    try {
      let { data } = await axios.post('/auth/update-profile-photo-image', {
        uid,
        imgURL
      });
      await store.getUser(uid);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function findAndReplace(incomingChats) {
    let updatedChatList = [...store.chats];
    const remainingElements = [];

    for (let i = 0; i < incomingChats.length; i++) {
      const index = updatedChatList.findIndex((chat) => chat._id == incomingChats[i]._id);
      console.log(index, incomingChats[i].profile.displayName);
      if (index !== -1) console.log(updatedChatList[index]._id == incomingChats[i]._id);
      if (index !== -1) {
        console.log('Adding', incomingChats[i]);
        updatedChatList[index] = incomingChats[i];
        console.log(updatedChatList.length);
      } else remainingElements.push(incomingChats[i]);
    }

    updatedChatList.push(...remainingElements);

    return updatedChatList;
  }

  // Posts

  async function createPost(post) {
    const { data } = await axios.post('/create-post', post);
    return data;
  }

  return {
    getUser,
    updateUsername,
    upload,
    updateProfilePhotoImage,
    createPost
  };
}

export { useUser };
