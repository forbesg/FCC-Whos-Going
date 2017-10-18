import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    user: null,
    city: null,
    bars: null
  },
  mutations: {
    ADD_CITY (state, city) {
      state.city = city
    },
    ADD_BARS (state, bars) {
      state.bars = bars
    },
    REMOVE_BARS (state) {
      state.bars = null
    },
    UPDATE_USER (state, user) {
      if (user) {
        state.user = user
        return
      }
      state.user = null
    }
  },
  actions: {
    nuxtServerInit ({ commit, fetch, state }, { req }) {
      console.log(req.session, req.user)
      if (req.user) {
        commit('UPDATE_USER', req.user)
      }
      console.log(state)
    },
    addCity ({ commit }, city) {
      commit('ADD_CITY', city)
    },
    addBars ({ commit }, bars) {
      commit('ADD_BARS', bars)
    },
    removeBars ({ commit }) {
      commit('REMOVE_BARS')
    },
    updateUser ({ commit }, user) {
      commit('UPDATE_USER', user)
    }
  }
})

export default store
