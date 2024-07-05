<template>
  <nav class="flex flex-col my-2">
    <a v-for="item in menu" :key="item" class="px-4 mx-1"
      ><div class="flex flex-row justify-start">
        <div class="mx-2">
          <img :src="geticon(item.icon)" alt="" />
        </div>
        <div class="inline-flex items-center">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </a>
  </nav>
</template>

<script setup>
const menu = [
  {
    name: 'Home',
    link: '/home',
    icon: 'home'
  },
  { name: 'Explore', link: '/explore', icon: 'search' },
  { name: 'Notifications', link: '/notifications', icon: 'notifications' },
  { name: 'Messages', link: '/messages', icon: 'envelop' },
  { name: 'Bookmarks', link: '/bookmarks', icon: 'bookmark' },
  { name: 'Communities', link: '/communities', icon: 'users' },
  { name: 'Spaces', link: '/spaces', icon: 'mic' },

  {
    name: 'Profile',
    link: '/profile',
    icon: 'person'
  }
]

function geticon(name) {
  return `./assets/icons/${name}.svg`
}
</script>
