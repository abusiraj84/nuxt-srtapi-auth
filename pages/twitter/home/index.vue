<template>
  <main class="flex w-990 justify-between overflow-y-auto h-full bg-black">
    <!-- w-[600px] -->
    <div class="w-600 border-l border-r border-bordergray">
      <!-- home header -->
      <div
        class="w-full px-4 h-14 flex justify-between bg-black items-center border-b border-bordergray"
      >
        <!-- header title -->
        <h1 class="font-thin text-md text-white text-xl">Home</h1>
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
        <div class="flex flex-col relative">
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
          <div class="h-1/2 flex items-center text-myblue space-x-4">
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
            class="cursor-pointer bg-myblue rounded-full text-white text-sm font-bold px-4 py-2 absolute right-0 bottom-1"
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
      } catch (e) {
        console.log(e)
      }
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
