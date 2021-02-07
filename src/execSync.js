/* eslint no-unused-vars: 0 */
/*
cmd: コマンド名
options: []
    エスケープが必要な場合は二重引用符で囲む
*/
module.exports = function (cmd, options) {
    //var cmd = "adb"
    //var options = []['-s', '27f3c84e', 'shell', 'pm', 'list', 'users']
    var opArr = []
    const util = require('util');
    var exec = util.promisify(window.require('child_process').execSync);
    exec = window.require('child_process').execSync;
    try {
        opArr = options.map(function(e){
            e.replace('\\', '\\\\').replace('"', '\\"')
            if(e.match(/[\s<>|()&/\\[\]{}'$^;?!:]/g)){
                e = '"' + e + '"'
            }
            return e
        })
        opArr.unshift(cmd)
        var fullCommand = opArr.join(' ')
        console.log(fullCommand)
        const ls = exec(fullCommand, (error, stdout, stderr) => {
            if ( error instanceof Error || stderr.search("Command failed") || stdout.search("Command failed")) {
                throw "Command execution error"
            } else {
                return stdout;
            }
        });
        //console.log(ls)
        return ls.toString()
    }catch (error) {
        console.error(error)
        return "Command execution error"
    }
};
