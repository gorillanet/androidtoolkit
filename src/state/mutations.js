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
    set_current_device(state, l){
      state.currentDevice = l
      console.log(state)
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
      state.currentDevice={}
    },
}