const rimraf = require('rimraf')
const { exec } = require('child_process')

const deleteFolder = (path) => {

    return new Promise((resolve, reject) => {
        rimraf(path, (err) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(`Deleted folder ${path}`)
                resolve(`Deleted folder ${path}`);
            }
        });
    })

}

const execute = (command) => {

    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                let status = {stdout:stdout,stderr:stderr};
                resolve(status);
            }
        })
    })

}

module.exports = {execute, deleteFolder}
