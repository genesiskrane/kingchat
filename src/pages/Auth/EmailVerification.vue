<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img src="../assets/img/logo.png" class="w-20 h-20 mx-auto my-8 rounded-sm"></v-img>
    </div>
    <div>
      <h2 class="my-2 text-center">Verify Email</h2>
      <v-form @submit.prevent="" class="flex flex-col mx-4 gap-4">
        <v-alert text="Invalid OTP" type="warning" v-model="alert" rounded closable></v-alert>

        <div class="text-right">Resend Email</div>

        <v-text-field
          v-model="code"
          label="Verification Code"
          id="code"
          placeholder="XXXXXX"
          maxlength="6"
          counter
          @input="verify()"
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

const alert = ref(false)
const code = ref('')

async function verify() {
  if (code.value.length == 6) {
    let isVerified = await store.verifyOTP({ uid: store.app.user.uid, code: code.value })

    console.log(isVerified)
    if (isVerified) {
      router.push('/auth/create-password')
    } else alert.value = true
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
