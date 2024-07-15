<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img src="../assets/img/logo.png" class="w-20 h-20 mx-auto my-8 rounded-sm"></v-img>
    </div>
    <div>
      <h2 class="my-2 text-center">Verify Email</h2>
      <v-form @submit.prevent="" class="flex flex-col mx-4 gap-4">
        <div class="text-right">Resend Email</div>
        <v-text-field
          v-model="code"
          label="Verification Code"
          id="code"
          placeholder="000000"
          maxlength="6"
          counter
          @input="verify()"
          :error-messages="errorMessage"
        ></v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'

const router = useRouter()
const store = useAppStore()

const loading = ref(false)
const code = ref('')

function verify() {
  console.log(code.value.length)
  if (code.value.length == 6) {
    loading.value = true
    console.log('verifying', code.value)
    let isVerified = store.verifyOTP({ uid: store.app.user.uid, code: code.value })
    if (isVerified) {
      router.push()
    }
  } else {
    loading.value = false
  }
}
</script>

<style scoped>
::v-deep #code {
  text-align: center;
}
::v-deep .v-field .v-label {
  margin: auto;
  position: absolute;
  width: 100%;
  text-align: center;
}
</style>
