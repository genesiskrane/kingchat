<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img
        src="../assets/img/icon-black.svg"
        class="w-20 h-20 mx-auto rounded-2xl bg-red-500 border"
        aspect-ratio="1"
      ></v-img>
    </div>
    <h2 class="my-2 text-center">Create Unique Username</h2>
    <div>
      <v-form @submit.prevent="finish()" class="flex flex-col mx-4 gap-4">
        <v-text-field
          v-model="data.username"
          label="Choose Username"
          prefix="@"
          :error-messages="errorMessage"
          :messages="message"
          maxlength="15"
          counter
          @blur="checkError(), verifyUsername(), v$.username.$touch"
          @input="checkError(), verifyUsername(), v$.username.$touch"
        ></v-text-field>
        <v-btn
          class="mt-2"
          color="indigo-darken-1"
          block
          text="Finish"
          @click="finish()"
          :disabled="isUsertaken"
        ></v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores'

import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const router = useRouter()
const store = useAppStore()

const data = reactive({ username: store.user.username })
const errorMessage = ref('')
const message = ref('')
const isUsertaken = ref(false)

const rules = {
  username: { required, minLengthValue: minLength(1) }
}

const v$ = useVuelidate(rules, data)

async function verifyUsername() {
  let isValid = data.username.match(/^@?(\w){1,15}$/) !== null

  if (!isValid) {
    errorMessage.value = 'Username is invalid'
    isUsertaken.value = true
    return
  }

  console.log(data.username, isValid)
  let isUsernameAvailabe = await store.verifyUsername(data.username)
  console.log(isUsernameAvailabe)
  if (isUsernameAvailabe) {
    message.value = 'Username is available'
    isUsertaken.value = false
  } else {
    message.value = 'Username is taken'
    isUsertaken.value = true
  }
}

function checkError() {
  if (v$.value.$silentErrors.length > 0) {
    let error = v$.value.$silentErrors[0].$message
    console.log(error)
    if (error) {
      errorMessage.value = error
    }
  } else errorMessage.value = ''
}
function finish() {
  const uid = store.user.uid
  store.updateUsername(uid, data.username)
  router.push('/home')
}
</script>
