const run = require('./command')

const deploy = async () => {
  const result = await run('now')
  if (result.stderr) return { error: result.stderr }
  else return { url: result.stdout }
}

module.exports = { deploy }
