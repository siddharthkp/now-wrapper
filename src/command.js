const exec = require('execa')

const token = process.env.NOW_TOKEN

const run = async command => {
  const result = await exec.shell(`${command} -t ${token}`)
  return result
}

module.exports = run
