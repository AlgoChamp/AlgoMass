const { rimraf } = require('rimraf');
const { exec } = require('child_process');

const deleteFolder = (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path);
    resolve('success');
  });
};

const execute = (command) => {
  console.log('command', command);
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        let status = { stdout: stdout, stderr: stderr };
        resolve(status);
      }
    });
  });
};

module.exports = { execute, deleteFolder };
