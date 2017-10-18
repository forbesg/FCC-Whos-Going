<template>
  <div class="going">
    <button v-if="$store.state.user" class="btn" @click="handleButton">Going? {{ going.length }}</button>
    <a v-if="!$store.state.user" class="btn" href="/auth/twitter">Going? {{ going.length }}</a>
    <p style="color: #fff;">{{alreadyGoing}}</p>
    
  </div>
</template>

<script>
export default {
  name: 'fg-going',
  props: ['going', 'handleAddGoing'],
  computed: {
    alreadyGoing () {
      // If user is already going we need to set the path to removethemselves
      if (this.$store.state.user) {
        let user = this.going.filter(user => {
          return this.$store.state.user._id === user._id
        })
        if (user[0]) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    handleButton () {
      // It user is already going send remove request
      if (this.alreadyGoing) {
        // true to confirm DELETE request
        return this.handleAddGoing(true)
      }
      this.handleAddGoing()
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    background-color: #fff;
    border: 1px solid #444;
    cursor: pointer;
    padding: 10px 20px;
  }
</style>


