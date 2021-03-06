/* eslint no-unused-vars: 0 */
/*
cmd: コマンド名
options: []
    エスケープが必要な場合は二重引用符で囲む
*/
const util = require('util');
const exec = util.promisify(window.require('child_process').exec);
var { ipcRenderer } = window.require("electron");
const current = ipcRenderer.sendSync('getPath')
var bin = ""
if(current == ""){
    bin = current
}else{
    bin = current + "\\bin\\"
}
module.exports = async function (cmd, options) {
    let opArr = []
    opArr = options.map(function(e){
        e = e.toString()
        e.replace('\\', '\\\\').replace('"', '\\"')
        if(e.match(/[\s<>|()&/\\[\]{}'$^;?!:]/g)){
            e = '"' + e + '"'
        }
        return e
    })
    opArr.unshift(cmd)
    let fullCommand = opArr.join(' ')

    console.log(fullCommand )
    //console.log("exec-Start")
    const result= await exec(fullCommand, {cwd: bin})
        /*
        if ( error instanceof Error || stderr.search("Command failed") || stdout.search("Command failed")) {
            throw "Command execution error"
        } else {
            return stdout;
        }
        
    });*/
    //console.log(result)
    return result.toString()
};
