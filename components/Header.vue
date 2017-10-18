<template>
  <header>
    <div class="brand">
      <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    </div>
    <div class="title">
      <h1>Who's Going?</h1>
    </div>
    <div class="user">
      <p v-if="$store.state.user">{{ $store.state.user.name }}</p>
      <a href="/logout" v-if="$store.state.user">Logout</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'fg-header',
  methods: {
    handleLogout () {

    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    background-color: #902923;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px 10px;
    @media (min-width: 600px) {
      flex-direction: row;
    }
    .brand {
      .logo {
        height: 40px;
        width: 40px;
      }
    }
    .title {
      h1 {
        color: #1c8adb;
        font-weight: normal;
        margin: 0 10px;
        text-shadow: -1px 1px 0 #101010;
      }
    }
  }
</style>

