<script setup lang="ts">
const props = defineProps<{
  queryLimit?: number | 3;
}>();

const posts = await queryContent("/blog").find();
const data = posts
  .sort((post1, post2) => post2.createdAt - post1.createdAt)
  .slice(0, props.queryLimit === 0 ? posts.length : props.queryLimit);
</script>
<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <nuxt-link
      v-for="post in data"
      :key="post.title"
      :to="post._path"
      class="group mt-2 flex transform cursor-pointer flex-col -space-y-5 rounded-md border border-gray-300 text-white duration-300 hover:scale-105 hover:bg-gray-200 group-hover:border-white dark:border-neutral-800 dark:hover:border-neutral-500 dark:hover:bg-black"
    >
      <div class="p-4">
        <nuxt-img
          loading="lazy"
          draggable="false"
          format="webp"
          :src="`/assets/images/blog/${post.image}`"
          :alt="post.title"
          sizes="sm:100vw md:50vw lg:400px"
          width="290"
          height="195"
          class="w-full rounded-md transition duration-300 group-hover:border-neutral-500 dark:border-neutral-800"
        />
      </div>
      <div
        class="flex flex-col items-center justify-center space-y-1.5 p-4 text-center md:items-start md:justify-start md:text-left"
      >
        <h2
          class="text-center text-black dark:text-white md:text-left md:text-lg"
        >
          {{ post.title }}
        </h2>
        <h3
          class="w-64 truncate text-center text-[13px] leading-5 text-neutral-500 md:w-full md:overflow-visible md:text-clip md:whitespace-normal md:text-left"
        >
          {{ post.description }}
        </h3>
      </div>
    </nuxt-link>
  </div>
</template>
