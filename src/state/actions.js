
var commandProsessor = require('../command');
var cp = new commandProsessor.Command()
export default {
    async GET_DEVCELIST({commit}){
      commit("empty_devices")
      try {
          let li = await cp.list_devices()
          if(li=="Command execution error"){
            throw "ERROR"
          }
          commit("set_devicelist", li)
          commit("hide_loading")
        
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    },
    async TOGGLE_POWERSTAY({commit}){
      try {
        let li = await cp.set_powerstate()
        if(li=="Command execution error"){
          throw "ERROR"
        }
        commit("set_devicelist", li)
      } catch (error) {
        commit("show_overlay")
      }
    },
    async LAUNCH_APP_SETTING({commit, state}){
      try {
        if(await cp.launchapp(state.currentDevice.id, "android.settings.SETTINGS")=="Command execution error"){
          throw "ERROR"
        }
      } catch (error) {
        commit("show_overlay")
      }
    },
    async LAUNCH_APP_WIRELESS({commit, state}){
      try {
        if(await cp.launchapp(state.currentDevice.id, "android.settings.WIRELESS_SETTINGS")=="Command execution error"){
          throw "ERROR"
        }
      } catch (error) {
        commit("show_overlay")
      }
    },
    async REBOOT_DEVICE({commit, state}){
      try{
        if(await cp.reboot(state.currentDevice.id)=="Command execution error"){
          throw "ERROR"
        }
      } catch (error) {
        commit("show_overlay")
      }
    },
    async KILL_SERVER({commit}){
      try {
        await cp.killserver()
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    },
    async RESET_ADB({commit, dispatch}){
      try {
        await dispatch("KILL_SERVER")
        await dispatch("GET_DEVCELIST")
        //commit("hide_loading")
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    },
    
    async CHANGE_CURRENT_DEVICE({commit}, id){
      try {
        console.log("changeDevice: ", id)
        let dev = {}
        dev.id = id
        dev.osver = await cp.getprop(id, "ro.build.version.release")
        dev.model = await cp.getprop(id, "ro.product.model")
        dev.sdkver = await cp.getprop(id, "ro.build.version.sdk")
        let batt = await cp.getdumpsys(id, "battery")
        console.log(batt)
        dev.battery = batt.match(/level: (\d*)/i)[1]
        commit("set_current_device", dev)
        commit("hide_loading")
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    }
}