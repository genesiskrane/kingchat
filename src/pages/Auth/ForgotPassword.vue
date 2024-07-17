<template>
  <div class="grid content-center h-full w-full">
    <div>
      <div>
        <v-img src="../assets/img/logo.png" class="w-20 h-20 mx-auto my-8 rounded-sm"></v-img>
        <h2 class="my-4 text-3xl text-center">Find your account</h2>
        <p class="my-2 text-center">
          Enter the email or username associated with your account to change your password.
        </p>
      </div>
      <div>
        <v-form @submit.prevent="submit" class="flex flex-col mx-4 gap-4">
          <v-alert
            text="Username or Email does not have an account. Sign Up"
            type="info"
            v-model="alert"
            rounded
            closable
          ></v-alert>
          <div class="text-sm text-right">Resend Recovery Code</div>

          <v-text-field
            v-model="data.id"
            label="Username or Email"
            :error-messages="v$.id.$errors.map((e) => e.$message)"
            @blur="v$.id.$touch"
            @input="v$.id.$touch"
          ></v-text-field>

          <v-btn
            :loading="loading"
            class="mt-2"
            text="Next"
            block
            color="indigo-darken-1"
            @click="submit()"
            :disabled="isFormInvalid"
          ></v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'

import { email, required, or, alphaNum } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const loading = ref(false)
const alert = ref(false)
const data = reactive({
  id: route.query.id
})

const rules = {
  id: { required, shouldBeChecked: or(email, alphaNum) }
}

const v$ = useVuelidate(rules, data)

const isFormInvalid = computed(() => v$.value.$invalid)

async function submit() {
  console.log('Generating Recovery Code...')

  loading.value = true

  let isRecoverCodeGenerated = await store.generateRecoveryCode(data.id)

  if (isRecoverCodeGenerated) {
    router.push('/auth/recovery-code-confirmation')
  } else {
    alert.value = true
    loading.value = false
  }
}
</script>
