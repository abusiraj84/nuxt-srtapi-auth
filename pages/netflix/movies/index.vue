<template>
  <div></div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  layout: 'netflix',
  methods: {
    async getCategory() {
      try {
        this.isLoading = true

        const res = await this.$apollo.query({
          query: gql`
            query {
              category(id: 1) {
                name
                genres {
                  name
                  movies {
                    name
                  }
                }
              }
            }
          `,
          variables: {
            id: this.id,
          },
          fetchPolicy: 'no-cache',
        })

        this.categories = res.data.categories
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
  },
}
</script>

<style></style>
