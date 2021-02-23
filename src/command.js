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
        var w = await exec(scrcpy, ['-s', devid, '--max-size', options['length'], '--bit-rate', options['bitrate']+'M', stayawake, offscreen ])
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

    getip = async function(devid){
        var w = await exec(adb, ['-s', devid, 'shell', 'ip', 'addr', 'show', 'wlan0'])
        return w
    }
    
    togglepowerstate = async function(devid, prop){
        var w = await exec(adb, ['-s', devid, 'shell', 'svc', 'power', prop])
        return w
    }

    get_packages = async function(devid, prop){
        var w = await exec(adb, ['-s', devid, 'shell', 'pm', 'list', 'packages', '-3'])
        return w
    }

    pkg_open_app = async function(devid, pkg){
        var w = await exec(adb, ['-s', devid, 'shell', 'am', 'start', 'packages', '-a', pkg])
        return w
    }
    install_apk = async function(devid, path){
        var w = await exec(adb, ['-s', devid, 'install', path])
        return w
    }
    
    push_file = async function(devid, path, devpath){
        var w = await exec(adb, ['-s', devid, 'push', path, devpath])
        return w
    }

    pull_file = async function(devid, path, devpath){
        var w = await exec(adb, ['-s', devid, 'pull', devpath, path])
        return w
    }
    screenshot = async function(devid){
        var w = await exec(adb, ['-s', devid, 'shell', 'screencap', '-p', '/sdcard/screencapture.png'])
        return w
    }
    screenshot_pull = async function(devid){
        var w = await exec(adb, ['-s', devid, 'pull', '/sdcard/screencapture.png', '%USERPROFILE%'])
        return w
    }
    screenshot_rm = async function(devid){
        var w = await exec(adb, ['-s', devid, 'shell', 'rm', '/sdcard/screencapture.png'])
        return w
    }
}