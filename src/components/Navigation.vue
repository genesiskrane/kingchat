<template>
  <nav class="flex flex-col justify-between">
    <v-btn v-for="item in menu" :key="item" :to="item.link" class="px-4 py-2">
      <div class="flex flex-row justify-start gap-4">
        <div>
          <img :src="geticon(item.icon)" alt="" />
        </div>
        <div class="inline-flex items-center">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </v-btn>
  </nav>
</template>

<script setup>
const menu = [
  {
    name: "Home",
    link: "/home",
    icon: "home",
  },
  { name: "Rooms", link: "/rooms", icon: "door" },
  { name: "Explore", link: "/explore", icon: "search" },
  { name: "Notifications", link: "/notifications", icon: "notifications" },
  { name: "Messages", link: "/messages", icon: "envelop" },
  { name: "Bookmarks", link: "/bookmarks", icon: "bookmark" },
  { name: "Communities", link: "/communities", icon: "users" },
  { name: "Spaces", link: "/spaces", icon: "mic" },
  {
    name: "Profile",
    link: "/profile",
    icon: "person",
  },
  {
    name: "Buy K-credits",
    link: "/recharge",
    icon: "buy",
  },
];

function geticon(name) {
  return `../assets/icons/${name}.svg`;
}
</script>
