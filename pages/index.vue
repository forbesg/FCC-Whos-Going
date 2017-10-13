<template>
  <section class="container text-center">
    <h1 class="title">
      Who's Going?
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
    <div class="results" v-if="results">
      <Listing v-for="result in results" :listing="result" :handleModalOpen="handleModalOpen" :key="result.id"/>
    </div>
    <Modal v-if="bar" :bar="bar" :handleModalOpen="handleModalOpen" />
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Listing from '~/components/Listing'
import Modal from '~/components/Modal'
export default {
  data () {
    return {
      city: null,
      error: null,
      results: null,
      bar: null,
      loading: false
    }
  },
  components: {
    Listing,
    Modal
  },
  methods: {
    handleCitySearch (e) {
      e.preventDefault()
      this.results = null
      this.error = null
      if (!this.city) {
        this.error = 'Please enter a City in the Search bar'
        return
      }
      this.loading = true
      axios.get(`/api/yelp/${this.city}`).then(results => {
        this.results = results.data
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.error = 'There was an error, please check your connection'
      })
    },
    handleModalOpen (bar) {
      if (bar) {
        this.bar = bar
        return
      }
      console.log('closing modal')
      this.bar = null
    }
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
