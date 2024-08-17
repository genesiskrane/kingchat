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

  async function getUser() {
    store.initSockets(store.user.uid)

    try {
      let { data } = await axios.post('/auth/get-user', {
        uid: store.user.uid
      })

      data.user.uid = data.user._id

      store.$patch({ user: data.user })
      store.chats.push(...data.chats)
      store.sendChatDeliveryReciepts()
    } catch (error) {
      console.log(error)
    }
  }

  async function updateUsername(uid, username) {
    try {
      let isUsernameUpdated = await axios.post('/auth/update-username', {
        uid,
        username
      })
      store.getUser()
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
      await store.getUser()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getUser,
    updateUsername,
    upload,
    updateProfilePhotoImage
  }
}

export { useUser }
