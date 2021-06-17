<template>
  <div
    class="px-5 py-3 bottom-5 bg-myblue flex text-white space-x-4 items-center rounded-sm"
  >
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (val) => ['danger', 'success'].includes(val),
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
