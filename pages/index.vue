<template>
  <section class="container text-center">
    <h1 class="title">
      Who's Going? {{$store.state.city}}
    </h1>
    <div class="search-form">
      <form @submit="handleCitySearch">
        <div class="form-group text-center">
          <label for="city">Search for your City: </label>
          <input type="text" name="city" v-model="city" />
        </div>
        <div class="text-center">
          <button v-if="loading" class="btn" type="submit" disabled><i class="fa fa-spinner fa-spin"></i></button>
          <button v-if="!loading" class="btn" type="submit">Search</button>
        </div>
      </form>
      <div class="toast error" v-if="error">
        {{error}}
      </div>
    </div>
    <div class="results" v-if="$store.state.bars">
      <Listing v-for="(bar, index) in $store.state.bars" :listing="bar" :index="index" :handleModalOpen="handleModalOpen" :key="bar.id" />
    </div>
    <Modal v-if="$store.state.bars && $store.state.bars[barIndex]" :bar="$store.state.bars[barIndex]" :handleModalOpen="handleModalOpen" />
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Listing from '~/components/Listing'
import Modal from '~/components/Modal'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      city: null,
      error: null,
      barIndex: null,
      loading: false
    }
  },
  components: {
    Listing,
    Modal
  },
  fetch ({ store, req }) {
    const city = req.session.currentLocation
    if (city) {
      return axios.get(`/api/yelp/${city}`).then(response => {
        if (response.data.bars) {
          store.commit('ADD_CITY', city)
          store.commit('ADD_BARS', response.data.bars)
        }
      })
    }
  },
  methods: {
    handleCitySearch (e) {
      e.preventDefault()
      this.removeBars()
      this.error = null
      if (!this.city) {
        this.error = 'Please enter a City in the Search bar'
        return
      }
      this.loading = true
      axios.get(`/api/yelp/${this.city}`).then(results => {
        // Check for err object on response
        if (results.data.error) {
          this.loading = false
          this.error = results.data.error
          return
        }
        this.addCity(results.data.city)
        this.addBars(results.data.bars)
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.error = 'There was an error, please check your connection'
      })
    },
    handleModalOpen (barIndex) {
      const bar = this.$store.state.bars[barIndex]
      if (bar) {
        this.barIndex = barIndex
        return
      }
      // Reset Bar on Modal Close
      this.barIndex = null
    },
    ...mapActions({
      addCity: 'addCity',
      addBars: 'addBars',
      removeBars: 'removeBars'
    })
  }
}
</script>

<style lang="scss" scoped>
  form {
    margin: 40px auto;
    max-width: 600px;
    .form-group {
      display: flex;
      flex-direction: column;
      label {
        display: block;
        font-size: 20px;
        margin: 20px auto;
        text-align: left;
        width: 100%;
      }
      input[type="text"] {
        background-color: #fff;
        border: 1px solid #444;
        border-radius: 5px;
        font-size: 30px;
        padding: 10px;
      }
    }
    .btn {
      width: 100px;
    }
  }
  .results {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
