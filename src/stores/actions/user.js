import axios from 'axios'
import { storage, ref, uploadBytes } from '../../func/firebase'
import { useAppStore } from '..'

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

function useUser() {
  const store = useAppStore()

  async function initUser() {
    console.log('Reinitializing User Data')

    if (store.user.uid) {
      // Initialize Socket
      store.initSockets(store.user.uid)

      try {
        let { data } = await axios.post('/auth/get-user', {
          uid: store.user.uid
        })

        data.user.uid = data.user._id

        store.$patch({ user: data.user })
        store.$patch({ chats: data.chats })
      } catch (error) {
        console.log(error)
      }

      store.sortChats()
      store.sendChatDeliveryReciepts()
    } else {
      store.user.uid = 'anonymous'
    }

    try {
      //   Get Recent Users & Rooms
      let { data } = await axios.get('/app', { params: { id: store.user.uid } })

      store.$patch({ recent: data.recent })
      store.$patch({ rooms: data.rooms })
    } catch (error) {
      console.log(error)
    }

    store.$patch({ app: { isInitialized: true } })
  }

  async function updateUsername(uid, username) {
    try {
      let isUsernameUpdated = await axios.post('/auth/update-username', {
        uid,
        username
      })
      store.initUser()
      return isUsernameUpdated
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async function upload(file, imgPath) {
    const imgRef = ref(storage, imgPath)
    const snapshot = await uploadBytes(imgRef, file)

    let bucket = snapshot.metadata.bucket
    let path = snapshot.metadata.fullPath
    let imgURL = `https://storage.googleapis.com/${bucket}/${path}`
    return imgURL
  }

  async function updateProfilePhotoImage(uid, imgURL) {
    store.$patch({ user: { photoURL: imgURL } })

    try {
      let { data } = await axios.post('/auth/update-profile-photo-image', {
        uid,
        imgURL
      })
      await store.initUser()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    initUser,
    updateUsername,
    upload,
    updateProfilePhotoImage
  }
}

export { useUser }
