<template>
  <div class="absolute flex h-screen">
    <div class="w-full absolute bottom-5 flex items-center justify-center">
      <Notification v-if="showNoti">
        <div v-if="sendTweet" class="flex space-x-3">
          <h1>Your tweet has been sent.</h1>
          <nuxt-link to="/" class="font-bold hover:text-white">Show</nuxt-link>
        </div>
      </Notification>
    </div>
    <div class="w-275"></div>
    <main
      class="flex w-990 justify-between overflow-y-auto h-full bg-black static"
    >
      <!-- w-[600px] -->
      <div class="w-600 border-l border-r border-bordergray">
        <!-- home header -->
        <div
          class="w-full px-4 h-14 flex justify-between bg-black items-center border-b border-bordergray"
        >
          <!-- header title -->
          <h1 class="font-bold text-md text-white text-xl">Home</h1>
          <!-- header svg -->
          <div class="text-myblue w-6 h-6">
            <Icon icon="glow" />
          </div>
        </div>
        <!-- post tweet -->
        <div
          class="w-full bg-black h-120 pt-2 pb-2 px-4 flex border-b border-bordergray"
        >
          <!-- img -->
          <div class="h-full mr-3">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img
                alt="Emre"
                draggable="true"
                src="https://pbs.twimg.com/profile_images/1352518651824533506/lrl8dz63_x96.jpg"
              />
            </div>
          </div>
          <div class="w-full flex flex-col relative">
            <!-- post input -->
            <div class="h-1/2 flex items-center text-xl">
              <textarea
                v-model="title"
                rows="1"
                cols="32"
                class="resize-none focus:outline-none opacity-100 text-white bg-black"
                type="text"
                placeholder="What's Happening?"
              />
            </div>
            <!-- post buttons -->
            <div class="w-full h-1/2 flex items-center text-myblue space-x-4">
              <div class="w-6">
                <Icon icon="image" />
              </div>
              <div class="w-6">
                <Icon icon="gif" />
              </div>
              <div class="w-6">
                <Icon icon="chart" />
              </div>
              <div class="w-6">
                <Icon icon="emojis" />
              </div>
              <div class="w-6">
                <Icon icon="calendar" />
              </div>
            </div>
            <!-- submit -->
            <div
              class="cursor-pointer bg-myblue rounded-full text-white text-sm font-bold px-4 py-2 absolute right-1 bottom-1"
              @click="submit"
            >
              Tweet
            </div>
          </div>
        </div>
        <!-- empty space -->
        <div class="w-full h-3 bg-empty"></div>
        <!-- Posts -->
        <div class=""></div>
      </div>
      <div class="w-1/2">
        <div class="w-1/2 h-full flex flex-col"></div>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Icon from '@/components/Icon'
export default {
  components: {
    Icon,
  },
  layout: 'twitterMain',
  data() {
    return {
      title: '',
      showNoti: false,
      sendTweet: false,
    }
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
        this.title = ''
        this.getPosts()
        this.showNoti = true
        this.sendTweet = true
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
        // setInterval(() => {
        //   this.getPosts()
        // }, 10000)
      } catch (e) {
        console.log(e)
      }
    },

    hideNoti() {
      setTimeout(() => {
        this.showNoti = false
        this.sendTweet = false
      }, 3000)
    },
  },
}
</script>

<style>
.w-600 {
  width: 600px;
}
.w-990 {
  width: 990px;
}
.w-275 {
  width: 275px;
}
.w-225 {
  width: 225px;
}
.h-120 {
  height: 120px;
}
</style>
