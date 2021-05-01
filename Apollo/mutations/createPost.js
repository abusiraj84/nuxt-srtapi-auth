import gql from 'graphql-tag'

export const createPost = gql`
  mutation createPost($title: String!) {
    createPost(input: { data: { title: $title } }) {
      post {
        id
        title
      }
    }
  }
`
