<template>
  <div class="grid content-center h-full w-full">
    <div>
      <v-img src="../assets/img/logo.png" class="w-20 h-20 mx-auto my-8 rounded-sm"></v-img>
    </div>
    <div class="mx-4">
      <h2 class="my-2 text-center">We sent you a code</h2>
      <p class="mx-2 my-2 text-xs">
        Check your email  {{ email }} to get your confirmation code. If you need to request a new
        code, go back and re-enter your username or email.
      </p>
      <v-form @submit.prevent="" class="flex flex-col gap-4">
        <v-alert text="Invalid Code" type="warning" v-model="alert" rounded closable></v-alert>

        <v-text-field
          v-model="code"
          label="Recovery Code"
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
import { useAppStore } from '../../stores'

const router = useRouter()
const store = useAppStore()

const alert = ref(false)
const code = ref('')
const email = hideEmail(store.user.email)

function hideEmail(email) {
  console.log(email)

  let hiddenEmail = email.replace(/(.{3})(.*)(?=@)/, (gp1, gp2, gp3) => {
    console.log(gp1, gp2, gp3)
    for (let i = 0; i < gp3.length; i++) {
      gp2 += '*'
    }
    return gp2
  })
  return hiddenEmail
}

async function verify() {
  if (code.value.length == 6) {
    let isVerified = await store.verifyOTP({ uid: store.user.uid, code: code.value })

    console.log(isVerified)
    if (isVerified) {
      router.push('/auth/reset-password')
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
