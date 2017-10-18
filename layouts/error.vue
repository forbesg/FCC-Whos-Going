<template>
  <div class="error">
    <fg-header></fg-header>
    <section class="container text-center">
      <img src="../assets/img/logo.png" alt="Who's Going? Logo" class="logo" />
      <h1 class="title">
        {{ error.statusCode }}
      </h1>
      <h2 class="info">
        {{ error.message }}
      </h2>
      <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
        Homepage
      </nuxt-link>
    </section>
  </div>
</template>
<script>
import Header from '~/components/Header'
export default {
  props: ['error'],
  components: {
    'fg-header': Header
  }
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
