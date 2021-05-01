import gql from 'graphql-tag'

export const state = () => ({
  me: {},
})

export const getters = {
  me: (state) => state.me,
}

export const actions = {
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
}
export const mutations = {
  // me
  setMe(state, me) {
    state.me = me
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
