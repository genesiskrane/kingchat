<template>
  <div>
    <div class="flex flex-col px-2 py-2">
      <div v-for="(post, i) in posts" :key="i" class="clearfix">
        <div class="py-2 flex flex-row gap-2">
          <div>
            <v-img
              :src="post.authors[0].photoURL"
              :alt="post.authors[0].displayName + '\'s DP'"
              class="w-12 h-12 rounded-full"
            ></v-img>
          </div>
          <div>
            <div>
              <span class="font-semibold">{{ post.authors[0].displayName }}</span>
              &nbsp;
              <span class="text-xs"
                >@{{ post.authors[0].username }} &#8226; {{ timeAgo(post.createdAt) }}</span
              >
            </div>
            <div>
              <p class="whitespace-pre-line">{{ post.text }}</p>
            </div>

            <div id="media" v-if="post.media.length > 0">
              <div
                v-for="(chunk, i) in getChunks(post.media)"
                :key="i"
                class="frame flex flex-row justify-between"
              >
                <div v-for="(item, j) in chunk" :key="j">
                  {{ increaseItemCount() }}

                  <template v-if="item.type == 'photo'">
                    <img :src="item.url" :alt="`Status Item ${itemCount}`" />
                  </template>

                  <template v-if="item.type == 'video'">
                    <video :src="item.url" controls class="w-96 h-2/3"></video>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {{ resetItemCount() }}
      </div>
    </div>

    <speed-dial></speed-dial>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useAppStore } from '../stores';
import SpeedDial from '../components/ui/SpeedDial.vue';

const { timeAgo } = inject('app');

const store = useAppStore();
const posts = computed(() => store.posts);

let itemCount = 0;

function increaseItemCount() {
  itemCount++;
}

function resetItemCount() {
  itemCount = 0;
}
function getChunks(media) {
  const chunkSize = 2;
  let chunks = [];
  for (let i = 0; i < media.length; i += chunkSize) {
    chunks.push(media.slice(i, i + chunkSize));
  }

  return chunks;
}
</script>
