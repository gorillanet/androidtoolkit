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
    id: "",
    osver: "",
    sdkver: "",
    battery: "",
    powerstay: false,
    ipaddr: "",
    macaddr: "",
    proxy: "",
    tcpforward: [],
    tcpreverse: [],
  },
  packages:[],
  items: [
    { index: 0, tab: 'status'},
    { index: 1, tab: 'packages'},
    { index: 2, tab: 'files'},
    { index: 3, tab: 'network'},
  ],
  selectDevice: undefined,
  scrcpy: {
    length: 720,
    bitrate: 2,
    stayawake: false,
    offscreen: false,
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})