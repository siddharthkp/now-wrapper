const run = require('./command')

const deploy = async () => {
  const result = await run('now')
  if (result.stderr) return { error: result.stderr }
  else return { url: result.stdout }
}

const remove = async instanceURL => {
  const result = await run(`now rm ${instanceURL} -y`)
  if (result.stderr) return { error: result.stderr }
  else return { result: true }
}

module.exports = { deploy, remove }
