<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Log In</h2>

          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="form.identifier"
                  type="email"
                  class="input"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="form.password"
                  type="password"
                  class="input"
                  name="password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark">Log In</button>
            </div>
          </form>
          <div style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      form: {
        identifier: '',
        password: '',
      },
    }
  },
  async mounted() {},
  methods: {
    async login() {
      const credentials = this.form
      try {
        this.error = null
        const {
          data: {
            login: { user, jwt },
          },
        } = await this.$apollo.mutate({
          mutation: gql`
            mutation($identifier: String!, $password: String!) {
              login(input: { identifier: $identifier, password: $password }) {
                user {
                  id
                  username
                  email
                  role {
                    name
                    type
                    description
                  }
                }
                jwt
              }
            }
          `,
          variables: credentials,
        })
        // set the jwt to the this.$apolloHelpers.onLogin
        await this.$apolloHelpers.onLogin(jwt)
        this.$store.dispatch('getMe')
        this.$router.push('/')
        console.log(user)
      } catch (e) {
        // this.error = e.response.data.message[0].messages[0].message
        console.log(e)
      }
    },

    // async login() {
    //   this.error = null
    //   try {
    //     await this.$auth.loginWith('local', {
    //       data: {
    //         identifier: this.email,
    //         password: this.password,
    //       },
    //     })
    //     this.$router.push('/')
    //   } catch (e) {
    //     this.error = e.response.data.message[0].messages[0].message
    //   }
    // },
  },
}
</script>
