<template>
  <div class="h-screen bg-gray-900 flex">
    <div
      class="w-52 bg-gray-800 justify-center items-center h-screen text-white"
    >
      <nuxt-link to="/" class=""
        ><logo class="w-16 hover:scale-110"></logo
      ></nuxt-link>

      <ul class="flex flex-col items-center space-y-5">
        <li
          v-for="item in menu"
          :key="item.index"
          class="py-2 px-6 bg-red-400 rounded-xl"
        >
          Home
        </li>
      </ul>
    </div>
    <div>content</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
    }
  },
}
</script>
