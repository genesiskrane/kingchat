<template>
  <nav class="flex flex-col justify-between">
    <template v-for="item in menu" :key="item">
      <template v-if="item.public | store.app.isLoggedIn">
        <router-link :to="getLink(item)" class="px-4 py-2">
          <div class="flex flex-row justify-start gap-4">
            <div>
              <img :src="geticon(item.icon)" alt="" />
            </div>
            <div class="inline-flex items-center">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </router-link>
      </template>
    </template>
  </nav>
</template>

<script setup>
import { useAppStore } from '../../stores'

const store = useAppStore()

const menu = [
  {
    name: 'Home',
    route: 'home',
    icon: 'home',
    public: true
  },
  { name: 'Chats', route: 'chats', icon: 'envelop', public: true },
  { name: 'Rooms', route: 'rooms', icon: 'door', public: true },
  { name: 'Games', route: 'games', icon: 'gamepad', public: true },
  { name: 'Books', route: 'books', icon: 'book', public: true },
  // { name: "Explore", route: "/explore", icon: "search" },
  // { name: "Notifications", route: "/notifications", icon: "notifications" },
  // { name: "Bookmarks", route: "/bookmarks", icon: "bookmark" },
  // { name: "Communities", route: "/communities", icon: "users" },
  // { name: "Spaces", route: "/spaces", icon: "mic" },
  // { name: 'Events', route: '/events', icon: 'event' },
  // { name: 'Profile', route: '/profile', icon: 'person' },
  { name: 'Store', route: 'store', icon: 'buy', public: false }
]

function getLink(item) {
  return `/${item.route}`
}

function geticon(name) {
  return `../assets/icons/${name}.svg`
}
</script>
