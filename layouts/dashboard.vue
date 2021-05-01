<template>
  <div class="h-screen bg-gray-900 flex select-none">
    <div
      class="w-52 bg-gray-800 justify-center items-center h-screen text-white"
    >
      <nuxt-link to="/" class=""
        ><logo class="w-16 hover:scale-110"></logo
      ></nuxt-link>

      <ul class="flex flex-col items-center space-y-5">
        <li
          v-for="(item, index) in menus"
          :key="index"
          class="py-2 px-6 rounded-xl cursor-pointer group"
          :class="
            $store.state.menuIndex === item.link
              ? 'bg-gray-700 hover:bg-gray-600 '
              : ' hover:bg-gray-700'
          "
          :to="item.link"
          @click="pushtoPage(index, item.link)"
        >
          <h2 class="group-hover:text-gray-200">
            {{ item.title }}
          </h2>
        </li>
      </ul>
    </div>
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      isLoading: false,
      menus: [],
    }
  },
  mounted() {
    this.getMenu()
    this.$store.commit('setMenuIndex', this.$route.path)
  },
  methods: {
    pushtoPage(id, link) {
      this.$store.commit('setMenuIndex', link)
      this.$router.push(link)
    },

    async getMenu() {
      this.isLoading = true
      try {
        const res = await this.$apollo.query({
          query: gql`
            query {
              menus {
                id
                title
                icon
                link
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })
        this.isLoading = false
        this.menus = res.data.menus
      } catch (e) {
        //
      }
    },
  },
}
</script>
