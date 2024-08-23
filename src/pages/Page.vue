<template>
  <div id="page" class="w-full min-h-screen bg-black">
    <div class="flex flex-col relative">
      <div id="cover" class="flex items-center justify-center w-full h-40 bg-blue-500 text-center">
        Cover
      </div>
      <div class="absolute flex flex-row justify-between w-full h-12 px-3 py-4">
        <div>
          <v-icon
            icon="mdi-keyboard-backspace p-4"
            class="bg-[#0000000a] rounded-full"
            @click="back"
          ></v-icon>
        </div>
        <div class="flex flex-row gap-2">
          <v-icon icon="mdi-magnify" class="bg-[#0000000a] rounded-full p-4"></v-icon>
          <v-icon icon="mdi-dots-vertical" class="bg-[#0000000a] rounded-full p-4"></v-icon>
        </div>
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
        <v-tabs-window v-model="tab" class="py-1.5">
          <v-tabs-window-item :value="1" class="grid grid-cols-3 items-center gap-0.5">
            <div v-for="(post, i) in page.posts" :key="i">
              <v-img :src="profile.photoURL"></v-img>
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item :value="2" class="flex items-center justify-center">
            Media Posts
          </v-tabs-window-item>

          <v-tabs-window-item :value="3" class="flex items-center justify-center">
            Mentions
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores';

const { back } = inject('app');

const store = useAppStore();
const route = useRoute();
const username = route.params.username;
const profile = ref({});
const page = ref({});

const tab = ref(2);
onMounted(async () => {
  const data = await store.getUserPage(username);
  profile.value = data.profile;
  delete data.profile;
  page.value = { posts: [{ name: 'Ade' }, {}, {}, {}] };
});
</script>
