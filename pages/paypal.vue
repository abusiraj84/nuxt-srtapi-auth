<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Nuxt Strapi Auth</h1>
      <client-only>
        <paypal-checkout
          amount="10.00"
          currency="USD"
          :client="credentials"
          env="sandbox"
        >
        </paypal-checkout>
      </client-only>
    </div>

    <div>
      <input v-model="title" type="text" />
      <div @click="submit">
        <button>Submit</button>
      </div>
    </div>
  </section>
</template>

<script>
// import createPost from '~/Apollo/mutations/createPost'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      isLoading: false,
      title: '',
      credentials: {
        sandbox:
          'Aa1Xu3pXXotDaNyeZ2gHYAnhRTU9HiX7YfRop96MJjpX9PCDJmCM90inC-uCzWY5IJDM9aw520f2pAkj',
        production: '<production client id>',
      },
    }
  },
  mounted() {
    // console.log(this.$apolloHelpers.getToken())
    // console.log(!!this.$apolloHelpers.getToken())
    // console.log(this.$apollo)
  },
  methods: {
    async submit() {
      this.isLoading = true
      console.log('submited')

      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createPost($title: String!) {
              createPost(input: { data: { title: $title } }) {
                post {
                  id
                  title
                }
              }
            }
          `,
          variables: {
            title: this.title,
          },
        })
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
