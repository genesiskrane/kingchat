<template>
  <router-view></router-view>
</template>

<script setup>
import { provide } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function back() {
  if (window.history.length > 1) router.back();
  else router.push({ path: '/home' });
}

function timeAgo(timestamp) {
  const now = Date.now();
  const diffInMilliseconds = now - timestamp;

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));

  if (diffInYears > 0) {
    return `${diffInYears} y`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} mn`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  } else {
    return `${diffInSeconds}s`;
  }
}

provide('app', {
  back,
  timeAgo
});

</script>
