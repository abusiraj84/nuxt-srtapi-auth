<template>
  <div>
    <!-- <div v-for="genre in genres" :key="genre.id" class="">
      {{ genre.name }}
    </div> -->
  </div>
</template>

<script>
// import gql from 'graphql-tag'

// export default {
//   data() {
//     return {
//       id: 1,
//       genres: [],
//       movies: true,
//       series: false,
//     }
//   },
//   mounted() {
//     this.getGenre()
//     this.$store.commit('setMenuIndex2', this.$route.path)
//   },
//   methods: {
//     async getGenre() {
//       try {
//         this.isLoading = true

//         const res = await this.$apollo.query({
//           query: gql`
//             query getGenre($id: ID!) {
//               genre(id: $id) {
//                 name
//                 ${this.category}{
//                   name
//                   image {
//                     url
//                   }
//                 }
//               }
//             }
//           `,
//           fetchPolicy: 'no-cache',
//           variables: {
//             id: this.id,
//             movies: this.movies,
//             series: this.series,
//           },
//         })

//         this.genres = res.data.category.genre
//       } catch (e) {
//         this.isLoading = false
//         console.log(e)
//       }
//     },
//   },
// }
</script>

<style></style>
