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
        stroke="currentColor"
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
    <!-- star -->
    <svg
      v-if="icon === 'star'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
    <!-- add button -->
    <svg
      v-if="icon === 'add'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
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
