import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: false,
    sidebarItems: []
  },
  mutations: {
    sidebar (state, val) {
      state.sidebar = val
    },
    sidebarItems (state, val) {
      state.sidebarItems = val
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth
  }
})
