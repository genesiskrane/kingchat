<template>
  <div class="grid content-center h-full w-full">
    <div>
      <div>
        <v-img
          src="../assets/img/icon-black.svg"
          class="w-20 h-20 mx-auto my-8 rounded-2xl bg-red-500"
          aspect-ratio="1"
        ></v-img>
      </div>
      <div>
        <v-form @submit.prevent="submit" class="flex flex-col mx-4 gap-4">
          <v-alert text="Wrong Password" type="error" v-model="alert" rounded closable></v-alert>
          <v-text-field
            v-model="data.id"
            label="Username or Email"
            :error-messages="v$.id.$errors.map((e) => e.$message)"
            @blur="v$.id.$touch"
            @input="v$.id.$touch"
          ></v-text-field>
          <v-text-field
            v-model="data.password"
            label="Password"
            type="password"
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
          ></v-text-field>

          <v-btn
            :loading="loading"
            class="mt-2"
            color="indigo-darken-3"
            text="Login"
            block
            @click="submit()"
          ></v-btn>
          <v-btn class="mt-4" text="Forgot Password" block @click="forgotPassword()"></v-btn>
          <div class="text-center my-2">
            <span>Don't have an account? </span>
            <router-link to="/auth/signup"><span class="font-bold">Sign Up</span></router-link>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores'

import { email, required, or, alphaNum } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const router = useRouter()
const store = useAppStore()

const loading = ref(false)
const alert = ref(false)
const data = reactive({
  id: '',
  password: ''
})

const rules = {
  id: { required, shouldBeChecked: or(email, alphaNum) },
  password: { required }
}

const v$ = useVuelidate(rules, data)

async function submit() {
  loading.value = true
  console.log('Logging In...')
  let res = await store.login(data)

  if (res) router.push('/chats')
  else if (res == 'invalid-credential') alert.value = true
}

function forgotPassword() {
  router.push({ path: '/auth/forgot-password', query: { id: data.id } })
}
</script>
