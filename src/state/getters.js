export default {
    isDeviceInactive: state => {
        return state.currentDevice.id === "" || state.currentDevice.id === undefined
      },
      powerStayStatus: state => {
        if(state.currentDevice.id === "" || state.currentDevice.id === undefined){
          return state.currentDevice.id === "" || state.currentDevice.id === undefined
        }
        return state.currentDevice.powerstay
      },
}