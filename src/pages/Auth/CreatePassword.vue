<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img
        src="../assets/img/icon-black.svg"
        class="w-20 h-20 mx-auto my-8 rounded-2xl bg-red-500"
        aspect-ratio="1"
      ></v-img>
    </div>
    <div>
      <h2 class="my-2 text-center">You'll need a password</h2>
      <v-form @submit.prevent="" class="flex flex-col mx-4 gap-4">
        <v-text-field
          v-model="password"
          label="Create Password"
          id="password"
          type="password"
          @input="checkStrength()"
          :messages="passwordMeter"
        ></v-text-field>

        <v-btn :loading="loading" class="mt-2" text="Next" block @click="submit()"></v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores'

import { passwordStrength } from 'check-password-strength'

const router = useRouter()
const store = useAppStore()

const password = ref('')
const passwordMeter = ref('')

async function checkStrength() {
  passwordMeter.value = passwordStrength(password.value).value
}

async function submit() {
  let res = await store.createPassword(store.app.user.uid, password.value)
  await store.login({ id: store.$state.app.user.email, password: password.value })

  if (res) router.push('/auth/pick-profile-picture')
  else console.log(res)
}
</script>
