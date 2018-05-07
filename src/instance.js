const exec = require('execa')

const deploy = async () => {
  const result = await exec.shell('now')
  if (result.stderr) return { error: result.stderr }
  else return { url: result.stdout }
}

module.exports = { deploy }
