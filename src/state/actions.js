
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
    async LAUNCH_SCRCPY({commit, state}){
      try {
        if(await cp.launchscrcpy(state.currentDevice.id, state.scrcpy)=="Command execution error"){
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
        dev.battery = batt.match(/level: (\d*)/i)[1]
        let ip = await cp.getip(id)
        dev.ipaddr = ip.match(/(\d*\.\d*\.\d*\.\d*\/\d*)/i)[1]
        dev.macaddr = ip.match(/([0-9A-Za-z]*:[0-9A-Za-z]*:[0-9A-Za-z]*:[0-9A-Za-z]*:[0-9A-Za-z]*:[0-9A-Za-z]*)/i)[1]
        commit("set_current_device", dev)
        commit("hide_loading")
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    },
    
    async GET_PACKAGES({commit, state}){
      try {
        let pkg = await cp.get_packages(state.currentDevice.id)
        commit("assign_packages", pkg.replace(/package:/g, '').split('\n'))
        commit("hide_loading")
      } catch (error) {
        console.error(error)
        commit("show_overlay")
      }
    },

    async PKG_OPEN_APP({state}, pkg){
      await cp.pkg_open_app(state.currentDevice.id, pkg)
    },

    async INSTALL_APK({state, commit}, path){
      try{
        await cp.install_apk(state.currentDevice.id, path)
        commit("hide_loading")
      }catch(error){
        console.error(error)
        commit("show_overlay")
      }
    },

    async PUSH_FILE({state, commit}, p){
      try{
        await cp.push_file(state.currentDevice.id, p[0], p[1])
        commit("hide_loading")
      }catch(error){
        console.error(error)
        commit("show_overlay")
      }
    },

    async PULL_FILE({state, commit}, p){
      try{
        await cp.pull_file(state.currentDevice.id, p[0], p[1])
        commit("hide_loading")
      }catch(error){
        console.error(error)
        commit("show_overlay")
      }
    },

    async SCREENSHOT({state, commit}){
      try{
        await cp.screenshot(state.currentDevice.id)
        await cp.screenshot_pull(state.currentDevice.id)
        await cp.screenshot_rm(state.currentDevice.id)
        commit("hide_loading")
      }catch(error){
        console.error(error)
        commit("show_overlay")
      }
    }
}