<template>
  <div id="page" class="w-full min-h-screen bg-black">
    <div class="flex flex-col">
      <div id="cover" class="flex items-center justify-center w-full h-40 bg-blue-500 text-center">
        Cover
      </div>
      <div id="profile" class="px-3">
        <div class="flex flex-row justify-between relative">
          <div id="display-picture" class="absolute -top-[2.625rem]">
            <v-img
              :src="profile.photoURL"
              class="w-20 h-20 border-2 border-white rounded-full"
            ></v-img>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 py-2">
          <v-btn
            size="large"
            height="2.25rem"
            width="2.25rem"
            color="indigo"
            icon="mdi-cash-fast"
          ></v-btn>
          <v-btn flat class="border-1 px-2">Edit Profile</v-btn>
        </div>

        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-semibold">{{ profile.displayName }}</h1>

          <span class="text-xs">@{{ profile.username }}</span>

          <div>
            Bio:{{}} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sit ut, saepe, in
            molestias omnis hic, iusto minus
          </div>

          <div class="flex flex-row justify-around">
            <div>Location</div>
            <div>Shared URL</div>
          </div>

          <div class="flex flex-row gap-4">
            <div id="following">0 Following</div>
            <div id="followers">0 Followers</div>
          </div>
        </div>
      </div>
      <div id="posts" class="px-3 my-8">
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
          <v-tab :value="1"> <v-icon icon="mdi-dots-grid" size="large"></v-icon></v-tab>
          <v-tab :value="2"> <v-icon icon="mdi-animation-play" size="large"></v-icon></v-tab>
          <v-tab :value="3"> <v-icon icon="mdi-card-account-details" size="large"></v-icon></v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1"> One </v-tabs-window-item>

          <v-tabs-window-item :value="2"> Two </v-tabs-window-item>

          <v-tabs-window-item :value="3"> Three </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores';

const store = useAppStore();
const route = useRoute();
const username = route.params.username;
const profile = ref({});
const page = ref({});

const tab = ref(null);
onMounted(async () => {
  const data = await store.getUserPage(username);
  profile.value = data.profile;
  delete data.profile;
  page.value = data;
});
</script>
