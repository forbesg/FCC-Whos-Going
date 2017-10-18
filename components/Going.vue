<template>
  <div class="going">
    <button v-if="$store.state.user" class="btn" @click="handleButton">Going{{ alreadyGoing ? '' : '?' }} <span class="count">{{ going.length }}</span></button>
    <a v-if="!$store.state.user" class="btn" href="/auth/twitter">Going? <span class="count">{{ going.length }}</span></a>
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
    color: #000;
    cursor: pointer;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count {
      background-color: #a22c29;
      color: #fff;
      border-radius: 50%;
      display: inline-block;
      font-size: 0.6em;
      margin-left: 30px;
      width: 26px;
      height: 26px;
      line-height: 26px;
    }
  }
</style>


