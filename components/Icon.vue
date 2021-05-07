<template>
  <div>
    <!-- navigation arrow -->
    <svg
      v-if="icon === 'navarrow'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        d="M3 22L12 2L21 22L12 17L3 22Z"
      ></path>
    </svg>
    <!-- Play button filled -->
    <svg
      v-if="icon === 'playarrow'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        d="M18.51 11.14L6.51 4.13998C5.84 3.74998 5 4.22998 5 4.99998V19C5 19.77 5.84 20.25 6.5 19.86L18.5 12.86C19.17 12.48 19.17 11.52 18.51 11.14Z"
        undefined="1"
      ></path>
    </svg>
    <!-- arrow left -->
    <svg
      v-if="icon === 'leftarrow'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
