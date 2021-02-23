/* eslint no-unused-vars: 0 */
var exec = require('./exec');
var adb = "adb";
var scrcpy = "scrcpy";
export class Command {
    constructor() {
    }
    list_devices = async function(){
        var dev = [];
        var w = await exec(adb , ["devices"]);
        //console.log(w)
        const re = new RegExp(/([\w\d-_:]*)\tdevice/, "mg")
        var l = [...String(w).matchAll(re)]
        for(const [index, d] of l){
            console.log(d)
            let mod = await this.getprop(d, "ro.product.model")
            dev.push({
                id: index, 
                device: d, 
                model: mod,
            })
        }
        //console.log(dev)
        return dev
    }
    reboot = async function(devid){
        var w = await exec(adb, ['-s', devid, 'reboot'])
        return w
    }
    launchapp = async function(devid, pkg){
        var w = await exec(adb, ['-s', devid, 'shell', 'am', 'start', '-a', pkg])
        return w
    }
    launchscrcpy = async function(devid, options){
        let stayawake = options['stayawake'] ? '--stay-awake' : ''
        let offscreen = options['offscreen'] ? '--turn-screen-off' : ''
        console.log(options)
        var w = await exec(scrcpy, ['-s', devid, '--max-size', options['length'], '--bit-rate', options['bitrate']+'K', stayawake, offscreen ])
        console.log(w)
        return w
    }
    killserver = async function(){
        var w = await exec(adb, ['kill-server'])
        return w
    }
    getprop = async function(devid, prop){
        var w = await exec(adb, ['-s', devid, 'shell', 'getprop', prop])
        return w
    }
    
    getdumpsys = async function(devid, prop){
        var w = await exec(adb, ['-s', devid, 'shell', 'dumpsys', prop])
        return w
    }
    
    togglepowerstate = async function(devid, prop){
        var w = await exec(adb, ['-s', devid, 'shell', 'svc', 'power', prop])
        return w
    }
}