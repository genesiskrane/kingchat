<template>
  <div class="grid content-center h-full w-full">
    <h2 class="my-2 text-center">Pick a profile picture</h2>
    <div class="w-full p-4">
      <v-img
        :src="displayedImage"
        class="w-96 h-96 mx-auto rounded-sm border"
        aspect-ratio="1"
      ></v-img>
    </div>
    <div>
      <v-form class="flex flex-col mx-4 gap-4">
        <v-file-input
          label="Pick Photo"
          prepend-icon="mdi-camera"
          variant="filled"
          @input="displayImage()"
          ref="file"
        ></v-file-input>

        <div class="flex flex-row flex-nowrap gap-2">
          <v-btn class="mt-2 basis-1/3" text="Skip" @click="skip()"></v-btn>
          <v-btn
            :loading="loading"
            class="mt-2 basis-2/3"
            text="Upload"
            color="indigo-darken-1"
            @click="next()"
          ></v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores'

const router = useRouter()
const store = useAppStore()

const file = ref()
const loading = ref(false)
const displayedImage = ref(store.user.photoURL)
const uploadedImage = ref('')
function displayImage() {
  uploadedImage.value = file.value.$el.children[1].children[0].children[2].children[2].files[0]
  console.log(uploadedImage.value)
  displayedImage.value = URL.createObjectURL(uploadedImage.value)
}

function skip() {
  router.push('/auth/create-username')
}

async function next() {
  loading.value = true

  const uid = store.user.uid
  let extension = uploadedImage.value.name.split('.')[1]

  const imgPath = 'users/avatars/' + uid + '.' + extension
  let imgURL = await store.upload(uploadedImage.value, imgPath)

  await store.updateProfilePhotoImage(uid, imgURL)

  router.push('/auth/create-username')
}
</script>
