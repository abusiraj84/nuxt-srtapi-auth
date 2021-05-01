<template>
  <section class="section">
    <Notification v-if="showNoti" message="your post has been added" />
    <div class="container">
      <h1 class="title">Nuxt Strapi Auth</h1>
    </div>
    <!-- Here we can show the Posts -->
    <!-- loading if isLoading is true -->
    <div v-if="!isLoading">Loading</div>
    <div v-if="isLoading">
      <div v-for="post in posts" :key="post.id">
        {{ post.title }}
      </div>
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
import gql from 'graphql-tag'

export default {
  layout: 'dashboard',
  data() {
    return {
      isLoading: false,
      title: '',
      posts: [],
      showNoti: false,
    }
  },

  mounted() {
    this.getPosts()
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
        this.showNoti = true
        this.hideNoti()
      } catch (e) {
        console.log(e)
      }
    },

    async getPosts() {
      this.isLoading = true

      try {
        const res = await this.$apollo.query({
          query: gql`
            query {
              posts {
                id
                title
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })
        this.isLoading = false
        this.posts = res.data.posts
        // this.getPosts()
      } catch (e) {
        console.log(e)
      }
    },
    hideNoti() {
      setTimeout(() => {
        this.showNoti = false
      }, 2000)
    },
  },
}
</script>
