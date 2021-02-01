/* eslint no-unused-vars: 0 */
var exec = require('./exec');
var adb = "adb";
export class Command {
    constructor() {
    }
    list_devices = function(){
        var dev = [];
        var w = exec(adb , ["devices"]);
        console.log(w)
        const re = new RegExp(/([\w\d-_:]*)\tdevice/, "mg")
        var l = [...String(w).matchAll(re)]
        l.forEach((d, index) => {
            dev.push({
                id: index, device: d[1], 
                model: this.getprop(d[1], "ro.product.model"),
                androidos: this.getprop(d[1], "ro.build.version.release"),
                sdklevel: this.getprop(d[1], "ro.build.version.sdk"),
                battery: this.getdumpsys(d[1], "battery").match(/level: (\d*)/i)[1]
            })
        });
        return dev
    }
}