<template>
  <div
    class="w-screen h-full pb-12 bg-main flex flex-col px-7 relative"
    :class="isShow ? 'overflow-y-hidden' : ''"
  >
    <!-- buttons -->
    <div class="py-10 flex justify-around">
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="text-gray-100 font-medium select-none"
        :class="
          $store.state.menuIndex === index ? 'text-blue-500 ' : ' text-red-500'
        "
        @click="clickCategory(index, category.id)"
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
    <div class="flex mt-5">
      <!-- genre selection -->
      <div
        v-for="(genre, i) in genres"
        :key="genre.name"
        class="bg-gray-200 rounded-md py-1 px-2 mr-2"
        :class="
          $store.state.menuIndex2 === i ? 'text-mypink ' : 'text-gray-600'
        "
        @click="clickGenre(i, genre.id)"
      >
        {{ genre.name }}
      </div>
    </div>
    <!-- movies card -->
    <div class="w-full grid grid-cols-2 mt-5 gap-10">
      <div
        v-for="(movie, ind) in movies"
        :key="ind"
        class="w-32 bg-card flex flex-col rounded-xl overflow-hidden items-start"
        @click="pushtoPageCard(movie.id)"
      >
        <!-- card image -->
        <img
          :src="'http://localhost:1337' + movie.image.url"
          alt=""
          class="w-full max-h-48"
        />
        <!-- card content container -->
        <div class="flex-none text-gray-300 px-2 py-1">
          <!-- name -->
          <h1>{{ movie.name }}</h1>
          <!-- date -->
          <span class="text-gray-500 text-opacity-90">({{ movie.date }})</span>
        </div>
      </div>
    </div>

    <!--  -->
    <div v-if="isShow" class="w-screen h-screen fixed bg-main">
      <p @click="closeCard()">close</p>
      {{ card.name }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Icon from '@/components/Icon'

import { mapGetters } from 'vuex'
export default {
  components: {
    Icon,
  },
  data() {
    return {
      categories: [],
      id: 1,
      index: 0,
      index2: 0,
      isShow: false,
      type: 0,
      card: {},
    }
  },
  computed: {
    ...mapGetters([
      'genres',
      'movies',
      'menuIndex',
      'menuIndex2',
      'cardContent',
    ]),
  },

  mounted() {
    this.$store.commit('setMenuIndex2', 0)
    this.getCategories()
    this.$store.dispatch('getGenres')
    this.$store.dispatch('getMovies')
    this.$store.commit('setMenuIndex', 0)
  },
  methods: {
    closeCard() {
      this.isShow = false
      // this.$store.commit('setCard', {})
    },
    clickCategory(index, id) {
      this.$store.dispatch('getGenres', id)
      this.$store.commit('setMenuIndex', index)
      this.index = index
      this.$store.commit('setType', id)
      if (index === 0) {
        this.$store.dispatch('getMovies', 2)
      } else if (index === 1) {
        this.$store.dispatch('getSeries', 6)
      }
    },
    clickGenre(index, id) {
      this.$store.commit('setMenuIndex2', index)
      this.index2 = index
      console.log(index)
      // fetches movies or series according to id
      if (this.index === 0) {
        this.$store.dispatch('getMovies', id)
      } else {
        this.$store.dispatch('getSeries', id)
      }
    },

    pushtoPageCard(id) {
      this.$router.push(`/netflix/${id}`)
      // this.isShow = true
      // if (this.type === 0) {
      //   this.$store.dispatch('getCardMovie', id)
      // } else {
      //   this.$store.dispatch('getCardSerie', id)
      // }
      // this.card = this.$store.state.cardContent
      // console.log(this.card)
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
