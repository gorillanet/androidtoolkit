/* eslint no-unused-vars: 0 */
var exec = require('./execSync');
var adb = "adb";
export class Command {
    constructor() {
    }
    list_devices = function(){
        var dev = [];
        var w = exec(adb , ["devices"]);
        //console.log(w)
        const re = new RegExp(/([\w\d-_:]*)\tdevice/, "mg")
        var l = [...String(w).matchAll(re)]
        l.forEach((d, index) => {
            dev.push({
                id: index, 
                device: d[1], 
                model: this.getprop(d[1], "ro.product.model"),
            })
        });
        console.log(dev)
        return dev
    }
    reboot = function(devid){
        var w = exec(adb, ['-s', devid, 'reboot'])
        return w
    }
    launchapp = function(devid, pkg){
        var w = exec(adb, ['-s', devid, 'shell', 'am', 'start', '-a', pkg])
        return w
    }
    killserver = function(){
        var w = exec(adb, ['kill-server'])
        return w
    }
    getprop = function(devid, prop){
        var w = exec(adb, ['-s', devid, 'shell', 'getprop', prop])
        return w
    }
    
    getdumpsys = function(devid, prop){
        var w = exec(adb, ['-s', devid, 'shell', 'dumpsys', prop])
        return w
    }
    
    togglepowerstate = function(devid, prop){
        var w = exec(adb, ['-s', devid, 'shell', 'svc', 'power', prop])
        return w
    }
}