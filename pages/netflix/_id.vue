<template>
  <div class="bg-main w-screen h-screen">
    <div class="w-full h-1/2 relative">
      <div @click="getBack">
        <Icon
          icon="leftarrow"
          class="w-6 h-6 absolute text-white top-10 left-4"
        />
      </div>
      <div
        class="bg-gradient-to-b from-transparent to-main w-full h-1/2 bottom-0 absolute"
      ></div>
      <img
        :src="
          cardContent.image
            ? 'http://localhost:1337' + cardContent.image.url
            : 'http://localhost:3000/images/thumbnail.jpeg'
        "
        alt=""
        class="object-cover w-full h-full"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from '~/components/Icon'
export default {
  components: {
    Icon,
  },
  layout: 'empty',
  computed: {
    ...mapGetters(['cardContent']),
  },
  created() {
    this.showId()
  },
  methods: {
    getBack() {
      console.log('backkkk')
      this.$router.push(`/netflix`)
    },
    showId() {
      //   this.$route.param
      if (this.$store.state.type === 0) {
        this.$store.dispatch('getCardMovie', this.$route.params.id)
      } else {
        // this.$store.dispatch('getCardSeries', this.$route.params.id)
      }
    },
  },
}
</script>

<style></style>
