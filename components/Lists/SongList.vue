<script setup>
const { data, pending, error, refresh } = useLazyFetch(() => `/api/spotify`);
if (error) {
  refresh();
}
</script>
<template>
  <div>
    <client-only>
      <div
        v-if="!pending && !error"
        class="mt-4 grid grid-cols-2 place-items-center gap-9 md:grid-cols-6 md:place-items-start md:gap-1.5"
      >
        <nuxt-link
          v-for="song in data.data"
          :key="song.name"
          :to="song.external_urls.spotify"
          target="_blank"
          class="flex transform cursor-pointer flex-col justify-center space-y-2.5 text-center transition duration-300 hover:scale-105 focus:outline-none"
        >
          <nuxt-img
            draggable="false"
            width="144"
            height="144"
            loading="lazy"
            :alt="song.name"
            quality="50"
            format="webp"
            class="h-36 w-36 transform select-none rounded-md transition duration-300"
            :src="`${song.image}`"
          ></nuxt-img>
          <div class="flex w-36 flex-col break-all">
            <span
              class="truncate text-center text-black dark:text-neutral-400 md:text-left"
            >
              {{ song.name }}
            </span>
            <div class="flex flex-col space-y-0.5">
              <span
                class="w-36 truncate break-keep text-center text-sm text-neutral-500 dark:text-neutral-400 md:text-left"
              >
                {{ song.artists[0].name }}
              </span>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        v-if="pending && !error"
        class="mt-4 grid grid-cols-2 place-items-center gap-4 md:grid-cols-6 md:place-items-start md:gap-1.5"
      >
        <div
          v-for="index in 6"
          :key="index"
          class="flex animate-pulse cursor-pointer flex-col justify-center space-y-2.5 text-center focus:outline-none"
          target="_blank"
        >
          <div
            draggable="false"
            class="h-[144px] w-[144px] transform select-none rounded-md bg-neutral-800 transition duration-300"
          ></div>
          <div class="flex w-36 flex-col break-all">
            <div
              class="h-6 w-full truncate rounded-md bg-neutral-400 text-center dark:bg-neutral-800 md:text-left"
            ></div>
          </div>
        </div>
      </div>
      <button
        v-if="error"
        aria-label="Refresh Song list"
        class="mt-1 flex flex-row items-center space-x-2.5 rounded-md bg-neutral-200/50 p-2 px-4 text-neutral-500 transition duration-300 hover:bg-neutral-200 hover:text-black dark:bg-neutral-800/50 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-white"
        @click="refresh()"
      >
        <Icon name="ic:baseline-refresh" class="h-5 w-5" />
        <span>Refresh</span>
      </button>
    </client-only>
  </div>
</template>
