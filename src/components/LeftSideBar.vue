<template>
  <aside id="left-sidebar" class="bg-green-500 h-screen">
    <div class="px-4 h-full flex flex-col justify-between">
      <div>
        <div>
          <img src="../assets/logo.png" alt="Avatar" class="mx-auto my-4 w-20 h-20" />
        </div>
        <navigation></navigation>
      </div>

      <footer id="account" class="my-8">
        <div class="px-2 flex justify-between">
          <div class="flex justify-start">
            <div id="bottom-avatar" class="mx-1">
              <img src="../assets/avatar.png" alt="Profile Image" class="w-12 h-12 rounded-full" />
            </div>

            <div id="profile" class="mx-1">
              <div>Lord God</div>
              <div>@_augment</div>
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
              />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  </aside>
</template>
<script setup>
import Navigation from './Navigation.vue'
</script>
