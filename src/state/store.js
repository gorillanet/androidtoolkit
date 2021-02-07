import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  absolue: true,
  overlay: false,
  isloading: true,
  devices: [],
  currentDevice: {
    id: null,
    osver: null,
    sdkver: null,
    battery: null,
    powerstay: false,
  },
  items: [
    { index: 0, tab: 'status'},
    { index: 1, tab: 'packages'},
    { index: 2, tab: 'files'},
    { index: 3, tab: 'network'},
    { index: 4, tab: 'remote'},
    { index: 5, tab: 'config'},
  ],
  selectDevice: undefined,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})