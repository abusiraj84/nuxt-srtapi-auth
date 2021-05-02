<template>
  <div>
    <div class="p-5 flex justify-center flex-col space-y-5">
      <label for="title" class="mr-2 text-white">Title</label>
      <input
        id="title"
        v-model="title"
        type="text"
        class="bg-gray-200 px-2 py-1 focus:outline-none rounded-full w-80"
      />
    </div>
    <div class="flex space-x-5">
      <input id="file" type="file" name="file" @change="onFileChange" />
      <img :src="src" alt="" class="w-40 h-40 object-cover rounded-full" />
    </div>
    <div @click="submit">
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  layout: 'dashboard',
  data() {
    return {
      src:
        'https://cdn.dribbble.com/users/1259559/avatars/normal/03d2ec443a4df3da75d0c025d43d0a82.png?1607523381',
      file: '',
      title: '',
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.file = e.target.files[0]
      this.src = URL.createObjectURL(file)
    },

    async submit() {
      this.isLoading = true
      console.log(this.src)

      // first we have to uplaod image to grab id
      try {
        const fd = new FormData()
        fd.append('image', this.file, this.file.name)
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation($image: Upload!) {
                upload(file: $image) {
                  url
                  id
                }
              }
            `,
            variables: {
              image: this.file,
            },
          })
          .then((res) => {
            console.log(res.data.upload.id)
            // here we will make another mutation to post title and use the image id

            this.sendPost(res.data.upload.id)
          })
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async sendPost(id) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation createPost($title: String!, $image: ID!) {
              createPost(input: { data: { title: $title, image: $image } }) {
                post {
                  id
                  title
                  image {
                    url
                  }
                }
              }
            }
          `,
          variables: {
            title: this.title,
            image: id,
          },
        })
        this.isLoading = false
        this.title = ''
        // this.getPosts()
        // this.showNoti = true
        // this.hideNoti()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style></style>
