<template>
  <div class="w-full h-full flex mx-auto relative">
    <aside class="w-275 bg-gray-200 flex-none bg-bla">
      <!-- sidebar -->
      <div
        class="flex flex-col justify-between h-full w-275 fixed px-3 bg-black"
      >
        <!-- sidebar top -->
        <div class="w-full flex flex-col items-start">
          <!-- button -->
          <nuxt-link
            v-for="(tab, index) in tabs"
            :key="index"
            to="/"
            class="h-12 flex items-center py-1 w-full text-white mt-2"
          >
            <div
              class="flex items-center hover:bg-gray-900 group p-3 rounded-full"
            >
              <!-- button svg -->
              <Icon
                :icon="tab.svgName"
                class="w-8 text-white group-hover:text-myblue"
              />
              <!-- button title -->
              <h1
                class="text-xl font-bold pl-5 pr-4 group-hover:text-myblue flex"
              >
                {{ tab.name }}
              </h1>
            </div>
          </nuxt-link>
          <!-- tweet button -->
          <div
            class="w-225 rounded-full bg-myblue flex items-center justify-center h-12 mt-12"
          >
            <h1 class="text-white text-md font-bold">Tweet</h1>
          </div>
        </div>
        <!-- profile button -->
        <div
          class="w-full bg-black flex items-center justify-between p-3 rounded-full hover:bg-gray-900"
        >
          <!-- profile img div -->
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="Emre"
              draggable="true"
              src="https://pbs.twimg.com/profile_images/1352518651824533506/lrl8dz63_x96.jpg"
            />
          </div>
          <!-- profile text -->
          <div class="flex flex-col text-white">
            <h1 class="font-bold">Emre</h1>
            <h1 class="text-gray-500">@emreButCommie</h1>
          </div>
          <!-- profile svg -->
          <div class="text-white">
            <Icon icon="hor3dot" />
          </div>
        </div>
      </div>
    </aside>
    <!-- main -->
    <Nuxt />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Icon from '@/components/Icon'
export default {
  components: {
    Icon,
  },
  data() {
    return {
      tabs: [],
    }
  },
  mounted() {
    this.getTabs()
  },
  methods: {
    async getTabs() {
      try {
        this.isLoading = true

        const res = await this.$apollo.query({
          query: gql`
            query {
              tabs {
                id
                name
                svgName
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })

        this.tabs = res.data.tabs
      } catch (e) {
        this.isLoading = false
        // console.log(e)
      }
    },
  },
}
</script>

<style>
.w-600 {
  width: 600px;
}
.w-990 {
  width: 990px;
}
.w-275 {
  width: 275px;
}
.w-225 {
  width: 225px;
}
.h-120 {
  height: 120px;
}
</style>
