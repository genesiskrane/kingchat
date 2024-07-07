<template>
  <q-page class="flex flex-col">
    <div v-for="chat in chats" :key="chat" class="">
      <router-link :to="openChat(chat.username)">
        <div class="flex flex-row flex-nowrap w-full px-2 py-4 gap-4">
          <div class="grid items-center">
            <q-avatar><img :src="chat.avatar" /></q-avatar>
          </div>
          <div class="grid items-center">
            <div>
              <span>{{ chat.username.toUpperCase() }}</span>
            </div>
            <span>Chat Message: {{ chat.message }}</span>
          </div>
        </div>
      </router-link>

      <q-separator />
    </div>
  </q-page>
</template>

<script setup>
const chats = [
  {
    avatar: "https://picsum.photos/id/1/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/2/200/300",
    username: "mosesbliss",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/3/200/300",
    username: "timelegend",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/4/200/300",
    username: "soteria",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/5/200/300",
    username: "habbakuk",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/6/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/6/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/6/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/6/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
  {
    avatar: "https://picsum.photos/id/6/200/300",
    username: "damilola",
    name: "",
    message: "Hmmm Okay",
  },
];

function openChat(username) {
  return `/chat/${username}`;
}
</script>
