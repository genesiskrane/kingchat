<template>
  <div id="app-container">
    <LeftSideBar />
    <MainView />
    <RightSideBar />
  </div>
</template>

<script setup>
import LeftSideBar from '../components/LeftSideBar.vue'
import RightSideBar from '../components/RightSideBar.vue'
import MainView from '../components/MainView.vue'
</script>
