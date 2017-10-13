<template>
  <div>
    <fg-header />
    <nuxt/>
    <fg-footer/>
  </div>
</template>

<script>
import FgFooter from '~/components/Footer.vue'
import FgHeader from '~/components/Header'

export default {
  components: {
    FgFooter,
    FgHeader
  }
}
</script>

<style>
</style>
