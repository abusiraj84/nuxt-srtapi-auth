<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ me.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ me.email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['authenticated'],
  computed: {
    ...mapGetters(['me']),
  },
}
</script>
