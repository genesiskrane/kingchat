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
      <h2 class="my-2 text-center">Sign Up</h2>
      <v-form @submit.prevent="submit" class="mx-4">
        <v-text-field
          v-model="data.name"
          label="Name"
          placeholder="Name cannot be blank"
          maxlength="50"
          counter
          :error-messages="v$.name.$errors.map((e) => e.$message)"
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        ></v-text-field>
        <v-text-field
          v-model="data.email"
          label="Email"
          @blur="verifyEmail(data.email), v$.email.$touch"
          @input="verifyEmail(data.email), v$.email.$touch"
          :error-messages="(v$.email.$errors.map((e) => e.$message), isEmailAvialableResponse)"
        ></v-text-field>
        <div>
          <span>Date Of Birth</span>
        </div>
        <div class="flex flex-row gap-1">
          <div class="basis-3/6">
            <v-select label="Month" :items="months" v-model="data.month"></v-select>
          </div>
          <div class="basis-2/6">
            <v-select label="Day" :items="days" v-model="data.day"></v-select>
          </div>
          <div class="basis-2/6">
            <v-select label="Year" :items="years" v-model="data.year"></v-select>
          </div>
        </div>
        <v-btn
          :loading="loading"
          class="mt-2"
          text="Next"
          block
          :disabled="isFormInvalid"
          @click="submit()"
        ></v-btn>
        <div class="text-center my-2">
          <span>Already have an account? </span>
          <router-link to="/auth/login"><span class="font-bold">Login</span></router-link>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import { email, required, minLength, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import { useAppStore } from '../../stores'

const store = useAppStore()
const router = useRouter()

let loading = ref(false)
let isEmailAvialableResponse = ref('')

const data = reactive({
  name: '',
  email: '',
  password: '12345678',
  month: '',
  day: '',
  year: ''
})

const rules = {
  name: { required, minLengthValue: minLength(1), maxLengthValue: maxLength(50) },
  email: { required, email },
  month: { required },
  day: { required },
  year: { required }
}

const v$ = useVuelidate(rules, data)

const isFormInvalid = computed(() => {
  if (isEmailAvialableResponse.value !== '') {
    console.log(v$.value.$invalid)
    return true
  } else return v$.value.$invalid
})

let days = []
for (let i = 31; i > 0; i--) days.push(i)

let years = []
for (let i = 2024; i > 1980; i--) years.push(i)

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

async function submit() {
  console.log('SignUp Form Submitted', data)

  loading.value = true

  data.name = data.name.trim()
  data.email = data.email.toLowerCase()

  let user = await store.signup(data)

  console.log(store.app.user.uid, user)

  if (user.uid) {
    loading.value = false
    router.push('/auth/email-verification')
  }
}

async function verifyEmail(email) {
  isEmailAvialableResponse.value = ''

  if (email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/)) {
    let response = await store.verifyEmail(email)
    if (response.data.email) {
      isEmailAvialableResponse.value = 'Email already in use.'
      v$.value.$invalid = true
    }
  } else console.log('Email Not Verifiable')
}
</script>
