<template>
  <div class="w-screen h-screen bg-main flex flex-col px-7">
    <!-- buttons -->
    <div class="py-10 flex justify-around">
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="text-gray-100 font-medium select-none"
        :class="
          $store.state.menuIndex === index ? 'text-blue-500 ' : ' text-red-500'
        "
        @click="pushtoPage(index, category.id)"
      >
        {{ category.name }}
      </div>
      <!-- {{ categories.name }} -->
    </div>
    <!-- Coming soon -->
    <div class="text-white">
      <h1 class="text-xl font-medium">Coming soon</h1>
      <!-- Content -->
      <div
        class="mt-5 bg-gray-500 w-full h-44 rounded-2xl relative overflow-hidden shadow-2xl"
        @click="myMethod()"
      >
        <!-- absolute content -->
        <div
          class="absolute mt-3 px-4 flex flex-col w-full items-center space-y-10"
        >
          <!-- Text and icon -->
          <div class="flex w-full">
            <h1 class="font-semibold">Dark Season 4</h1>
            <Icon icon="navarrow" class="absolute right-8" />
          </div>
          <!-- play button -->
          <div
            class="w-8 h-8 flex rounded-full bg-mypink justify-center items-center"
          >
            <Icon icon="playarrow" />
          </div>
        </div>
        <!-- image -->
        <img src="https://wallpaperaccess.com/full/1510470.jpg" alt="" />
      </div>
    </div>
    <GenreNav />
    <div class="flex mt-5">
      <div
        v-for="(genre, index) in genres"
        :key="genre.name"
        class="bg-gray-200 rounded-md py-1 px-2 mr-2"
        @click="pushtoPageMovies(index, genre.id)"
      >
        {{ genre.name }}
      </div>
    </div>
    <div class="flex flex-wrap mt-5">
      <div v-for="movie in movies" :key="movie.name">
        {{ movie.name }}
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Icon from '@/components/Icon'
import GenreNav from '@/components/GenreNav'
import { mapGetters } from 'vuex'
export default {
  components: {
    Icon,
    GenreNav,
  },
  data() {
    return {
      categories: [],
      id: 1,
      index: 0,
    }
  },
  computed: {
    ...mapGetters(['genres', 'movies', 'menuIndex']),
  },

  mounted() {
    this.getCategories()
    this.$store.dispatch('getGenres')
    this.$store.dispatch('getMovies')
    this.$store.commit('setMenuIndex', 0)
  },
  methods: {
    pushtoPage(index, id) {
      this.$store.dispatch('getGenres', id)
      this.$store.commit('setMenuIndex', index)
      this.index = index
      // this.$router.push(link)
      if (index === 0) {
        this.$store.dispatch('getMovies', 2)
        // this.$router.push(link)
      } else if (index === 1) {
        this.$store.dispatch('getSeries', 6)
      }
    },
    pushtoPageMovies(index, id) {
      // this.$store.dispatch('getMovies', id)
      // this.$store.dispatch('getSeries', id)
      if (this.index === 0) {
        this.$store.dispatch('getMovies', id)
        // this.$router.push(link)
      } else {
        console.log(id)
        this.$store.dispatch('getSeries', id)
      }
    },
    async getCategories() {
      try {
        this.isLoading = true

        const res = await this.$apollo.query({
          query: gql`
            query {
              categories {
                id
                name
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })

        this.categories = res.data.categories
      } catch (e) {
        this.isLoading = false
        // console.log(e)
      }
    },
  },
}
</script>

<style></style>
