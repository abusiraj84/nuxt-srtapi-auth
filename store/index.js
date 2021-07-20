import gql from 'graphql-tag'

export const state = () => ({
  me: {},
  menuIndex: 0,
  menuIndex2: 0,
  genres: [],
  movies: [],
  cardContent: {},
  cardSerie: {},
  type: 0,
  sendTweet: false,
  showNoti: false,
})

export const getters = {
  me: (state) => state.me,
  genres: (state) => state.genres,
  movies: (state) => state.movies,
  menuIndex: (state) => state.menuIndex,
  menuIndex2: (state) => state.menuIndex2,
  cardContent: (state) => state.cardContent,
  cardSerie: (state) => state.cardSerie,
  type: (state) => state.type,
  sendTweet: (state) => state.sendTweet,
  showNoti: (state) => state.showNoti,
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

  //  Get genres bi Catgr id
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
                image {
                  url
                }
                details
                rating
                date
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

  // Fetching series according to genre
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
                image {
                  url
                }
                details
                rating
                date
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

  async getCardMovie({ commit }, payload) {
    try {
      this.isLoading = true
      const client = this.app.apolloProvider.defaultClient

      const res = await client.query({
        query: gql`
          query getMovie($id: ID!) {
            movie(id: $id) {
              id
              name
              details
              image {
                url
              }
              rating
              date
              genres {
                name
              }
              actors {
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

      commit('setCard', res.data.movie)
    } catch (e) {
      this.isLoading = false
      console.log(e)
    }
  },

  async getCardSerie({ commit }, payload) {
    try {
      this.isLoading = true
      const client = this.app.apolloProvider.defaultClient

      const res = await client.query({
        query: gql`
          query getSerie($id: ID!) {
            serie(id: $id) {
              id
              name
              details
              image {
                url
              }
              rating
              date
              genres {
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

      commit('setCardSerie', res.data.serie)
    } catch (e) {
      this.isLoading = false
      console.log(e)
    }
  },
  setVarFalse({ commit }) {
    setTimeout(() => {
      this.commit('setVarFalse')
    }, 5000)
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
  setCard(state, cardContent) {
    state.cardContent = cardContent
  },
  setCardSerie(state, cardSerie) {
    state.cardSerie = cardSerie
  },
  setType(state, type) {
    state.type = type
  },
  setSendTweet(state, sendTweet) {
    state.sendTweet = sendTweet
  },
  setShowNoti(state) {
    state.showNoti = true
  },
  setVarFalse(state) {
    state.showNoti = false
    state.sendTweet = false
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
