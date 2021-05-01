<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.$store.dispatch('getMe')
  },
}
</script>
