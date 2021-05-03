import gql from 'graphql-tag'

export const state = () => ({
  me: {},
  menuIndex: 0,
  menuIndex2: '/netflix',
  genres: [],
  movies: [],
})

export const getters = {
  me: (state) => state.me,
  genres: (state) => state.genres,
  movies: (state) => state.movies,
  menuIndex: (state) => state.menuIndex,
  menuIndex2: (state) => state.menuIndex2,
}

export const actions = {
  // Get the user data
  async getMe({ commit }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.query({
        query: gql`
          query {
            me {
              id
              email
              username
              role {
                name
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
      })

      if (res) {
        commit('setMe', res.data.me)
      } else {
        commit('setMe', '')
      }
    } catch (e) {
      // console.log(e)
    }
  },

  async USER_LOGOUT({ commit }) {
    await this.$apolloHelpers.onLogout()
    commit('setMe', {})
  },

  //  Get genres bi Cat id
  async getGenres({ commit }, payload) {
    try {
      this.isLoading = true
      const client = this.app.apolloProvider.defaultClient

      const res = await client.query({
        query: gql`
          query getGenres($id: ID!) {
            category(id: $id) {
              id
              name
              genres {
                id
                name
              }
            }
          }
        `,

        fetchPolicy: 'no-cache',
        variables: {
          id: payload || 1,
        },
      })

      commit('setGenres', res.data.category.genres)
    } catch (e) {
      this.isLoading = false
      // console.log(e)
    }
  },
  // Here we fetching the data of genre by category id to get movies
  async getMovies({ commit }, payload) {
    try {
      this.isLoading = true
      const client = this.app.apolloProvider.defaultClient

      const res = await client.query({
        query: gql`
          query getMovies($id: ID!) {
            genre(id: $id) {
              id
              name
              movies {
                id
                name
              }
            }
          }
        `,

        fetchPolicy: 'no-cache',
        variables: {
          id: payload || 2,
        },
      })

      commit('setMovies', res.data.genre.movies)
    } catch (e) {
      this.isLoading = false
      console.log(e)
    }
  },
  async getSeries({ commit }, payload) {
    try {
      this.isLoading = true
      const client = this.app.apolloProvider.defaultClient

      const res = await client.query({
        query: gql`
          query getMovies($id: ID!) {
            genre(id: $id) {
              id
              name
              series {
                id
                name
              }
            }
          }
        `,

        fetchPolicy: 'no-cache',
        variables: {
          id: payload || 6,
        },
      })

      commit('setMovies', res.data.genre.series)
    } catch (e) {
      this.isLoading = false
      console.log(e)
    }
  },
}
export const mutations = {
  // me
  setMe(state, me) {
    state.me = me
  },
  // Active menu item
  setMenuIndex(state, menuIndex) {
    state.menuIndex = menuIndex
  },
  setMenuIndex2(state, menuIndex) {
    state.menuIndex2 = menuIndex
  },
  // genres
  setGenres(state, genres) {
    state.genres = genres
  },
  // movies
  setMovies(state, movies) {
    state.movies = movies
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
