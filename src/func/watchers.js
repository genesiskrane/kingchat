import { watch } from 'vue'

const watchers = ({ app, chats }) => {
  watch(app, (app) => {
    console.log(app)
  })
  watch(
    () => chats,
    (chats) => {
      console.log(chats)
    },
    { immediate: true }
  )
}

export default watchers
