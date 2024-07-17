<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img src="../assets/img/logo.png" class="w-20 h-20 mx-auto my-8 rounded-sm"></v-img>
    </div>
    <div>
      <h2 class="my-2 text-center">Reset your password</h2>
      <v-form @submit.prevent="" class="flex flex-col mx-4 gap-4">
        <v-text-field v-model="data.username" label="Username" disabled="true"></v-text-field>
        <v-text-field
          v-model="data.email"
          label="Email"
          @input="checkStrength()"
          disabled="true"
        ></v-text-field>
        <v-text-field
          v-model="data.password"
          label="New Password"
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'

import { passwordStrength } from 'check-password-strength'

const router = useRouter()
const store = useAppStore()

const data = reactive({
  username: store.app.user.username,
  email: store.app.user.email,
  password: ''
})
const passwordMeter = ref('')

async function checkStrength() {
  passwordMeter.value = passwordStrength(data.password).value
}

async function submit() {
  let res = await store.createPassword(store.app.user.uid, data.password)
  await store.login({ id: store.app.user.email, password: data.password })

  if (res) router.push('/')
  else console.log(res)
}
</script>
