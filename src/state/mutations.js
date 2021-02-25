export default {
    hide_overlay(state){
        state.overlay = false
    },
    show_overlay(state){
      state.overlay = true
    },
    set_devicelist(state, l){
      state.devices = l
    },
    setpath(state, l){
      state.exePath = l
    },
    set_current_device(state, l){
      state.currentDevice = l
    },
    show_loading(state){
      state.isloading = true;
    },
    hide_loading(state){
      state.isloading = false;
    },
    toggle_powerstate(state){
      state.currentDevice.powerstay = !state.currentDevice.powerstay;
    },
    empty_devices(state){
      state.selectDevice= undefined
      state.devices=[]
      state.currentDevice={
        id: "",
        osver: "",
        sdkver: "",
        battery: "",
        ipaddr: "",
        macaddr: "",
        powerstay: false,
      },
      state.packages=[]
    },
    updScrcpyOptions(state, opt){
      state.scrcpy[opt[0]] = opt[1]
    },

    assign_packages(state, li){
      var j = []
      for (var i=0; i<li.length; i++) {
          j.push({id: i, pkg: li[i]})
      }
      state.packages = j
    }
}