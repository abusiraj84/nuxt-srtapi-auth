<template>
  <div class="w-full py-3 px-4 flex border-t border-b border-bordergray">
    <!-- pfp -->
    <div class="h-full mr-3">
      <div class="h-12 w-12 rounded-full overflow-hidden">
        <img
          src="https://pbs.twimg.com/profile_images/1413569637154009091/Kw8mHnHd_400x400.jpg"
          alt=""
        />
      </div>
    </div>
    <!-- main content -->
    <div class="w-full flex">
      <!-- username & misc -->
      <div></div>
      <!-- content -->
      <div></div>
      <!-- buttons -->
      <div class="flex">
        <Icon class="w-5 h-5 text-white" icon="comment" />
        <Icon class="w-5 h-5 text-white" icon="rt" />
        <Icon class="w-5 h-5 text-white" icon="heart" />
        <Icon class="w-5 h-5 text-white" icon="upload" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
export default {
  components: {
    Icon,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
